'use client'

import { useHeadsObserver } from '@notion-x/hooks/hook'
import { Tag } from '@notion-x/interface'
import cn from 'classnames'
import Link from 'next/link'

type NotesTocProps = {
  tags: Tag[]
  className?: string
}

export default function NotesToc({ tags, className }: NotesTocProps) {
  const { activeId } = useHeadsObserver(['h2'])
  return (
    <div className={className}>
      <div
        className={cn(
          'p-4 flex flex-col divide-y thi-box-code md:bg-transparent md:border-none md:shadow-none'
        )}
      >
        <div className="pb-2 font-heading font-semibold text-slate-800">Notes by topics</div>
        <div
          className={cn(
            'grid grid-cols-2 gap-1 md:grid-cols-1 pt-3 overflow-auto notion-scrollbar notion-scrollbar-small',
            'text-[0.9rem]'
          )}
        >
          <a
            className={cn('hover:m2it-link flex gap-2 items-center group', {
              'text-slate-600': activeId !== 'recently-updated-notes',
              'text-slate-900 font-semibold hover:font-semibold':
                activeId === 'recently-updated-notes'
            })}
            key="recently-updated-notes"
            href="#recently-updated-notes"
          >
            <div>Recently updated notes</div>
          </a>
          {tags.map((tag: Tag) => (
            <a
              className={cn('hover:notion-link flex gap-2 items-center group', {
                'text-slate-600': activeId !== tag.slug,
                'text-slate-900 font-semibold hover:font-semibold': activeId === tag.slug
              })}
              key={tag.slug}
              href={`#${tag.slug}`}
            >
              <div>{tag.name}</div>
            </a>
          ))}
          <Link className="italic text-[0.9rem] pt-2 text-slate-700 hover:m2it-link" href="/tags/">
            👉 See all topics...
          </Link>
        </div>
      </div>
    </div>
  )
}
