import type { Post, Tag } from "~/lib/types";

import { IconTag } from "@tabler/icons-react";
import { Link } from "react-router";

import { getUri } from "~/lib/helpers";

import { PageIcon } from "../notion/page-icon";

export function TagsGrid({ notionDomain, tags, posts }: { notionDomain: string; tags: Tag[]; posts: Post[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          to={getUri(tag.slug, "tag")}
          className="bg-bg-elevated hover:border-border-bright space-y-2 rounded-lg border px-5 py-4 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-flex size-6 items-center justify-center overflow-hidden rounded-full">
              <PageIcon
                inputIcon={tag.icon}
                notionDomain={notionDomain}
                className="object-cover"
                defaultIcon={<IconTag stroke={2} />}
              />
            </span>
            <span>{tag.name}</span>
          </span>
          <span className="text-accent inline-flex items-center justify-center rounded-sm border border-[#4f80ff3d] bg-[#4f80ff14] px-1 py-0.5 font-mono text-xs">
            {posts.filter((post) => post.tags.find((t) => t.slug == tag.slug)).length} posts
          </span>
        </Link>
      ))}
    </div>
  );
}
