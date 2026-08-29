import { IconBookmarks, IconExternalLink, IconLayoutGrid } from "@tabler/icons-react";

import type { Route } from "./+types/bookmarks";

import { getMetaData } from "~/lib/get-meta-data";
import { BOOKMARKS } from "~/data/bookmarks";

import { BookmarkList } from "~/components/elements/bookmarks-list";
import { PostHeader } from "~/components/elements/post-header";

export function meta({}: Route.MetaArgs) {
  return getMetaData({
    title: "Bookmarks",
  });
}

export function loader() {
  const catBookMark = BOOKMARKS.flatMap((bm) => bm.title);
  const totalBookmarks = BOOKMARKS.reduce((total, bm) => total + bm.list.length, 0);
  const totalCatBookmarks = catBookMark.length;
  return {
    bookmarks: BOOKMARKS,
    totalBookmarks,
    catBookMark,
    totalCatBookmarks,
  };
}

export default function Bookmarks({ loaderData }: Route.ComponentProps) {
  const { bookmarks, totalBookmarks, totalCatBookmarks } = loaderData;
  return (
    <main className="min-h-dvh">
      <PostHeader
        title="Bookmarks"
        desc="I’m always on the lookout for new apps and websites that can help me learn and work more effectively. Here’s a list of tools that I’ve found really useful so far."
        icon={<IconBookmarks stroke={2} />}
      >
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="bg-accent-flow text-accent rounded-full border border-[#4f80ff66] px-4 py-2 font-mono text-xs font-medium whitespace-nowrap">{`${totalBookmarks} Bookmarks`}</span>
          <span className="border-border bg-bg-card text-text-2 rounded-full border px-4 py-2 font-mono text-xs font-medium whitespace-nowrap transition-colors ease-in-out">{`${totalCatBookmarks} Categories`}</span>
        </div>
      </PostHeader>
      <div className="relative container pb-12">
        <div className="flex flex-col gap-12">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.title}>
              <div className="mb-4 flex items-center gap-3 border-b pb-3">
                <span className="bg-accent-glow text-accent flex size-7 shrink-0 items-center justify-center rounded-md">
                  <IconLayoutGrid stroke={2} width={14} height={14} />
                </span>
                <span className="text-text-3 text-xs font-bold uppercase">{bookmark.title}</span>
                <span className="bg-bg-elevated text-text-3 ml-auto rounded-full border px-2 py-0.5 text-xs">
                  {bookmark.list.length}
                </span>
              </div>
              <BookmarkList bookmarks={bookmark.list} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
