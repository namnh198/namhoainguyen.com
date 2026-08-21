import type { Post } from "~/lib/types";
import { Link } from "react-router";
import { IconNotes, IconPin } from "@tabler/icons-react";
import { DateComponent } from "../ui/date-component";
import { getUri } from "~/lib/helpers";
import { usePostDateStatus, type PostDateStatus } from "~/hooks/use-post-date-status";
import { cn, getLabelLang } from "~/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Badge } from "../ui/badge";

export function PostList({ posts, className }: { posts: Post[]; className?: string }) {
  return (
    <article className={cn("border rounded-xl overflow-hidden", className)}>
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
      className="flex items-center gap-3 py-4 px-6 border-b last:border-none transition-colors hover:bg-bg-card"
    >
      {post.pinned ? <IconPin stroke={2} /> : <IconNotes stroke={2} />}
      <span className="flex-1 inline-flex items-center gap-1.5">
        <span className="font-medium text-text" role="heading" aria-level={3}>
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
      <span className="hidden sm:flex items-center flex-wrap gap-2">
        <PostDateStatusBadge className="font-mono" status={postStatus} updateDate={post.updatedAt} />
      </span>
    </Link>
  );
}

export function PostDateStatusBadge({
  updateDate,
  status,
  className,
}: {
  updateDate: string;
  status: PostDateStatus;
  className?: string;
}) {
  const variant = status === "new" ? "orange" : "green";

  return (
    <Badge variant={variant} className={className}>
      <DateComponent date={updateDate} dateLabel={status == "new" ? "created" : "updated "} />
    </Badge>
  );
}
