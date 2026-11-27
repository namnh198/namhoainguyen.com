import { cn } from "~/lib/utils";

// one grey bar; pulses only when motion is allowed
const Bar = ({ className }: { className?: string }) => (
  <span className={cn("bg-bg-elevated block rounded-md motion-safe:animate-pulse", className)} />
);

// mirrors PostHeader's spacing so the real header lands where the skeleton was
const HeaderSkeleton = ({ pills = false }: { pills?: boolean }) => (
  <div className="border-border mb-12 border-b pt-16 pb-12 lg:pt-24 lg:pb-16">
    <div className="container space-y-5">
      <div className="flex items-center gap-3">
        <Bar className="size-10 shrink-0 lg:size-12" />
        <Bar className="h-9 w-2/3 max-w-[560px] lg:h-14" />
      </div>
      <div className="max-w-[62ch] space-y-2">
        <Bar className="h-5 w-full" />
        <Bar className="h-5 w-3/4" />
      </div>
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

/** Placeholder for the page at `pathname` while its loader runs. */
export function PageSkeleton({ pathname }: { pathname: string }) {
  const isNote = /^\/notes\/[^/]+/.test(pathname);
  const isTagsGrid = /^\/tags\/?$/.test(pathname);
  return (
    <main className="min-h-dvh" aria-busy="true" aria-label="Loading page">
      <HeaderSkeleton pills={isNote || pathname === "/notes"} />
      {isNote ? <NoteSkeleton /> : isTagsGrid ? <GridSkeleton /> : <ListSkeleton />}
    </main>
  );
}
