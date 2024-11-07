import { useEffect, useRef, useState } from 'react';
import type { Toc } from '@/types';
import type { MarkdownHeading } from 'astro';

export function useTocObserver(tocElements?: string[]) {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState('');
  const [doneTocs, setDoneTocs] = useState<string[]>([]);
  const tocs: string[] = [];

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
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
      rootMargin: '-80px 0% -80% 0px'
    });
    const elements = document.querySelectorAll(tocElements?.join(',') || '[data-toc] [data-toc-item]');
    elements.forEach(elem => {
      tocs.push(elem.id);
      observer?.current?.observe(elem);
    });
    return () => observer?.current?.disconnect();
  }, [tocElements]);

  return { activeId, setActiveId, doneTocs, setDoneTocs };
}

export function buildHierarchy(headings?: MarkdownHeading[]) {
  const toc: Toc[] = [];
  const parentHeadings = new Map();

  if (!headings) return toc;

  headings.forEach((h: Toc) => {
    const heading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    // Change 2 to 1 if your markdown includes your <h1>
    if (heading.depth === 2) {
      toc.push(heading);
    } else if (heading.depth === 3) {
      parentHeadings.get(heading.depth - 1).subheadings.push(heading);
    }
  });

  return toc;
}
