import type { NotionComponents } from "~/components/notion/context";

import { IconCalendarEvent, IconNotes, IconRefresh, IconUser } from "@tabler/icons-react";
import { env } from "cloudflare:workers";
import { data } from "react-router";

import type { Route } from "./+types/notes-detail";

import { getPosts, getRecordMap } from "~/lib/fetcher";
import { getMetaData } from "~/lib/get-meta-data";
import { parsePageId } from "~/lib/notion/parse-page-id";
import { cn } from "~/lib/utils";

import { DateComponent } from "~/components/ui/date-component";
import { PostBody } from "~/components/elements/post-body";
import { PostHeader } from "~/components/elements/post-header";

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
  return getMetaData({ title: post.title, desc: "I fail my way to success." });
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
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
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
            <DateComponent date={post.updatedAt} dateLabel="updated" className="text-sm text-[#4ade80]" />
          </div>
        </div>
      </PostHeader>
      <PostBody
        post={post}
        recordMap={recordMap}
        blockOptions={{ slugKey, notionDomain }}
        className={cn("notion-page relative container mb-12", { "discrete-page": post.discrete })}
      />
    </main>
  );
}
