import type { NotionComponents } from "~/components/notion/context";

import { IconNotes } from "@tabler/icons-react";
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
        <p className="text-text-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[13px]">
          <span>By Nam Hoai Nguyen</span>
          <span aria-hidden="true">·</span>
          <DateComponent date={post.createdAt} dateLabel="added" />
          <span aria-hidden="true">·</span>
          <DateComponent date={post.updatedAt} dateLabel="updated" />
        </p>
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
