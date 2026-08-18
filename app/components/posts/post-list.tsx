import type { Post } from "~/lib/types";
import { Link } from "react-router";
import { IconNotes, IconPin } from "@tabler/icons-react";
import { DateComponent } from "../ui/date-component";
import { getUri } from "~/lib/helpers";
import { usePostDateStatus, type PostDateStatus } from "~/hooks/use-post-date-status";
import { cn } from "~/lib/utils";

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
        {post.language !== "en" && (
          <span className="inline-flex text-xs items-center justify-center whitespace-nowrap py-0.5 px-2 border rounded-full bg-accent-glow text-accent">
            {post.language}
          </span>
        )}
      </span>
      <span className="flex items-center flex-wrap gap-2">
        <PostDateStatusBadge status={postStatus} updateDate={post.updatedAt} />
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
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-medium py-0.5 px-1.5 border rounded-sm text-xs",
        {
          "text-[#fb923c] bg-[#201510] border-[#7c2d12]": status === "new",
          "text-[#4ade80] bg-[#101e15] border-[#14532d]": status === "updated" || status == "updatedWithin",
        },
        [className],
      )}
    >
      <DateComponent date={updateDate} dateLabel={status == "new" ? "created" : "updated "} />
    </span>
  );
}
