import type { BookmarkItem } from "~/data/bookmarks";

import { IconExternalLink } from "@tabler/icons-react";

export function BookmarkList({ bookmarks }: { bookmarks: BookmarkItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {bookmarks.map((bookmark) => (
        <a
          key={bookmark.url}
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:border-border-bright bg-bg-card flex flex-col gap-2 rounded-lg border p-5 transition-[transform,border-color] duration-150 pointer-fine:hover:-translate-y-0.5"
        >
          <span className="flex items-start justify-between gap-2">
            <span className="text-text leading-snug font-medium">{bookmark.name}</span>
            <IconExternalLink
              stroke={2}
              aria-label="Opens in a new tab"
              className="text-text-2 mt-0.5 size-4 shrink-0"
            />
          </span>
          {bookmark.excerpt && <span className="text-text-2 text-sm leading-normal">{bookmark.excerpt}</span>}
          <span className="text-text-2 mt-auto pt-2 font-mono text-[13px]">{new URL(bookmark.url).host}</span>
        </a>
      ))}
    </div>
  );
}
