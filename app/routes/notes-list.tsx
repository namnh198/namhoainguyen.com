import { getMetaData } from "~/lib/get-meta-data";
import type { Route } from "./+types/notes-list";
import type { Post, Tag } from "~/lib/types";
import { getPosts } from "~/lib/fetcher";
import { env } from "cloudflare:workers";
import { PostHeader } from "~/components/posts/post-header";
import { IconNotebook, IconNotes, IconPin, IconLayoutGrid } from "@tabler/icons-react";
import { TAGS } from "~/data/tags";
import { Link } from "react-router";
import { getUri } from "~/lib/helpers";
import { PostList } from "~/components/posts/post-list";
import { LazyImage } from "~/components/ui/lazy-image";
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
  const recentTag: Tag = { name: "Recently Post", slug: "recent", icon: "/icons/clock-code.svg" };
  return (
    <main className="min-h-100vh">
      <PostHeader
        title="My Taking Notes"
        icon={<IconNotebook />}
        tags={tags}
        desc="When I learn something new, I write it down here. It helps me to remember and understand better. I hope you find it useful."
      />
      <div className="relative container">
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
    <div className="relative flex flex-col md:flex-row gap-y-6" id={`#tag-${tag.slug}`}>
      <div className="hidden lg:block md:w-48 shrink-0">
        <div className="md:sticky md:top-8 pb-10">
          <Link to={tagUri} className="font-heading text-sm font-medium text-muted-foreground block mb-3">
            {tag.name}
          </Link>
          {tag.icon && (
            <Link
              to={tagUri}
              className="inline-flex relative z-10 items-center justify-center w-10 h-10 text-text border border-border rounded-lg text-sm font-bold"
            >
              <LazyImage src={tag.icon} alt={tag.name} width={20} height={20} className="size-5" layout="constrained" />
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 md:pl-8 relative pb-10">
        <div className="hidden lg:block absolute top-2 left-0 w-px h-full bg-accent-glow">
          <div className="hidden lg:block absolute -translate-x-1/2 size-3 bg-accent rounded-full z-10" />
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
