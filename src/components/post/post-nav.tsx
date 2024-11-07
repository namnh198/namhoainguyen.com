import type { Tag } from '@/types';
import { useTocObserver } from './useToc.ts';

export default function PostNav({ recentTag, pinnedTags }: { recentTag: Tag; pinnedTags: Tag[] }) {
  const { activeId } = useTocObserver();

  return (
    <nav className="hidden xs:block bg-mantle w-[56px] xs:w-[62px] md:w-[68px] lg:[74px] xl:w-[80px] rounded-tl-xl rounded-bl-xl">
      <div className="counter-list sticky top-16">
        <PostNavItem tag={recentTag} isActive={activeId === recentTag.slug || !activeId} />
        {pinnedTags.map(tag => (
          <PostNavItem key={tag.slug} tag={tag} isActive={activeId === tag.slug} />
        ))}
      </div>
    </nav>
  );
}

const PostNavItem = ({ tag, isActive }: { tag: Tag; isActive?: boolean }) => {
  return (
    <a
      href={`#${tag.slug}`}
      className={`group flex items-center justify-center relative w-full h-[calc(80px*(62/86))]`}
      data-toc-nav={tag.slug}
      aria-label={tag.name}
    >
      {isActive && (
        <>
          <span
            className={`absolute top-0 left-0 size-full transition-opacity ease-in-out duration-150 bg-gradient-to-r from-${tag.color}/5 to-${tag.color}/20`}
          ></span>
          <span className={`absolute top-0 right-0 h-full w-1 bg-${tag.color}`}></span>
        </>
      )}

      <span className="relative tooltip" data-tooltip={tag.name}>
        <span
          className={`counter inline-block text-[0px] font-extrabold before:text-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-200 ease-in-out ${isActive ? 'opacity-100' : ''}`}
        >
          {tag.name}
        </span>
      </span>
    </a>
  );
};
