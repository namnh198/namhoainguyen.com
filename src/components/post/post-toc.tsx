import type { Toc } from '@/types';
import clsx from 'clsx';
import { useTocObserver, buildHierarchy } from '@/components/post/useToc.ts';
import type { MarkdownHeading } from 'astro';
import { useEffect, useState } from 'react';

export default function PostToc({ tocs, isHiddenToc }: { tocs?: MarkdownHeading[]; isHiddenToc?: boolean }) {
  if (!tocs || tocs.length < 4) return null;
  const tocHeadings = buildHierarchy(tocs);

  const [isShowMoveToTop, setIsShowMoveToTop] = useState(false);
  const [isShowToc, setIsShowToc] = useState(false);

  const { activeId, doneTocs } = useTocObserver(['h2', 'h3']);

  const handleToggleToc = () => {
    setIsShowToc(prev => {
      if (document.documentElement.scrollTop > 300 && prev) {
        setIsShowMoveToTop(true);
      } else {
        setIsShowMoveToTop(false);
      }

      return !prev;
    });
  };

  useEffect(() => {
    const handleToggleMoveToTop = () => {
      if (isShowToc) {
        setIsShowMoveToTop(false);
        return;
      }
      const top = document.documentElement.scrollTop;
      setIsShowMoveToTop(top > 300);
    };
    window.addEventListener('scroll', handleToggleMoveToTop);
    return () => window.removeEventListener('scroll', handleToggleMoveToTop);
  }, [isShowToc]);

  return (
    <div className="fixed right-2.5 bottom-0 w-[90vw] max-w-[500px] z-10">
      <button
        className={clsx(
          'group absolute bottom-0 right-[205px] z-10 flex items-center justify-center px-5 py-3 text-text bg-mantle border border-surface0 rounded-t-xl overflow-hidden transition-transform will-change-transform duration-300',
          { 'translate-y-full': !isShowMoveToTop, 'translate-y-0': isShowMoveToTop }
        )}
        onClick={() => window.scrollTo(0, 0)}
      >
        <span className="absolute top-0 left-0 block size-full opacity-5 bg-text transition-transform will-change-transform duration-500 scale-x-0 origin-[100%_100%] group-hover:scale-x-100 group-hover:origin-[0_0]"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-up"
        >
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
      </button>
      {!isHiddenToc && (
        <nav
          className={clsx(
            'absolute bottom-0 right-0 w-full h-[500px] max-h-[calc(100vh-100px)] transition-transform duration-500 will-change-transform translate-y-full',
            {
              '!translate-y-0': isShowToc
            }
          )}
        >
          <div className="absolute bottom-full left-0 flex justify-end w-full">
            <button
              className="group relative flex items-center justify-center px-5 py-3 w-[200px] text-text bg-mantle rounded-t-xl border border-surface0 border-b-mantle overflow-hidden"
              onClick={handleToggleToc}
            >
              <span className="absolute top-0 left-0 block size-full opacity-5 bg-text transition-transform will-change-transform duration-500 scale-x-0 origin-[100%_100%] group-hover:scale-x-100 group-hover:origin-[0_0]"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-list"
              >
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
                <path d="M3 6h.01" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M8 6h13" />
              </svg>
              <span className="font-bold ml-2">Table of Content</span>
            </button>
          </div>
          <div className="size-full p-[25px_55px_25px_25px] overflow-y-scroll no-scrollbar bg-mantle rounded-tl-xl border border-surface0">
            <PostTocContent tocs={tocHeadings} activeId={activeId} doneTocs={doneTocs} />
          </div>
        </nav>
      )}
    </div>
  );
}

const PostTocContent = ({
  tocs,
  activeId = '',
  doneTocs = []
}: {
  tocs: Toc[];
  activeId?: string;
  doneTocs?: string[];
}) => {
  return (
    <ul>
      {tocs.map((toc, index) => {
        return (
          <PostTocItem
            toc={toc}
            activeId={activeId}
            key={toc.slug}
            doneTocs={doneTocs}
            isLastItem={index === tocs.length - 1}
            isParent={toc.subheadings && toc.subheadings.length > 0}
          />
        );
      })}
    </ul>
  );
};

const PostTocItem = ({
  toc,
  activeId = '',
  doneTocs = [],
  isParent,
  isLastItem
}: {
  toc: Toc;
  activeId?: string;
  doneTocs?: string[];
  className?: string;
  isParent?: boolean;
  isLastItem?: boolean;
}) => {
  return (
    <li key={toc.slug} className="pl-7">
      <a
        href={`#${toc.slug}`}
        className={clsx('group relative block text-text py-1.5', {
          'is-active': activeId === toc.slug,
          'is-done': doneTocs.includes(toc.slug)
        })}
      >
        <span className="transition-opacity duration-150 ease-in-out">{toc.text}</span>
        <span className="absolute top-1/2 -left-5 size-0">
          <span className="block absolute -top-[3px] -left-[3px] size-1.5 rounded-sm bg-surface0 transition-transform duration-150 ease-in-out scale-100 group-[.is-active]:bg-mauve group-[.is-active]:scale-150 group-[.is-done]:scale-0"></span>
          <span className="block absolute -top-[5px] -left-[5px] size-2.5 transition-transform scale-0 text-green group-[.is-done]:scale-100">
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
        <span
          className={clsx('absolute -left-5 bottom-0 size-0', {
            hidden: isLastItem
          })}
        >
          <span
            className={clsx('absolute -top[4px] -left-[1px] bg-surface0', {
              'w-[11px] h-[calc(1em+4px)] border-l-2 border-b-2 border-surface0 rounded-bl-lg bg-transparent': isParent,
              'w-[2px] h-[8px]': !isParent
            })}
          ></span>
        </span>
      </a>
      {toc.subheadings && toc.subheadings.length ? (
        <PostTocContent tocs={toc.subheadings} activeId={activeId} doneTocs={doneTocs} />
      ) : null}
    </li>
  );
};
