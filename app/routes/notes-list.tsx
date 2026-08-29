import type { Post, Tag } from "~/lib/types";

import { IconLayoutGrid, IconNotebook, IconNotes, IconPin } from "@tabler/icons-react";
import { env } from "cloudflare:workers";
import { Link } from "react-router";

import type { Route } from "./+types/notes-list";

import { getPosts } from "~/lib/fetcher";
import { getMetaData } from "~/lib/get-meta-data";
import { getUri } from "~/lib/helpers";
import { TAGS } from "~/data/tags";

import { LazyImage } from "~/components/ui/lazy-image";
import { PostHeader } from "~/components/elements/post-header";
import { PostList } from "~/components/elements/post-list";
import { SectionHeading } from "~/components/layouts/section-heading";

export function meta({}: Route.MetaArgs) {
  return getMetaData({
    title: "Lab Notes",
    desc: "A collection of my lab notes and experiments.",
  });
}

export async function loader({}: Route.LoaderArgs) {
  const posts = await getPosts(env);
  const tags = TAGS.filter((tag) => tag.pinned);

  return {
    posts,
    tags,
  };
}

const POST_LIMIT = 10;

export default function NotesList({ loaderData }: Route.ComponentProps) {
  const { posts, tags } = loaderData;
  const recentTag: Tag = {
    name: "Recently Post",
    slug: "recent",
    icon: "https://res.cloudinary.com/dabgirqbj/image/upload/v1787331458/nhn.com/clock_cdrtbp.png",
  };
  return (
    <main className="min-h-dvh">
      <PostHeader
        title="My Taking Notes"
        icon={<IconNotebook />}
        tags={tags}
        desc="When I learn something new, I write it down here. It helps me to remember and understand better. I hope you find it useful."
      />
      <div className="relative container mb-12">
        <NoteListSection posts={posts.slice(0, POST_LIMIT)} tag={recentTag} />
        {tags.map((tag) => {
          const tagPosts = posts.filter((post) => post.tags.find((t) => t.slug === tag.slug)).slice(0, POST_LIMIT);
          if (tagPosts.length === 0) {
            return null;
          }
          return <NoteListSection key={tag.slug} posts={tagPosts} tag={tag} />;
        })}
      </div>
    </main>
  );
}

const NoteListSection = ({ posts, tag }: { posts: Post[]; tag: Tag }) => {
  const tagUri = tag.slug === "recent" ? "/notes" : getUri(tag.slug, "tag");
  return (
    <div className="relative flex flex-col gap-y-6 md:flex-row" id={`#tag-${tag.slug}`}>
      <div className="hidden shrink-0 md:w-48 lg:block">
        <div className="pb-10 md:sticky md:top-8">
          <Link to={tagUri} className="font-heading text-muted-foreground mb-3 block text-sm font-medium">
            {tag.name}
          </Link>
          {tag.icon && (
            <Link
              to={tagUri}
              className="text-text border-border relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-bold"
            >
              <LazyImage src={tag.icon} alt={tag.name} width={20} height={20} className="size-5" layout="constrained" />
            </Link>
          )}
        </div>
      </div>
      <div className="relative flex-1 pb-10 md:pl-8">
        <div className="bg-accent-glow absolute top-2 bottom-0 left-0 hidden w-px lg:block">
          <div className="bg-accent absolute z-10 hidden size-3 -translate-x-1/2 rounded-full lg:block" />
        </div>
        <div className="space-y-6">
          <div className="relative z-10 flex flex-col gap-2">
            <SectionHeading
              title={tag.name}
              icon={<IconLayoutGrid stroke={2} />}
              viewAll={tag.slug !== "recent" ? tagUri : ""}
            />
          </div>
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
};
