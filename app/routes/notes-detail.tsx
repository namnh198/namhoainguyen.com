import type { Route } from "./+types/notes-detail";
import { env } from "cloudflare:workers";
import { data } from "react-router";
import { IconUser, IconCalendarEvent, IconRefresh } from "@tabler/icons-react";
import { getPosts } from "~/lib/fetcher";
import { getMetaData } from "~/lib/get-meta-data";
import { PostHeader } from "~/components/posts/post-header";
import { DateComponent } from "~/components/ui/date-component";

export async function loader({ params }: Route.LoaderArgs) {
  const allPosts = await getPosts(env);
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post || !post.id) {
    throw data("Post Not Found", { status: 404 });
  }

  return { post, slugKey: env.NOTION_SCHEMA_SLUG, notionDomain: env.NOTION_SITE_DOMAIN };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { post } = loaderData;
  return getMetaData({ title: post.title });
}

export default function NotesDetail({ loaderData }: Route.ComponentProps) {
  const { post, notionDomain } = loaderData;
  return (
    <main className="min-h-dvh">
      <PostHeader
        title={post.title}
        desc={post.description}
        tags={post.tags}
        icon={post.icon}
        notionDomain={notionDomain}
      >
        <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start">
          <div className="inline-flex items-center gap-1 font-medium">
            <IconUser stroke={1.5} size={20} className="stroke-text-2" />
            <span className="text-text-2 text-sm">Nam-Hoai Nguyen</span>
          </div>
          <div className="inline-flex items-center gap-1 font-medium">
            <IconCalendarEvent stroke={1.5} size={20} className="stroke-text-2" />
            <DateComponent date={post.createdAt} dateLabel="added" className="text-text-2 text-sm" />
          </div>
          <div className="inline-flex items-center gap-1 font-medium">
            <IconRefresh stroke={1.5} size={20} className="stroke-[#4ade80]" />
            <DateComponent date={post.updatedAt} dateLabel="updated" className="text-[#4ade80] text-sm" />
          </div>
        </div>
      </PostHeader>
      <div className="relative container mb-12">NOTES DETAILS</div>
    </main>
  );
}
