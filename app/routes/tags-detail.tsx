import { IconLayoutGrid, IconNotebook, IconPinned } from "@tabler/icons-react";
import type { Route } from "./+types/tags-detail";
import { env } from "cloudflare:workers";
import { PostHeader } from "~/components/elements/post-header";
import { getPosts } from "~/lib/fetcher";
import { data } from "react-router";
import { TAGS } from "~/data/tags";
import { SectionHeading } from "~/components/layouts/section-heading";
import { PostList } from "~/components/elements/post-list";
import { getMetaData } from "~/lib/get-meta-data";

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
      <div className="relative container space-y-6 mb-12">
        <div className="flex flex-col gap-2">
          <SectionHeading title={tag.name} icon={<IconLayoutGrid stroke={2} />} />
        </div>
        <PostList posts={tagPosts} className="max-w-5xl" />
      </div>
    </main>
  );
}
