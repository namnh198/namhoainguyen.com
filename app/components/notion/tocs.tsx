import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { useIsMobile } from "~/hooks/use-mobile";
import { useTocObserver } from "~/hooks/use-toc-observer";
import { generateAnchor } from "~/lib/helpers";
import type { TableOfContentsEntry } from "~/lib/notion/get-page-tocs";
import { cn } from "~/lib/utils";

export function Tocs({ tocs, className }: { tocs: Array<TableOfContentsEntry>; className?: string }) {
  const { activeId, doneTocs } = useTocObserver([".notion-page h2", ".notion-page h3"]);
  const [openToc, setOpenToc] = useState(false);
  const isMobile = useIsMobile(1024);
  return (
    <aside
      className={cn(
        "tocs flex bg-bg-card w-full border rounded-xl flex-col lg:sticky lg:top-18 h-fit lg:h-[calc(100vh-110px)] overflow-hidden",
        className,
      )}
    >
      <div
        className="flex py-3 bg-bg-elevated border-b px-5 gap-1.5 items-center justify-between cursor-pointer lg:hidden"
        onClick={() => setOpenToc(!openToc)}
      >
        <span>In this notes</span>
        <IconChevronRight width={20} height={20} />
      </div>
      <div
        className={cn("px-3 overflow-y-auto", {
          "py-5 lg:px-5": !isMobile,
          hidden: isMobile && !openToc,
          block: isMobile && openToc,
        })}
      >
        {tocs.map((toc, index) => {
          const tocId = generateAnchor(toc.id, toc.text);
          const isActive = activeId === tocId;
          const isDone = doneTocs.indexOf(tocId) !== -1;
          const nextToc = index === tocs.length ? undefined : tocs[index + 1];
          const isHiddenDivider =
            !nextToc ||
            (toc.type === "sub_header" && nextToc.type === "header") ||
            (toc.type === "sub_sub_header" && nextToc.type !== "sub_sub_header");
          return (
            <div
              key={toc.id}
              className={cn(toc.type, {
                "pl-4": toc.type === "sub_header",
                "pl-8": toc.type === "sub_sub_header",
              })}
            >
              <a
                href={`#${tocId}`}
                className={cn("group block relative py-1.5 transition-colors", {
                  "is-active": !isDone && isActive,
                  "is-done": isDone,
                })}
              >
                <span className="text-sm text-text-2 hover:text-text group-[.is-active]:text-text! group-[.is-done]:text-text!">
                  {toc.text}
                </span>
                <span className="absolute top-1/2 -left-4 size-0">
                  <span className="block absolute -top-0.75 -left-0.75 size-1.5 rounded-sm bg-border-bright transition-all ease-in-out scale-100 group-[.is-active]:bg-accent-2 group-[.is-active]:scale-150 group-[.is-done]:scale-0"></span>
                  <span className="block absolute -top-1.25 -left-0.75 size-2.5 transition-transform scale-0 text-success group-[.is-done]:scale-100">
                    <svg
                      version="1.1"
                      id="Calque_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 9.9 9"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M5.3,8.4l4.3-6c0.5-0.7,0.4-1.6-0.3-2.1C8.6-0.2,7.7-0.1,7.2,0.6L3.8,5.3L2.4,4.1C1.8,3.6,0.8,3.7,0.3,4.3c-0.5,0.6-0.4,1.6,0.2,2.1l2.7,2.2C3.5,8.9,3.8,9,4.2,9h0.1C4.8,8.9,5.1,8.7,5.3,8.4z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </span>
                <span className={cn("absolute -left-4 bottom-0 size-0 toc-divider", { hidden: isHiddenDivider })}>
                  <span className="absolute -top-1.5 -left-px bg-border-bright w-0.5 h-2"></span>
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
