const PUBLIC = "public";
const PRIVATE = "private";
const NO_CACHE = "no-store";

export type CacheStrategy = {
  mode?: "public" | "private" | "no-store";
  maxAge?: number; // in seconds
  sMaxAge?: number; // in seconds
  staleWhileRevalidate?: number; // in seconds;
  staleIfError?: number; // in seconds;
};

const cacheOptionMapping: Record<string, string> = {
  maxAge: "max-age",
  sMaxAge: "s-maxage",
  staleWhileRevalidate: "stale-while-revalidate",
  staleIfError: "stale-if-error",
};

export const CACHE_NONE: CacheStrategy = {
  mode: NO_CACHE,
};

export const CACHE_SHORT: CacheStrategy = {
  mode: PUBLIC,
  maxAge: 60, // 1 minute
  staleWhileRevalidate: 10, // 10 seconds
};

export const CACHE_LONG: CacheStrategy = {
  mode: PUBLIC,
  maxAge: 86400, // 1 day
  staleWhileRevalidate: 3600, // 1 hour
  staleIfError: 86400, // 1 day
};

export const CACHE_DEFAULT: CacheStrategy = {
  mode: PUBLIC,
  maxAge: 3600, // 1 hour
  staleWhileRevalidate: 300, // 5 minutes
  staleIfError: 60, // 1 minute
};

export class CacheAPI {
  private url?: string;

  private cache: Cache;

  constructor(url?: string, cache?: Cache) {
    this.cache = cache || new Cache();
    this.setUrl(url);
  }

  setUrl(key?: string) {
    this.url = `https://shopify.dev/?${key}`;
  }

  async get() {
    if (!this.url) return null;

    const request = new Request(this.url);
    const response = await this.cache.match(request);

    if (!response) return null;

    const text = await response.text();

    try {
      return [JSON.parse(text), response];
    } catch {
      return [text, response];
    }
  }

  async put(data: any, cacheOption?: CacheStrategy): Promise<void> {
    if (!this.url) return;

    const request = new Request(this.url);
    const response = new Response(JSON.stringify(data));
    const cacheControl: CacheStrategy = { ...CACHE_DEFAULT, ...cacheOption };
    const paddedCacheControl = generateCacheControlHeader({
      ...cacheControl,
      maxAge: Number(cacheControl.maxAge) + Number(cacheControl.staleWhileRevalidate),
    });
    const cacheControlHeader = generateCacheControlHeader(cacheControl);

    response.headers.set("Cache-Control", paddedCacheControl);
    response.headers.set("Real-Cache-Control", cacheControlHeader);
    response.headers.set("Cache-Put-Date", String(Date.now()));

    await this.cache.put(request, response);
  }

  async delete(): Promise<void> {
    if (!this.url) return;

    const request = new Request(this.url);

    await this.cache.delete(request);
  }

  isStale(response: Response): boolean {
    if (!this.url) return false;

    const cachePutDate = response.headers.get("Cache-Put-Date");

    if (!cachePutDate) return false;

    const cacheControl = response.headers.get("Real-Cache-Control");
    let maxAge = 0;

    if (cacheControl) {
      const maxAgeHeader = cacheControl.match(/max-age=(\d+)/);
      if (maxAgeHeader && maxAgeHeader[1]) {
        maxAge = Number(maxAgeHeader[1]);
      }
    }
    const age = (Date.now() - Number(cachePutDate)) / 1000;
    return age > maxAge;
  }
}

export function generateCacheControlHeader(cacheOption: CacheStrategy): string {
  guardCacheModeType(cacheOption);
  const cacheControl: string[] = [];
  Object.keys(cacheOption).forEach((key: string) => {
    if (key === "mode") {
      cacheControl.push(cacheOption.mode as string);
    } else if (cacheOptionMapping[key]) {
      cacheControl.push(`${cacheOptionMapping[key]}=${cacheOption[key as keyof CacheStrategy]}`);
    }
  });
  return cacheControl.join(", ");
}

function guardCacheModeType(cacheOption?: CacheStrategy) {
  if (cacheOption && ![PUBLIC, PRIVATE, NO_CACHE].includes(cacheOption.mode || "")) {
    throw new Error(`Invalid cache mode: ${cacheOption.mode}`);
  }
}
