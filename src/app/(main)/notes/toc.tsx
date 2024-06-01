'use client'

import { useHeadsObserver } from '@/lib/hook'
import { Tag } from '@/types/interface'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NoteToc({ tags, className }: { tags: Tag[]; className?: string }) {
  const { activeId } = useHeadsObserver(['h2'])

  return (
    <div className={cn('p-4 flex flex-col divide-y md:bg-transparent md:border-none md:shadow-none', [className])}>
      <div className='pb-2 font-semibold text-neutral-900 dark:text-neutral-100'>Notes By Topics</div>
      <div className='grid grid-cols-2 gap-1 md:grid-cols-1 pt-3 overflow-auto notion-scrollbar notion-scrollbar-small text-[0.9rem]'>
        {tags.map((tag) => (
          <a
            key={tag.slug}
            href={`#${tag.slug}`}
            className={cn('flex gap-2 items-center group', {
              'text-slate-600 dark:text-slate-400': activeId !== tag.slug,
              'text-slate-900 dark:text-neutral-200 font-semibold hover:font-semibold': activeId === tag.slug
            })}
          >
            <span>{tag.name}</span>
          </a>
        ))}
        <Link href='/tags' className='italic pt-2 text-slate-900 dark:text-slate-400'>
          👉 See all topics...
        </Link>
      </div>
    </div>
  )
}
