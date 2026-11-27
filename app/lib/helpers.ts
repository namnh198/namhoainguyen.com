import type { Block, Color } from "notion-types";

import slugify from "slugify";

import type { Post, Tag } from "./types";

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
/** Every tag at least one post uses, once each, by name. Only these have a /tags/:tag page. */
export const getUsedTags = (posts: Post[]): Tag[] =>
  [...new Map(posts.flatMap((post) => post.tags).map((tag) => [tag.slug, tag])).values()].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

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

export const hashKey = (queryKey: string | readonly unknown[]) => {
  const rawKeys = Array.isArray(queryKey) ? queryKey : [queryKey];
  let hash = "";
  for (const key of rawKeys) {
    if (key !== null && typeof key === "object") {
      hash += JSON.stringify(key);
    } else if (key !== null) {
      hash += key.toString();
    }
  }
  return hash;
};

export function generateAnchor(blockId: string, text: string) {
  return `${makeSlugText(text)}-${blockId.slice(-5)}`;
}

export const uuidToId = (uuid: string) => uuid.replaceAll("-", "");

export const mapBlockColorClass = (color: Color | undefined) => {
  switch (color) {
    case "gray":
      return "text-text-2 [&_*]:text-text-2";
    case "brown":
      return "text-ctp-flamingo [&_*]:text-ctp-flamingo";
    case "orange":
      return "text-ctp-peach [&_*]:text-ctp-peach";
    case "yellow":
      return "text-ctp-yellow [&_*]:text-ctp-yellow";
    case "teal":
      return "text-ctp-teal [&_*]:text-ctp-teal";
    case "blue":
      return "text-ctp-blue [&_*]:text-ctp-blue";
    case "purple":
      return "text-ctp-mauve [&_*]:text-ctp-mauve";
    case "pink":
      return "text-ctp-pink [&_*]:text-ctp-pink";
    case "red":
      return "text-ctp-red [&_*]:text-ctp-red";
    // Highlight
    case "gray_background":
      return "text-text-2 bg-bg-elevated border border-border-bright p-0.5 rounded-sm";
    case "brown_background":
      return "text-ctp-flamingo bg-ctp-flamingo/10 border border-ctp-flamingo/30 p-0.5 rounded-sm";
    case "orange_background":
      return "text-ctp-peach bg-ctp-peach/10 border border-ctp-peach/30 p-0.5 rounded-sm";
    case "yellow_background":
      return "text-ctp-yellow bg-ctp-yellow/10 border border-ctp-yellow/30 p-0.5 rounded-sm";
    case "teal_background":
      return "text-ctp-teal bg-ctp-teal/10 border border-ctp-teal/30 p-0.5 rounded-sm";
    case "blue_background":
      return "text-ctp-blue bg-ctp-blue/10 border border-ctp-blue/30 p-0.5 rounded-sm";
    case "purple_background":
      return "text-ctp-mauve bg-ctp-mauve/10 border border-ctp-mauve/30 p-0.5 rounded-sm";
    case "pink_background":
      return "text-ctp-pink bg-ctp-pink/10 border border-ctp-pink/30 p-0.5 rounded-sm";
    case "red_background":
      return "text-ctp-red bg-ctp-red/10 border border-ctp-red/30 p-0.5 rounded-sm";
    default:
      return "bg-bg text-text-2";
  }
};
