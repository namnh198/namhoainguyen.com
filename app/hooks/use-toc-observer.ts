import { useEffect, useRef, useState } from "react";

export function useTocObserver(tocElements: string[], defaultActiveId: string = "") {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState(defaultActiveId);
  const [doneTocs, setDoneTocs] = useState<string[]>([]);
  const tocs: string[] = [];

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const toc: string[] = [];
          let tocIndex: string | null = null;
          for (const tocEntry of tocs) {
            if (tocEntry === entry?.target?.id) {
              tocIndex = tocEntry;
              break;
            } else {
              toc.push(tocEntry);
            }
          }

          if (tocIndex) {
            setDoneTocs(toc);
          }

          setActiveId(entry?.target?.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "-80px 0% -80% 0px",
    });
    const elements = document.querySelectorAll(tocElements.join(","));
    elements.forEach((elem) => {
      tocs.push(elem.id);
      observer?.current?.observe(elem);
    });
    return () => observer?.current?.disconnect();
  }, [tocElements]);

  return { activeId, setActiveId, doneTocs, setDoneTocs };
}
