import type { PostDateStatus } from "~/hooks/use-post-date-status";
import type { Post } from "~/lib/types";

import { IconNotes, IconPin } from "@tabler/icons-react";
import { Link } from "react-router";

import { getUri } from "~/lib/helpers";
import { cn, getLabelLang } from "~/lib/utils";
import { usePostDateStatus } from "~/hooks/use-post-date-status";

import { Badge } from "../ui/badge";
import { DateComponent } from "../ui/date-component";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function PostList({ posts, className }: { posts: Post[]; className?: string }) {
  return (
    <article className={cn("bg-bg-card overflow-hidden rounded-lg border", className)}>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </article>
  );
}

export function PostListItem({ post, withinDay = 7 }: { post: Post; withinDay?: number }) {
  const postStatus = usePostDateStatus(post.createdAt, post.updatedAt, withinDay);
  return (
    <Link
      to={getUri(post.slug, "note")}
      className="hover:bg-bg-elevated flex min-h-14 items-center gap-3 border-b px-4 py-3 transition-colors last:border-none sm:px-6"
      aria-label={`${post.title} note`}
    >
      {post.pinned ? (
        <IconPin stroke={2} aria-label="Pinned" className="text-text-2 size-5 shrink-0" />
      ) : (
        <IconNotes stroke={2} aria-hidden="true" className="text-text-2 size-5 shrink-0" />
      )}
      <span className="inline-flex flex-1 items-center gap-1.5">
        <span className="text-text font-medium" role="heading" aria-level={3}>
          {post.title}
        </span>
        {post.language && post.language !== "en" && (
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="grey" className="font-mono">
                {post.language}
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              <p>written in {getLabelLang(post.language)}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </span>
      <span className="hidden flex-wrap items-center gap-2 sm:flex">
        <PostDateStatusBadge
          className="font-mono"
          status={postStatus}
          createdDate={post.createdAt}
          updateDate={post.updatedAt}
        />
      </span>
    </Link>
  );
}

export function PostDateStatusBadge({
  updateDate,
  createdDate,
  status,
  className,
}: {
  updateDate: string;
  createdDate: string;
  status: PostDateStatus;
  className?: string;
}) {
  const isNew = status === "new";
  const variant = isNew ? "orange" : "green";

  return (
    <Badge variant={variant} className={className}>
      <DateComponent date={isNew ? createdDate : updateDate} dateLabel={status == "new" ? "created" : "updated "} />
    </Badge>
  );
}
