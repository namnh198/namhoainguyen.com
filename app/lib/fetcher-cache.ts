import type { CacheStrategy } from "./cache";

import { CACHE_DEFAULT, CacheAPI } from "./cache";
import { hashKey } from "./helpers";

const swrLock = new Set<string>();

export type FetchCacheOption<T = any> = {
  cache?: CacheStrategy;
  cacheInstance?: Cache;
  cacheKey?: string | readonly unknown[];
  shouldCacheResponse?: (body: T) => boolean;
  waitUtil?: (promise: Promise<unknown>) => void;
  onRawHeaders?: (headers: Headers) => void;
};

const excludedHeaders = ["set-cookie", "server-timing"];

export async function fetchWithCache<T = unknown>(
  url: string,
  requestInit: Request | RequestInit,
  {
    cacheInstance,
    cache: cacheOption,
    cacheKey = [url, requestInit],
    shouldCacheResponse = () => true,
    waitUtil,
    onRawHeaders,
  }: FetchCacheOption,
): Promise<readonly [T, Response]> {
  if (!cacheOption && (!requestInit.method || requestInit.method === "GET")) {
    cacheOption = CACHE_DEFAULT;
  }

  const key = hashKey([...(typeof cacheKey === "string" ? [cacheKey] : cacheKey)]);

  const fetchAction = async () => {
    const response = await fetch(url, requestInit);
    onRawHeaders?.(response.headers);

    if (!response.ok) {
      return transformStreamResponse(null, response);
    }

    let data: string = await response.text().catch(() => "");

    try {
      if (data) data = JSON.parse(data);
    } catch {}

    return transformStreamResponse(data as T, response);
  };

  // Bypass cache
  if (!cacheInstance || !cacheOption || cacheOption.mode !== "public" || cacheOption.maxAge === 0) {
    return await fetchAction();
  }

  const cache = new CacheAPI(key, cacheInstance);
  const cachedItem = await cache.get();
  if (cachedItem && typeof cachedItem[0] !== "string") {
    const [cachedResult, response] = cachedItem;
    const cacheStatus = cache.isStale(response) ? "STALE" : "HIT";

    if (!swrLock.has(key) && cacheStatus === "STALE") {
      swrLock.add(key);

      const revalidateCache = Promise.resolve().then(async () => {
        try {
          const [body] = await fetchAction();
          if (shouldCacheResponse(body)) {
            await cache.put(body, cacheOption);
          }
        } catch (error: any) {
          if (error?.message) error.message = `SWR Background Revalidate Failed: ${error.message}`;
          console.error(error);
        } finally {
          swrLock.delete(key);
        }
        waitUtil?.(revalidateCache);
      });
    }

    return [cachedResult, response];
  }

  const [body, response] = await fetchAction();
  if (shouldCacheResponse(body)) {
    const cacheStoringPromise = Promise.resolve().then(async () => {
      await cache.put(body, cacheOption);
    });

    waitUtil?.(cacheStoringPromise);
  }

  return [body, response];
}

const transformStreamResponse = (body: any, response: Response) => {
  const responseInit = {
    status: response.status,
    statusText: response.statusText,
    headers: [...response.headers].filter(([key]) => !excludedHeaders.includes(key)),
  };
  return [body, new Response(body, responseInit)] as const;
};
