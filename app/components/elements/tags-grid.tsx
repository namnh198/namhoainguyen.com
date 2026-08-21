import { Link } from "react-router";
import { getUri } from "~/lib/helpers";
import type { Post, Tag } from "~/lib/types";
import { PageIcon } from "../notion/page-icon";
import { IconTag } from "@tabler/icons-react";

export function TagsGrid({ notionDomain, tags, posts }: { notionDomain: string; tags: Tag[]; posts: Post[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          to={getUri(tag.slug, "tag")}
          className="space-y-2 bg-bg-elevated border transition-colors hover:border-border-bright rounded-lg py-4 px-5"
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center size-6 overflow-hidden rounded-full">
              <PageIcon
                inputIcon={tag.icon}
                notionDomain={notionDomain}
                className="object-cover"
                defaultIcon={<IconTag stroke={2} />}
              />
            </span>
            <span>{tag.name}</span>
          </span>
          <span className="inline-flex items-center justify-center bg-[#4f80ff14] text-accent text-xs py-0.5 px-1 rounded-sm border border-[#4f80ff3d] font-mono">
            {posts.filter((post) => post.tags.find((t) => t.slug == tag.slug)).length} posts
          </span>
        </Link>
      ))}
    </div>
  );
}
