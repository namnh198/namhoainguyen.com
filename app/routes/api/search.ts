import type { Route } from "./+types/search";
import { searchNotion } from "~/lib/notion/api";

import { env } from "cloudflare:workers";
import { makeSlugText } from "~/lib/helpers";
import type { SearchResult } from "~/lib/notion/types";

export async function loader({ url }: Route.LoaderArgs) {
  const query = url.searchParams.get("q");
  if (!query) {
    return [];
  }
  const results = await searchNotion({
    query,
    notionDomain: env.NOTION_SITE_DOMAIN,
    ancestorId: env.NOTION_ANCESTOR_ID,
  });
  return parseSearchResults(results);
}

/**
 * We convert the format of search results got from /api/search-notion to the format we want
 * Note that: /api/search-notin uses an unofficial notion api, so the format is a little bit different
 */
function parseSearchResults(data: any): SearchResult[] {
  let results = [] as SearchResult[];
  if (!data || !data.results || data.results.length === 0) {
    return results;
  }

  for (const result of data.results) {
    const id = result.id;
    const properties = data.recordMap?.block?.[id]?.value?.properties;

    if (!properties) {
      continue;
    }

    const published = properties?.[env.NOTION_SCHEMA_PUBLISHED]?.[0]?.[0] === "Yes";
    const hide = properties?.[env.NOTION_SCHEMA_HIDE]?.[0]?.[0] === "Yes";
    const title = properties?.[env.NOTION_SCHEMA_TITLE]?.[0]?.[0];
    if (!title || hide || (import.meta.env.PROD && !published)) {
      continue;
    }
    const slug = properties?.[env.NOTION_SCHEMA_SLUG]?.[0]?.[0] || makeSlugText(title);
    const titleHighlighted =
      result?.highlight?.title
        ?.replaceAll(`<${env.NOTION_BOLD_SEARCH_KEY}>`, `<span style="color:#fbbf24;">`)
        ?.replaceAll(`</${env.NOTION_BOLD_SEARCH_KEY}>`, `</span>`) || title;
    const textHighlighted =
      result.highlight?.text
        ?.replaceAll(`<${env.NOTION_BOLD_SEARCH_KEY}>`, `<span style="color:#fbbf24;">`)
        ?.replaceAll(`</${env.NOTION_BOLD_SEARCH_KEY}>`, `</span>`) || null;

    results.push({
      id,
      title,
      slug,
      published,
      titleHighlighted,
      textHighlighted,
    });
  }

  return results;
}
