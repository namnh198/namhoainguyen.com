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
      return "text-[#94a3b8] [&_*]:text-[#94a3b8]";
    case "brown":
      return "text-[#fcaf8c] [&_*]:text-[#fcaf8c]";
    case "orange":
      return "text-[#fca5a5] [&_*]:text-[#fca5a5]";
    case "yellow":
      return "text-[#fb923c] [&_*]:text-[#fb923c]";
    case "teal":
      return "text-[#4ade80] [&_*]:text-[#4ade80]";
    case "blue":
      return "text-[#38bdf8] [&_*]:text-[#38bdf8]";
    case "purple":
      return "text-[#818cf8] [&_*]:text-[#818cf8]";
    case "pink":
      return "text-[#e879f9] [&_*]:text-[#e879f9]";
    case "red":
      return "text-[#f87171] [&_*]:text-[#f87171]";
    // Highlight
    case "gray_background":
      return "text-[#94a3b8] bg-[#1a1d2e] border border-[#334155] p-0.5 rounded-sm";
    case "brown_background":
      return "text-[#fcaf8c] bg-[#1d100c] border border-[#7c3d12] p-0.5 rounded-sm";
    case "orange_background":
      return "text-[#fca5a5] bg-[#2d1515] border border-[#7f1d1d] p-0.5 rounded-sm";
    case "yellow_background":
      return "text-[#fb923c] bg-[#2a2010] border border-[#7c3d12] p-0.5 rounded-sm";
    case "blue_background":
      return "text-[#38bdf8] bg-[#101e2e] border border-[#0c4a6e] p-0.5 rounded-sm";
    case "purple_background":
      return "text-[#818cf8] bg-[#181828] border border-[#3730a3] p-0.5 rounded-sm";
    case "pink_background":
      return "text-[#e879f9] bg-[#1e1028] border border-[#7e22ce] p-0.5 rounded-sm";
    case "red_background":
      return "text-[#f87171] bg-[#1c1010] border border-[#6b1414] p-0.5 rounded-sm";
    case "teal_background":
      return "text-[#4ade80] bg-[#101e15] border border-[#14532d] p-0.5 rounded-sm";
    default:
      return "bg-bg text-text-2";
  }
};
