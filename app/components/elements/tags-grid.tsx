import type { Post, Tag } from "~/lib/types";

import { IconTag } from "@tabler/icons-react";
import { Link } from "react-router";

import { getUri } from "~/lib/helpers";

import { PageIcon } from "../notion/page-icon";

export function TagsGrid({ notionDomain, tags, posts }: { notionDomain: string; tags: Tag[]; posts: Post[] }) {
  const count = (slug: string) => posts.filter((post) => post.tags.some((t) => t.slug === slug)).length;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          to={getUri(tag.slug, "tag")}
          className="bg-bg-card hover:border-border-bright flex flex-col items-start gap-4 rounded-lg border p-4 transition-[transform,border-color] duration-150 sm:gap-6 sm:p-6 pointer-fine:hover:-translate-y-0.5"
        >
          <span className="inline-flex size-6 items-center justify-center overflow-hidden rounded-full">
            <PageIcon
              inputIcon={tag.icon}
              notionDomain={notionDomain}
              className="object-cover"
              defaultIcon={<IconTag stroke={2} />}
            />
          </span>
          <span className="flex flex-col">
            <span className="font-medium">{tag.name}</span>
            <span className="text-text-2 font-mono text-[13px]">
              {count(tag.slug)} {count(tag.slug) === 1 ? "note" : "notes"}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
