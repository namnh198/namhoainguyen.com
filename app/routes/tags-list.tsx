import type { Route } from "./+types/tags-list";
import { env } from "cloudflare:workers";
import { IconTags } from "@tabler/icons-react";
import { PostHeader } from "~/components/elements/post-header";
import { TagsGrid } from "~/components/elements/tags-grid";
import { getPosts } from "~/lib/fetcher";
import { getMetaData } from "~/lib/get-meta-data";

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
    <main className="min-h-dvh">
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
      <div className="relative container mb-12">
        <TagsGrid notionDomain={notionDomain} tags={tags} posts={posts} />
      </div>
    </main>
  );
}
