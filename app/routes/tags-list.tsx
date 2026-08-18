import type { Route } from "./+types/tags-list";
import { env } from "cloudflare:workers";
import { IconTag, IconTags } from "@tabler/icons-react";
import { PostHeader } from "~/components/posts/post-header";
import { getPosts } from "~/lib/fetcher";
import { getMetaData } from "~/lib/get-meta-data";
import { Link } from "react-router";
import { getUri } from "~/lib/helpers";
import { PageIcon } from "~/components/notion/page-icon";

export async function loader({}: Route.LoaderArgs) {
  const posts = await getPosts(env);
  const allTags = posts.flatMap((post) => post.tags);

  const tags = [...new Map(allTags.map((tag) => [tag.slug, tag])).values()];

  return {
    posts,
    tags,
    notionDomain: env.NOTION_SITE_DOMAIN,
  };
}

export function meta({}: Route.MetaArgs) {
  return getMetaData({
    title: "Tags List",
    desc: "A list of topics I write about.",
  });
}

export default function TagsList({ loaderData }: Route.ComponentProps) {
  const { posts, tags, notionDomain } = loaderData;
  return (
    <main className="min-h-100vh">
      <PostHeader
        title="List all tags"
        icon={<IconTags stroke={2} />}
        desc={
          <span>
            A list of topics I write about. You can use{" "}
            <kbd className="bg-accent-glow text-accent rounded-sm text-sm py-0.5 px-1 font-mono">⌘ F</kbd> to quickly
            find a topic you wanna check.
          </span>
        }
      />
      <div className="relative container">
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
                    icon={tag.icon}
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
      </div>
    </main>
  );
}
