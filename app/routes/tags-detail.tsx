import { IconNotebook } from "@tabler/icons-react";
import { env } from "cloudflare:workers";
import { data } from "react-router";

import type { Route } from "./+types/tags-detail";

import { getPosts } from "~/lib/fetcher";
import { getMetaData } from "~/lib/get-meta-data";
import { TAGS } from "~/data/tags";

import { PostHeader } from "~/components/elements/post-header";
import { PostList } from "~/components/elements/post-list";
import { SectionHeading } from "~/components/layouts/section-heading";

export async function loader({ params }: Route.LoaderArgs) {
  const posts = await getPosts(env);
  const tagPosts = posts.filter((post) => post.tags.find((tag) => tag.slug === params.tag));
  const tag = tagPosts?.[0]?.tags.find((tag) => tag.slug === params.tag);
  const pinnedTags = TAGS.filter((tag) => tag.pinned);
  if (!tag) {
    throw data("Tag Not Found", { status: 404 });
  }

  return { tagPosts, pinnedTags, tag };
}

export function meta({ loaderData }: Route.ComponentProps) {
  const { tag } = loaderData;
  return getMetaData({
    title: `Tag ${tag.name}`,
    desc: tag.tooltip || `A list of posts with the tag ${tag.name}.`,
  });
}

export default function TagsDetail({ loaderData }: Route.ComponentProps) {
  const { tagPosts, pinnedTags, tag } = loaderData;
  return (
    <main className="min-h-dvh">
      <PostHeader
        title={`Tag ${tag.name}`}
        icon={<IconNotebook />}
        desc={`A list of posts with the tag ${tag.name}.`}
        tags={pinnedTags}
      />
      <div className="container mb-24 space-y-6">
        <SectionHeading title={`${tagPosts.length} ${tagPosts.length === 1 ? "note" : "notes"}`} />
        <PostList posts={tagPosts} />
      </div>
    </main>
  );
}
