import type { Post } from "~/lib/types";

import { IconBook, IconPin } from "@tabler/icons-react";
import { Link } from "react-router";

import { getUri } from "~/lib/helpers";
import { formatDate } from "~/lib/notion/utils";
import { cn, getLabelLang } from "~/lib/utils";

import { PageIcon } from "../notion/page-icon";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

// same rows as the home page's latest-notes list: hairline rows, the title as a nav word, the date in mono
export function PostList({
  posts,
  notionDomain,
  className,
}: {
  posts: Post[];
  notionDomain: string;
  className?: string;
}) {
  return (
    <ul className={cn("border-t", className)}>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} notionDomain={notionDomain} />
      ))}
    </ul>
  );
}

export function PostListItem({ post, notionDomain }: { post: Post; notionDomain: string }) {
  return (
    <li className="border-b">
      <Link to={getUri(post.slug, "note")} className="flex min-h-16 items-center gap-4 py-3">
        <span className="text-text-2 grid size-6 shrink-0 place-items-center" aria-hidden="true">
          <PageIcon
            inputIcon={post.icon}
            notionDomain={notionDomain}
            defaultIcon={<IconBook stroke={2} className="size-5" />}
            className="size-5"
          />
        </span>
        <span className="flex flex-1 items-center gap-2 text-base font-medium lg:text-lg">
          <span className="nav-word">{post.title}</span>
          {post.language && post.language !== "en" && (
            <Tooltip>
              <TooltipTrigger render={<span />}>
                <Badge variant="grey" className="font-mono">
                  {post.language}
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                <p>written in {getLabelLang(post.language)}</p>
              </TooltipContent>
            </Tooltip>
          )}
          {post.pinned && <IconPin aria-label="Pinned" className="text-text-2 size-4 shrink-0" />}
        </span>
        <span className="text-text-2 hidden shrink-0 font-mono text-[13px] sm:block">{formatDate(post.createdAt)}</span>
      </Link>
    </li>
  );
}
