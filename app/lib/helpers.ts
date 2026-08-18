import type { Block } from "notion-types";
import type { Post, Tag } from "./types";

import slugify from "slugify";
import { TAGS } from "~/data/tags";

/**
 * transform notion block to post
 */
export const transformBlockToPost = (block: Block, env: Env): Post => {
  const id = block.id;
  const properties = block.properties || {};
  const title = properties?.title?.[1]?.[0] || properties?.title?.[0]?.[0];
  const slug = makeSlugText(properties?.[`${env.NOTION_SCHEMA_SLUG}`]?.[0]?.[0] || title);
  const description = properties?.[`${env.NOTION_SCHEMA_DESCRIPTION}`]?.[0]?.[0];
  const published = properties?.[`${env.NOTION_SCHEMA_PUBLISHED}`]?.[0]?.[0] === "Yes";
  const pinned = properties?.[`${env.NOTION_SCHEMA_PINNED}`]?.[0]?.[0] === "Yes";
  const verified = properties?.[`${env.NOTION_SCHEMA_VERIFIED}`]?.[0]?.[0] === "Yes";
  const discrete = properties?.[`${env.NOTION_SCHEMA_DISCRETE}`]?.[0]?.[0] === "Yes";
  const icon = block?.format?.page_icon;
  const hide = properties?.[`${env.NOTION_SCHEMA_HIDE}`]?.[0]?.[0] === "Yes";
  const createdAt = new Date(block.created_time).toISOString();
  const updatedAt = new Date(
    properties?.[`${env.NOTION_SCHEMA_LAST_MODIFIED}`]?.[0]?.[1]?.[0]?.[1]?.start_date || block.last_edited_time,
  ).toISOString();
  const language = properties?.[`${env.NOTION_SCHEMA_LANGUAGE}`]?.[0]?.[0] || "en";
  const tags = properties?.[`${env.NOTION_SCHEMA_TAGS}`]?.[0]?.[0]?.split(",")?.map((tag: string) => mapTag(tag)) || [];

  return {
    id,
    title,
    slug,
    description,
    createdAt,
    updatedAt,
    icon,
    tags,
    published,
    pinned,
    verified,
    discrete,
    hide,
    language,
  };
};

/**
 * make slug text from string
 * lowercase, remove special characters, replace spaces with hyphens
 */
export const makeSlugText = (text?: string | null): string => {
  if (!text) {
    return "";
  }

  return slugify(text, {
    lower: true,
    locale: "vi",
    remove: /[:?&".,/\\]/g,
  });
};

/**
 * map tag to tag object
 */
export const mapTag = (tag: string): Tag => {
  const existsTag = TAGS.find((t) => t.name.toLowerCase() === tag.toLowerCase());
  if (existsTag) {
    return existsTag;
  }

  return {
    name: tag,
    slug: makeSlugText(tag),
  };
};

/**
 * get uri for note or tag
 */
export const getUri = (uri: string = "/", type: "note" | "tag" = "note"): string => {
  const slug = makeSlugText(uri);
  switch (type) {
    case "note":
      return `/notes/${slug}`;
    case "tag":
      return `/tags/${slug}`;
    default:
      throw new Error(`Unknown URI type: ${type}`);
  }
};
