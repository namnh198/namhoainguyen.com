import { IconExternalLink } from "@tabler/icons-react";
import type { BookmarkItem } from "~/data/bookmarks";

export function BookmarkList({ bookmarks }: { bookmarks: BookmarkItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
      {bookmarks.map((bookmark) => (
        <a
          key={bookmark.url}
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/bookmark relative flex flex-col border transition-all hover:-translate-y-0.5 hover:bg-bg-elevated hover:border-border-bright bg-bg-card bg-linear-[180deg,#9b6dff09,transparent_46%)] gap-2 py-4 px-5 rounded-lg"
        >
          <span className="absolute inset-0 top-0 left-0 bottom-0 transition-opacity opacity-0 group-hover/bookmark:opacity-100 bg-linear-[180deg,var(--accent),var(--accent-2)] w-0.75 rounded-tl-lg rounded-bl-lg" />
          <span className="flex items-start justify-between gap-2">
            <span className="text-[0.9rem] leading-[1.35] font-semibold text-text">{bookmark.name}</span>
            <IconExternalLink stroke={2} width={12} height={12} className="shrink-0 mt-0.5" />
          </span>
          {bookmark.excerpt && <span className="text-[0.8rem] leading-normal text-text-2">{bookmark.excerpt}</span>}
          <span className="inline-flex items-center justify-center whitespace-nowrap border rounded-sm font-mono text-[.7rem] text-text-3 bg-bg-elevated w-fit mt-0.5 py-0.5 px-1.5 transition-colors">
            {new URL(bookmark.url).host}
          </span>
        </a>
      ))}
    </div>
  );
}
