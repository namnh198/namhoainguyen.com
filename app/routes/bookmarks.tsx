import { IconBookmarks } from "@tabler/icons-react";

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
          <span className="text-text-2 font-mono text-[13px]">{`${totalBookmarks} bookmarks in ${totalCatBookmarks} categories`}</span>
        </div>
      </PostHeader>
      <div className="container pb-24">
        <div className="flex flex-col gap-16">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.title}>
              <h2 className="font-heading mb-6 flex items-baseline gap-3 text-2xl leading-tight font-medium tracking-[-0.02em] lg:text-[28px]">
                {bookmark.title}
                <span className="text-text-2 font-mono text-[13px] font-normal tracking-normal">
                  {bookmark.list.length}
                </span>
              </h2>
              <BookmarkList bookmarks={bookmark.list} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
