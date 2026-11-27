import { cn } from "~/lib/utils";

// one grey bar; pulses only when motion is allowed
const Bar = ({ className }: { className?: string }) => (
  <span className={cn("bg-bg-elevated block rounded-md motion-safe:animate-pulse", className)} />
);

// mirrors PostHeader's spacing so the real header lands where the skeleton was
const HeaderSkeleton = ({
  pills = false,
  icon = true,
  meta = false,
  lead = 2,
}: {
  pills?: boolean;
  icon?: boolean;
  meta?: boolean;
  lead?: number;
}) => (
  <div className="border-border mb-12 border-b pt-16 pb-12 lg:pt-24 lg:pb-16">
    <div className="container space-y-5">
      <div className="flex items-center gap-3">
        {icon && <Bar className="size-10 shrink-0 lg:size-12" />}
        {/* one title line: 34px / 56px type at 1.05 leading */}
        <Bar className="h-9 w-2/3 max-w-[560px] lg:h-[59px]" />
      </div>
      {/* one 28px slot per line of the text-lg lead; the last line runs short. flex keeps the my-1 margins from collapsing */}
      <div className="flex max-w-[62ch] flex-col">
        {Array.from({ length: lead }, (_, i) => (
          <Bar key={i} className={cn("my-1 h-5", i === lead - 1 ? "w-3/4" : "w-full")} />
        ))}
      </div>
      {/* the bookmarks count line under the lead */}
      {meta && (
        <div className="mt-6">
          <Bar className="h-5 w-56" />
        </div>
      )}
      {pills && (
        <div className="flex flex-wrap gap-2 pt-3">
          {["w-24", "w-20", "w-28", "w-18", "w-22"].map((w) => (
            <Bar key={w} className={cn("h-11", w)} />
          ))}
        </div>
      )}
    </div>
  </div>
);

const ListSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className="container mb-24 space-y-6">
    <Bar className="h-7 w-40" />
    <ul className="border-t">
      {Array.from({ length: rows }, (_, i) => (
        <li key={i} className="flex min-h-16 items-center gap-4 border-b py-3">
          <Bar className="size-6 shrink-0" />
          <Bar className={cn("h-5 flex-1", i % 2 ? "max-w-[420px]" : "max-w-[560px]")} />
          <Bar className="ml-auto h-4 w-20 shrink-0" />
        </li>
      ))}
    </ul>
  </div>
);

const GridSkeleton = () => (
  <div className="container mb-24 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
    {Array.from({ length: 8 }, (_, i) => (
      <Bar key={i} className="h-32 rounded-lg sm:h-40" />
    ))}
  </div>
);

const NoteSkeleton = () => (
  <div className="container mb-12">
    <div className="max-w-[72ch] space-y-3.5 lg:space-y-5">
      {[
        ["w-full", "w-full", "w-5/6"],
        ["w-full", "w-2/3"],
      ].map((lines, i) => (
        <div key={i} className="space-y-2">
          {lines.map((w, j) => (
            <Bar key={j} className={cn("h-4", w)} />
          ))}
        </div>
      ))}
      <Bar className="h-40 rounded-lg" />
      <div className="space-y-2">
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-4/5" />
      </div>
    </div>
  </div>
);

// home: the centred hero (new-note line, two-line title, lead, two buttons) over the pinned-notes window.
// The hero starts 96px (lg 120px) from the page top; this sits under the header's pt-nav, hence pt-10 / lg:pt-12.
const HomeSkeleton = () => (
  <div className="container pt-10 pb-24 lg:pt-12">
    <div className="mx-auto grid max-w-[880px] justify-items-center gap-4">
      <Bar className="h-8 w-64 max-w-full" />
      <Bar className="h-10 w-11/12 max-w-[600px] lg:h-[72px]" />
      <Bar className="h-10 w-3/4 max-w-[480px] lg:h-[72px]" />
      <div className="w-full max-w-[52ch] space-y-2">
        <Bar className="mx-auto h-5 w-full" />
        <Bar className="mx-auto h-5 w-2/3" />
      </div>
      <div className="mt-3 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
        <Bar className="h-11 w-full sm:w-44" />
        <Bar className="h-11 w-32" />
      </div>
    </div>
    <div className="mt-8 rounded-lg border p-4 max-[359px]:hidden lg:p-8">
      <Bar className="mx-auto h-72 max-w-[880px] rounded-lg lg:h-80" />
    </div>
  </div>
);

// about: "Tools I work with" (a heading, a lead, a 2/3/6-column grid of tool chips) then Projects (1/2/3-column cards)
const AboutSkeleton = () => (
  <div className="container space-y-20 pb-24 lg:space-y-28 lg:pb-32">
    <div className="space-y-8">
      <div className="space-y-3">
        <Bar className="h-8 w-56 lg:h-9" />
        <Bar className="h-5 w-80 max-w-full" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <Bar key={i} className="h-14 rounded-lg" />
        ))}
      </div>
    </div>
    <div className="space-y-8">
      <div className="space-y-3">
        <Bar className="h-8 w-40 lg:h-9" />
        <Bar className="h-5 w-96 max-w-full" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {Array.from({ length: 3 }, (_, i) => (
          <Bar key={i} className="h-48 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

// bookmarks: groups, each a heading with its count over a 1/2/3-column grid of link cards
const BookmarksSkeleton = () => (
  <div className="container flex flex-col gap-16 pb-24">
    {[6, 3].map((cards, i) => (
      <div key={i}>
        <Bar className="mb-6 h-7 w-48 lg:h-8" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {Array.from({ length: cards }, (_, j) => (
            <Bar key={j} className="h-32 rounded-lg" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

/** Placeholder for the page at `pathname` while its loader runs. */
export function PageSkeleton({ pathname }: { pathname: string }) {
  const isNote = /^\/notes\/[^/]+/.test(pathname);
  const isTagsGrid = /^\/tags\/?$/.test(pathname);
  if (pathname === "/") {
    return (
      <main className="min-h-dvh" aria-busy="true" aria-label="Loading page">
        <HomeSkeleton />
      </main>
    );
  }
  return (
    <main className="min-h-dvh" aria-busy="true" aria-label="Loading page">
      <HeaderSkeleton
        pills={isNote || pathname === "/notes"}
        icon={pathname !== "/about"}
        meta={pathname === "/bookmarks"}
        lead={pathname === "/bookmarks" ? 3 : 2}
      />
      {isNote ? (
        <NoteSkeleton />
      ) : isTagsGrid ? (
        <GridSkeleton />
      ) : pathname === "/about" ? (
        <AboutSkeleton />
      ) : pathname === "/bookmarks" ? (
        <BookmarksSkeleton />
      ) : (
        <ListSkeleton />
      )}
    </main>
  );
}
