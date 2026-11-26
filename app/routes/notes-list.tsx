import type { Post, Tag } from "~/lib/types";

import { IconNotebook } from "@tabler/icons-react";
import { env } from "cloudflare:workers";

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
    notionDomain: env.NOTION_SITE_DOMAIN,
  };
}

const POST_LIMIT = 10;

export default function NotesList({ loaderData }: Route.ComponentProps) {
  const { posts, tags, notionDomain } = loaderData;
  const recentTag: Tag = {
    name: "Recent",
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
      <div className="container mb-24 space-y-16">
        <NoteListSection posts={posts.slice(0, POST_LIMIT)} tag={recentTag} notionDomain={notionDomain} />
        {tags.map((tag) => {
          const tagPosts = posts.filter((post) => post.tags.find((t) => t.slug === tag.slug)).slice(0, POST_LIMIT);
          if (tagPosts.length === 0) {
            return null;
          }
          return <NoteListSection key={tag.slug} posts={tagPosts} tag={tag} notionDomain={notionDomain} />;
        })}
      </div>
    </main>
  );
}

const NoteListSection = ({ posts, tag, notionDomain }: { posts: Post[]; tag: Tag; notionDomain: string }) => {
  const tagUri = tag.slug === "recent" ? "/notes" : getUri(tag.slug, "tag");
  return (
    <section className="space-y-6" id={`tag-${tag.slug}`}>
      <SectionHeading
        title={tag.name}
        icon={
          tag.icon ? (
            <LazyImage src={tag.icon} alt="" width={24} height={24} className="size-6" layout="constrained" />
          ) : undefined
        }
        viewAll={tag.slug !== "recent" ? tagUri : ""}
      />
      <PostList posts={posts} notionDomain={notionDomain} />
    </section>
  );
};
