import type { Route } from "./+types/notes-detail";
import { env } from "cloudflare:workers";
import { data } from "react-router";
import { IconUser, IconCalendarEvent, IconRefresh, IconNote, IconNotes } from "@tabler/icons-react";
import { PostHeader } from "~/components/posts/post-header";
import { DateComponent } from "~/components/ui/date-component";
import { PostBody } from "~/components/posts/post-body";
import { getPosts, getRecordMap } from "~/lib/fetcher";
import { getMetaData } from "~/lib/get-meta-data";
import { parsePageId } from "~/lib/notion/parse-page-id";

export async function loader({ params }: Route.LoaderArgs) {
  const allPosts = await getPosts(env);
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post || !post.id) {
    throw data("Post Not Found", { status: 404 });
  }
  const parseIdWithDash = parsePageId(post.id);
  if (!parseIdWithDash) {
    throw data("Invalid Notion Page ID", { status: 400 });
  }
  const recordMap = await getRecordMap(parseIdWithDash, env);

  return { post, recordMap, slugKey: env.NOTION_SCHEMA_SLUG, notionDomain: env.NOTION_SITE_DOMAIN };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { post } = loaderData;
  return getMetaData({ title: post.title });
}

export default function NotesDetail({ loaderData }: Route.ComponentProps) {
  const { post, recordMap, slugKey, notionDomain } = loaderData;
  return (
    <main className="min-h-dvh">
      <PostHeader
        title={post.title}
        desc={post.description}
        tags={post.tags}
        icon={post.icon || <IconNotes />}
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
      <PostBody
        recordMap={recordMap}
        blockOptions={{ slugKey, notionDomain }}
        className="notion-page relative container mb-12"
      />
    </main>
  );
}
