import pMemoize from "p-memoize";

import type { CollectionInstance, ExtendedRecordMap, PageChunk } from "./types";

import { getPageBlockIds } from "./get-block-value";
import { parsePageId } from "./parse-page-id";

/**
 * fetch Notion collection view
 */
export const getCollection = pMemoize(
  async ({
    notionDomain,
    collectionViewId,
    sourceId,
    spaceId,
  }: {
    notionDomain: string;
    collectionViewId: string;
    sourceId: string;
    spaceId: string;
  }) => {
    const data = await notionFetch<CollectionInstance>({
      notionDomain,
      endpoint: "queryCollection",
      body: {
        source: {
          type: "collection",
          id: sourceId,
          spaceId,
        },
        collectionView: {
          id: collectionViewId,
          spaceId,
        },
        loader: {
          reducers: {
            collection_group_results: {
              type: "results",
              limit: 9999,
            },
          },
          searchQuery: "",
          userTimeZone: "America/Chicago",
        },
      },
    });

    if (data?.recordMap) {
      data.recordMap = normalizeRecordMap(data.recordMap);
    }

    return data;
  },
  {
    cacheKey: (...args) => JSON.stringify(args),
  },
);

/**
 * fetch notion page with all its blocks
 */
export const getPage = pMemoize(
  async (notionDomain: string, pageId: string): Promise<ExtendedRecordMap> => {
    const parsedPageId = parsePageId(pageId);
    if (!parsedPageId) {
      throw new Error(`Invalid Notion page ID: ${pageId}`);
    }
    const page = await notionFetch<PageChunk>({
      notionDomain,
      endpoint: "loadPageChunk",
      body: {
        pageId: parsedPageId,
        cursor: {
          stack: [],
        },
        limit: 999,
        chunkNumber: 0,
        verticalColumns: false,
      },
    });

    if (page?.recordMap) {
      page.recordMap = normalizeRecordMap(page.recordMap);
    }

    const recordMap: ExtendedRecordMap = {
      ...(page?.recordMap || {}),
      collection: page?.recordMap?.collection ?? {},
      collection_view: page?.recordMap?.collection_view ?? {},
      notion_user: page?.recordMap?.notion_user ?? {},
      collection_query: {},
      signed_urls: {},
    };

    if (!recordMap?.block) {
      throw new Error(`Notion page not found "${parsedPageId}"`);
    }

    let iterations = 0;
    const maxIterations = 10; // Prevent infinite loops

    while (iterations < maxIterations) {
      // Find blocks that are referenced but not yet loaded
      const pendingBlockIds = getPageBlockIds(recordMap).filter((id) => !recordMap.block[id]);

      if (!pendingBlockIds.length) {
        break;
      }

      // Fetch missing blocks
      const newBlocks = await getBlocksByIds(notionDomain, pendingBlockIds);
      recordMap.block = { ...recordMap.block, ...newBlocks.recordMap.block };

      iterations++;
    }

    return recordMap;
  },
  {
    cacheKey: (...args) => JSON.stringify(args),
  },
);

export const searchNotion = pMemoize(
  async ({ query, notionDomain, ancestorId }: { query: string; notionDomain: string; ancestorId: string }) => {
    const data = await notionFetch<CollectionInstance>({
      notionDomain,
      endpoint: "search",
      body: {
        type: "BlocksInAncestor",
        query: query,
        ancestorId: ancestorId,
        source: "quick_find_input_change",
        sort: {
          field: "relevance",
        },
        limit: 100,
        filters: {
          isDeletedOnly: false,
          excludeTemplates: false,
          navigableBlockContentOnly: false,
          requireEditPermissions: false,
          includePublicPagesWithoutExplicitAccess: true,
          ancestors: [],
          createdBy: [],
          editedBy: [],
          lastEditedTime: {},
          createdTime: {},
          inTeams: [],
        },
      },
    });

    if (data?.recordMap) {
      data.recordMap = normalizeRecordMap(data.recordMap);
    }

    return data;
  },
  {
    cacheKey: (...args) => JSON.stringify(args),
  },
);

/**
 * fetch multiple blocks by their IDs
 * @returns
 */
export const getBlocksByIds = async (notionDomain: string, blockIds: string[]): Promise<PageChunk> => {
  const data = await notionFetch<PageChunk>({
    notionDomain,
    endpoint: "syncRecordValuesMain",
    body: {
      requests: blockIds.map((blockId) => ({
        table: "block",
        id: blockId,
        version: -1,
      })),
    },
  });
  if (data?.recordMap) {
    data.recordMap = normalizeRecordMap(data.recordMap);
  }
  return data;
};

/**
 * fetchData from Notion API
 */
export const notionFetch = async <T>({
  notionDomain,
  endpoint,
  method = "POST",
  body,
  headers = {},
}: {
  notionDomain: string;
  endpoint: string;
  method?: "GET" | "POST";
  body?: object;
  headers?: Record<string, string>;
}): Promise<T> => {
  const url = `https://${notionDomain}/api/v3/${endpoint}`;

  const res = await fetch(url, {
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    mode: "no-cors",
    method,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`failed to fetchData from Notion API: ${res.status} ${res.statusText}`);
  }

  return await res.json<T>();
};

/**
 * Normalize Notion API v3 recordMap format back to v2 format.
 *
 * In v3 (`__version__: 3`), each entry in `block`, `collection`, etc. is wrapped as:
 *   `{ value: { value: <actual data>, role: "..." } }`
 * In v2, it was:
 *   `{ value: <actual data> }`
 */
function normalizeRecordMap(recordMap: any) {
  if (!recordMap || recordMap.__version__ !== 3) {
    return recordMap;
  }
  const tablesToNormalize = ["block", "collection", "collection_view", "notion_user", "space", "custom_emoji"];

  for (const table of tablesToNormalize) {
    const entries = recordMap[table];
    if (!entries) continue;

    for (const id of Object.keys(entries)) {
      const entry = entries[id];
      // v3 pattern: entry.value = { value: actualData, role: "..." }
      // v2 pattern: entry.value = actualData (which has id, type, properties, etc.)
      if (entry?.value?.value && entry.value.role !== undefined) {
        entries[id] = { value: entry.value.value, role: entry.value.role };
      }
    }
  }

  return recordMap;
}
