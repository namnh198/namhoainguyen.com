import { IconBookmarks, IconExternalLink, IconLayoutGrid } from "@tabler/icons-react";
import { PostHeader } from "~/components/posts/post-header";
import type { Route } from "./+types/bookmarks";
import { getMetaData } from "~/lib/get-meta-data";
import { BOOKMARKS } from "~/data/bookmarks";

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
    <main className="min-h-100vh">
      <PostHeader
        title="Bookmarks"
        desc="I’m always on the lookout for new apps and websites that can help me learn and work more effectively. Here’s a list of tools that I’ve found really useful so far."
        icon={<IconBookmarks stroke={2} />}
      >
        <div className="flex flex-wrap gap-2 mt-6">
          <span className="py-2 px-4 text-xs font-mono font-medium rounded-full whitespace-nowrap border border-[#4f80ff66] bg-accent-flow text-accent">{`${totalBookmarks} Bookmarks`}</span>
          <span className="py-2 px-4 text-xs font-mono font-medium rounded-full whitespace-nowrap border border-border bg-bg-card transition-colors ease-in-out text-text-2">{`${totalCatBookmarks} Categories`}</span>
        </div>
      </PostHeader>
      <div className="relative container lg:max-w-5xl">
        <div className="flex flex-col gap-12">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.title}>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                <span className="flex items-center justify-center rounded-md size-7 bg-accent-glow text-accent shrink-0">
                  <IconLayoutGrid stroke={2} width={14} height={14} />
                </span>
                <span className="text-xs text-text-3 font-bold uppercase">{bookmark.title}</span>
                <span className="bg-bg-elevated text-text-3 border ml-auto text-xs py-0.5 px-2 rounded-full">
                  {bookmark.list.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {bookmark.list.map((bmItem) => (
                  <a
                    key={bmItem.url}
                    href={bmItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex flex-col border bg-bg-card bg-linear-[180deg,#9b6dff09,transparent_46%)] gap-2 py-4 px-5 rounded-lg"
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-[0.9rem] leading-[1.35] font-semibold text-text">{bmItem.name}</span>
                      <IconExternalLink stroke={2} width={12} height={12} className="shrink-0 mt-0.5" />
                    </span>
                    {bmItem.excerpt && (
                      <span className="text-[0.8rem] leading-normal text-text-2">{bmItem.excerpt}</span>
                    )}
                    <span className="inline-flex items-center justify-center whitespace-nowrap border rounded-sm font-mono text-[.7rem] text-text-3 bg-bg-elevated w-fit mt-0.5 py-0.5 px-1.5">
                      {new URL(bmItem.url).host}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
