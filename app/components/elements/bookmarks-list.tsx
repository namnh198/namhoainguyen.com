import type { BookmarkItem } from "~/data/bookmarks";

import { IconExternalLink } from "@tabler/icons-react";

export function BookmarkList({ bookmarks }: { bookmarks: BookmarkItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <a
          key={bookmark.url}
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/bookmark hover:bg-bg-elevated hover:border-border-bright bg-bg-card bg-linear-[180deg,#9b6dff09,transparent_46%)] relative flex flex-col gap-2 rounded-lg border px-5 py-4 transition-all hover:-translate-y-0.5"
        >
          <span className="absolute inset-0 top-0 bottom-0 left-0 w-0.75 rounded-tl-lg rounded-bl-lg bg-linear-[180deg,var(--accent),var(--accent-2)] opacity-0 transition-opacity group-hover/bookmark:opacity-100" />
          <span className="flex items-start justify-between gap-2">
            <span className="text-text text-[0.9rem] leading-[1.35] font-semibold">{bookmark.name}</span>
            <IconExternalLink stroke={2} width={12} height={12} className="mt-0.5 shrink-0" />
          </span>
          {bookmark.excerpt && <span className="text-text-2 text-[0.8rem] leading-normal">{bookmark.excerpt}</span>}
          <span className="text-text-3 bg-bg-elevated mt-0.5 inline-flex w-fit items-center justify-center rounded-sm border px-1.5 py-0.5 font-mono text-[.7rem] whitespace-nowrap transition-colors">
            {new URL(bookmark.url).host}
          </span>
        </a>
      ))}
    </div>
  );
}
