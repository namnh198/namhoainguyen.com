# AGENTS.md

> For AI coding agents (and humans) working in this repo. Read this before changing code.

## What this is

A **personal blog / notes site** where **Notion is the content source of truth** and
this app is a **read-only renderer** of it. Not a CMS-backed app in the usual sense —
see the content pipeline below; the "Notion integration" is _not_ the official Notion API.

- **Framework:** React Router 8, **framework mode, SSR** (`react-router.config.ts` → `ssr: true`).
- **Style:** **Tailwind v4**, no CSS framework plugins — design tokens are CSS custom
  properties in `app/app.css` (`@theme`), Tailwind wired via `@tailwindcss/vite`.
- **Runtime:** a **single Cloudflare Worker** on `nodejs_compat`.
- **Package manager: `pnpm`** (there is a `pnpm-lock.yaml` and `pnpm-workspace.yaml`;
  do not `npm install` / use `yarn`).

## Commands

| Task                             | Command                                                                   |
| -------------------------------- | ------------------------------------------------------------------------- |
| Dev server (HMR + SSR)           | `pnpm dev`                                                                |
| Build (client + server)          | `pnpm build`                                                              |
| Preview production build locally | `pnpm preview`                                                            |
| Deploy to production             | `pnpm deploy` (= `build` + `wrangler deploy`)                             |
| Preview / promote a version      | `npx wrangler versions upload` then `npx wrangler versions deploy`        |
| Full typecheck                   | `pnpm typecheck` (= `wrangler types` + `react-router typegen` + `tsc -b`) |
| Regenerate Cloudflare env types  | `pnpm cf-typegen` (also runs on `postinstall`)                            |

`postinstall` runs `wrangler types` (writes `worker-configuration.d.ts`).

## The content pipeline — read this first, it is the hard part

Content is pulled **live from Notion's _private_ v3 frontend HTTP API**, _not_ the
official Notion API. No auth token. Requests go to
`https://<NOTION_SITE_DOMAIN>/api/v3/{queryCollection|loadPageChunk|syncRecordValuesMain}`.

- **`app/lib/notion/api.ts`:** the raw Notion client. `getCollection`, `getPage`,
  `getBlocksByIds`, `notionFetch`. `pMemoize`d in-process.
- **`app/lib/notion/normalize`:** Notion's recordMap is `__version__: 3` —
  `normalizeRecordMap` unwraps `entry.value.value` back to v2 shape. **Do not remove
  it; a version bump here breaks the whole site silently.**
- **`app/lib/fetcher.ts`:** `getPosts(env)` (whole collection → `Post[]`, sorted
  pinned-newest) and `getRecordMap(id, env)` (one page + all its blocks). This is the
  data boundary between Notion and the routes.
- **`app/lib/helpers.ts`:** `transformBlockToPost` maps a Notion block → `Post`,
  `makeSlugText` (slugify, `locale: "vi"` — this is a Vietnamese-language site), `mapTag`.
- **`app/components/notion/*`:** the block renderer (`block.tsx` dispatches;
  `text`/`code`/`callout`/`mermaid`/`equation`/`youtube-embed`/`google-drive`/`toggle`/…).
  New Notion block types are added as components here.
- **`app/lib/cache.ts` + `app/lib/fetcher-cache.ts`:** the caching layer (Cloudflare
  `Cache` API, SWR). **Read `docs/architecture-notion-cache.md` before touching cache**
  — it holds the agreed design and the known-open gaps (see Gotchas).

## Configuration that looks like constants but is Notion-specific

These are **brittle** and not ordinary app constants:

- **`.dev.vars` (gitignored)** holds the Notion
  `NOTION_SITE_DOMAIN`, `NOTION_SPACE_ID`, `NOTION_SOURCE_ID`, `NOTION_COLLECTION_VIEW_ID`.
  Copy from `.dev.vars.example`. **Never commit `.dev.vars`** (only `.dev.vars.example`).
- **`wrangler.jsonc` → `vars`:** holds the raw **Notion property _IDs_**
  (`NOTION_SCHEMA_SLUG: "Fxoz"`, `NOTION_SCHEMA_PUBLISHED`, …). `transformBlockToPost`
  reads properties by `${env.NOTION_SCHEMA_X}`. If a property is renamed in Notion,
  these IDs rot and sites render empty/wrong fields. **Agreed migration: resolve by
  _property name_ instead of hardcoding IDs — see `docs/architecture-notion-cache.md`.**
  Do not add new hardcoded schema IDs.
- **`wrangler.jsonc`** also holds `compatibility_date` (`2026-08-17`), `nodejs_compat`
  flag, `assets` binding (`./build/client/`), `cache.enabled: true`, `observability.enabled`.

## Path aliases & type generation

- **`~/*` → `./app/*`** (configured in `tsconfig.cloudflare.json` and Vite). Import
  app code as `~/lib/…`, `~/components/…`, not relative `../../`.
- **`verbatimModuleSyntax: true`** — type-only imports **must** use `import type { … }`.
- **Route types are generated, not hand-written:** `react-router typegen` writes
  `.react-router/types/app/**/+types/**` (e.g. `app/routes/+types/notes-detail.ts`).
  Route files `import type { Route } from "./+types/<name>"` and read
  `Route.LoaderArgs` / `Route.ComponentProps` / `Route.MetaArgs`. **Run `pnpm typecheck`
  after changing routes or loaders** rather than guessing the generated signature.
- **`worker-configuration.d.ts`** is generated by `wrangler types` (defines the `Env`
  type from `wrangler.jsonc` vars) and is gitignored — do not hand-edit; re-run
  `pnpm cf-typegen`.

## TypeScript project layout

Root `tsconfig.json` is a **composite** solution project referencing two:

- `tsconfig.node.json` — for `vite.config.ts` (`types: ["node"]`).
- `tsconfig.cloudflare.json` — for `app/**` and `workers/**`
  (`types: ["vite/client"]`, DOM libs, `rootDirs: [".", ".react-router/types"]`).

`tsc -b` in `pnpm typecheck` builds both. Errors usually show as a project reference
failing; run the full `pnpm typecheck`, not a bare `tsc`.

## File map

```
app/
  root.tsx                app shell, <Layout>, ErrorBoundary, <Meta>/<Links>
  routes.ts               route config (home, about, tags/[:tag], bookmarks, notes/[:slug])
  routes/                 route modules (loader/meta/Component). Fetch Notion in loaders.
  components/
    ui/                   primitives (shadcn-style, @base-ui/react + cva + clsx/tailwind-merge)
    layouts/              header, footer, search-modal, toggle-menu, section-heading
    posts/                post-header, post-body, post-list
    notion/               the Notion block renderer + renderer.tsx dispatcher
    home/                 home hero
  data/                   static site data (bookmarks, menu, tags, techs)
  lib/
    fetcher.ts            Notion data boundary (getPosts, getRecordMap)
    helpers.ts            block→Post transforms, slugify
    cache.ts, fetcher-cache.ts      Cloudflare Cache caching layer
    get-meta-data.ts      per-route meta/SEO
    notion/               Notion client + format/parse/type utilities
  hooks/                  use-mobile, use-post-date-status
workers/
  app.ts                  the Worker: React Router createRequestHandler (the entrypoint)
public/                   static assets shipped as-is
docs/
  architecture-notion-cache.md   THE design spec for the cache/Notion layer — read first
wrangler.jsonc            CF Worker config + Notion schema vars (see brittleness above)
package.json              scripts + deps (see Commands)
```

## Gotchas (real, will bite you)

- **This scrapes Notion's private API, not a public one.** The contract can change without
  notice; the `__version__:3` normalization already shows how much shifts. A Notion-side
  change can break `getCollection`/`getPage` with no local repro. Treat the Notion layer as
  an external, SLA-free dependency.
- **Caching: `staleIfError` is NOT currently implemented.** `fetcher-cache.ts` logs and
  throws on a Notion 4xx/5xx → a reader can get a 5xx. The `SWR` revalidate/fire-and-forget
  promise is also unreliable on a Worker (isolate teardown). The agreed design (edge 4h cache
  - `staleIfError` as the resilience layer) lives in
    **`docs/architecture-notion-cache.md`** and is **not yet built**. Read it before changing the cache.
- **`app/lib/fetcher.ts` → `runWithRedisCache` is an empty no-op** and
  `DISABLE_REDIS_CACHE` / Upstash vars in `.dev.vars.example` are **unwired**. The agreed
  model has **no Redis.** Don't build on the dead toggle; remove it (per the doc).
- **`app/routes/notes-detail.tsx` fires two Notion calls** (`getPosts` then
  `getRecordMap`) per uncached detail hit.
- **No test runner, linter, or formatter is configured** (no vitest/eslint/prettier config).
  Do not assume `pnpm test` / `pnpm lint` exist — run `pnpm typecheck` for correctness gates.
- **`CacheAPI.setUrl` hardcodes `https://shopify.dev/?${key}`** as the cache key URL —
  a leftover artifact, not related to Shopify. Fix the key before relying on cache keys.

## Conventions

- Imports: `~/*` alias, `import type` for types (`verbatimModuleSyntax`), ESM
  (`"type": "module"`).
- Styling: Tailwind utilities; theme tokens come from CSS vars in `app/app.css`
  (`--color-bg`, `--color-text`, `--color-accent`, …, `--font-*`). Don't inline raw
  hex where a token exists; extend `@theme` if a new token is needed.
- New blog feature → add a route in `app/routes.ts` + a route module; fetch in its
  `loader` via `app/lib/fetcher.ts`, never from a component.
- New Notion block type → add a component under `app/components/notion/` and wire it in
  the renderer dispatch.
- **Never commit `.dev.vars`, `.wrangler/`, `worker-configuration.d.ts`**, `*.tsbuildinfo`,
  or `build/` / `.react-router/` (all gitignored — see `.gitignore`).

## Before you "finish"

- Run `pnpm typecheck` (generates CF + route types, then `tsc -b`)
