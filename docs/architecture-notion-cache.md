# Architecture: Notion-as-CMS on a Cloudflare Worker

**Status:** agreed (design grilling, closed). Not yet implemented.

## The decision

Content is **dynamic**: pulled live from the Notion **private v3 frontend API**
(`queryCollection` / `loadPageChunk` / `syncRecordValuesMain`), rendered with
React Router (`ssr: true`) + Tailwind, deployed to a Cloudflare Worker via
`wrangler`. The Notion response is cached at the edge for a few hours and
re-fetched when stale.

**What we explicitly rejected**, and why:
- Build-time scrape / deploy-time content → *rejected.* Content must refresh
  without a redeploy.
- Pre-rendering the corpus → *rejected.* The corpus changes live; it can't be
  frozen at build.
- KV / Redis / Durable Object / Notion webhook / Cron cache-warmer → *rejected.*
  Only justified by "clear-on-publish instantly," which a personal blog doesn't
  need. Stay on the **Cloudflare `Cache` API** — zero new dependencies.
- Official Notion API → *rejected.* Private-API scraping is an accepted,
  deliberate dependency (no SLA, shape churn, `__version__` renames).
- "Instant freshness" → *rejected.* Within-hours staleness is accepted.

## The model, one sentence

> SSR renders per request; Notion is the live upstream; the Cloudflare `Cache`
> API holds normalized Notion responses for hours; a Notion outage serves the
> stale copy instead of failing the page. The cache is **resilience**, not just
> a cost optimization.

The single most important consequence: **your site's uptime now depends on
Notion's private endpoint.** The 4h/SIE cache is the only mitigation, so it must
actually be implemented (see Gaps — it is *not* correct in the repo today).

## Caching (`app/lib/fetcher-cache.ts`, `app/lib/cache.ts`)

Three **independent** cache keys so one key's error can't cascade:

| Key | Source | `max-age` | `staleWhileRevalidate` | `staleIfError` |
|-----|--------|-----------|------------------------|----------------|
| `manifest` | `getCollection` → normalized `Post[]` | 4h | 1h | 24h |
| `slug:{id}` | `getRecordMap` → normalized recordMap | 24h | 1h | 24h |
| `sitemap` | prerendered sitemap source, 1h | 1h | — | 24h |

- **Cache the *normalized* output** (`Post[]`, cleaned `recordMap`), **not** raw
  Notion JSON. Keeps a future Notion shape-churn from poisoning the cache with
  already-broken data.
- **HTML is not cached** — it is re-rendered per request from the normalized,
  cached Notion data. Trivial cost at one-author traffic.
- **Revalidate-on-next-request + `staleIfError`** (no Cron warmer). On a stale
  hit: try a *foreground* refresh only within the request budget; otherwise serve
  the stale copy and hand back a `staleIfError` window. On a *fetch error*:
  serve the last cached entry while `age < staleIfError`; send it on its way.
- **No fire-and-forget after response.** The current `fetcher-cache.ts` detaches
  the revalidation `Promise` (never awaited). Cloudflare tears the isolate down
  after the response returns, so that `cache.put` often silently dies. Either
  foreground the refresh within the request, or accept that revalidation happens
  on the *next* request — do not rely on a detached background promise completing.
- **Per-key TTLs**, not one global 4h. A settled post (slug) is read far more
  than it changes → 24h. New posts reach readers via the manifest's 4h + swr 1h.

## Schema (`wrangler.jsonc` + `app/lib/notion/*`)

- **Resolve Notion properties by *name*, not the hardcoded internal IDs**
  (`NOTION_SCHEMA_SLUG: "Fxoz"` etc. in `wrangler.jsonc`). Resolve
  name→id from the collection's own schema and cache *that* mapping on a long
  TTL. This survives a property rename; the current hardcoding silently produces
  empty/wrong fields for a full cache window if Notion rekeys.
- Keep the `__version__:3` normalization that is already present.

## Content fidelity

- **Slug collision → last-update-wins, dedupe by slug.**
- **Deleted/vanished Notion page → `staleIfError` serves the last good copy, but
  log/observe** it so a permanently-dead page surfaces instead of serving
  forever with no signal.
- **Keep the PROD-only `published` gate** (drafts visible in dev, hidden in prod).

## SEO / 404

- **Short-cached `sitemap.xml`** route (1h cache) generated from the post slugs.
- **Prerendered 404 route** so an unknown `/notes/:slug` returns a real 404
  instead of a hard 500 / wrong page.

## Gaps vs. the repo today (implementation checklist)

1. **`staleIfError` is not implemented** — `fetcher-cache.ts` / `cache.ts`
   `staleIfError` path throws and just logs; on a Notion 4xx/5xx the **current
   behavior is a 5xx to the reader, not a stale-serve.** This is the
   load-bearing implementation. Non-negotiable.
2. **Fire-and-forget SWR** in `fetcher-cache.ts` is unreliable on a Worker
   (detached, un-awaited revalidate/store promises). Rework to foreground-within-
   budget or revalidate-on-next.
3. **Cache key artifact** — `CacheAPI.setUrl` hardcodes
   `https://shopify.dev/?${key}`. Replace with a clean, namespaced CF Cache key.
4. **Dead Redis toggle** — `runWithRedisCache` is an empty no-op,
   `DISABLE_REDIS_CACHE`/Upstash in `.dev.vars.example` is unwired. The model has
   no Redis; **remove** both rather than leave a misleading switch.
5. **Hardcoded property IDs** in `wrangler.jsonc` → by-name resolver.
6. **Per-key TTLs not present** — current `CACHE_LONG=1d`, `CACHE_DEFAULT=1h`,
   no `staleIfError`, no per-key differentiation. Wire the table above.
7. **`sitemap.xml` + 404 route don't exist yet.**
8. **`notes-detail` loads `getPosts` then `getRecordMap`** (two Notion calls per
   uncached detail hit). With per-key caching this is acceptable, but the detail
   route should reuse the cached manifest for the `Post` rather than a fresh
   `getCollection`.
9. **Observability** — `observability.enabled: true` is set; add explicit
   cache-miss / Notion-error / stale-serve logging so dead pages and Notion
   outages are visible.

## Not decided here (deferred; revisit on demand)

- Per-key TTL values are tunable; start with the table and adjust after seeing
  real cache-hit ratios.
- Moving any route to full static / adding an invalidation channel only becomes
  live if "instant on publish" ever matters.
