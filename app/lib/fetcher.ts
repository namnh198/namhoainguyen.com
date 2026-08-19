import type { Block, ExtendedRecordMap } from "notion-types";
import { getCollection, getPage } from "./notion/api";
import type { Post } from "./types";
import { transformBlockToPost } from "./helpers";

export const runWithRedisCache = async <T>() => {};

/**
 * fetch posts from notion collection
 */
export const getPosts = async (env: Env, forceRefresh: boolean = false): Promise<Post[]> => {
  const data = await getCollection({
    notionDomain: env.NOTION_SITE_DOMAIN,
    collectionViewId: env.NOTION_COLLECTION_VIEW_ID,
    sourceId: env.NOTION_SOURCE_ID,
    spaceId: env.NOTION_SPACE_ID,
  });

  const blocks = data?.recordMap?.block || {};
  const postIds = data?.allBlockIds || [];
  const posts: Post[] = [];
  for (const id of postIds) {
    const block = blocks[id]?.value as Block;
    const properties = block?.properties || {};
    const title = properties?.title?.[1]?.[0] || properties?.title?.[0]?.[0];
    const published = properties?.[`${env.NOTION_SCHEMA_PUBLISHED}`]?.[0]?.[0] === "Yes";
    const hide = properties?.[`${env.NOTION_SCHEMA_HIDE}`]?.[0]?.[0] === "Yes";

    if (!title || hide) {
      continue;
    }

    if (import.meta.env.PROD && !published) {
      continue;
    }

    const post = transformBlockToPost(block, env);
    posts.push(post);
  }

  return posts.sort(
    (a: Post, b: Post) =>
      Number(b.pinned) - Number(a.pinned) || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
};

/**
 * fetch post by slug
 */
export const getRecordMap = async (
  pageId: string,
  env: Env,
  forceRefresh: boolean = false,
): Promise<ExtendedRecordMap> => {
  const recordMap = await getPage(env.NOTION_SITE_DOMAIN, pageId);
  return recordMap;
};
