'use client'

import type { Post } from '@notion-x/interface'
import { usePostDateStatus } from '@notion-x/hooks/hook'
import { cn } from '@/lib/utils'

import { CgFileDocument } from 'react-icons/cg'
import { HiMiniCheckBadge } from 'react-icons/hi2'
import { AiFillPushpin } from 'react-icons/ai'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import DateComponent from '@notion-x/components/DateComponent'
import { defaultMaxDayWithThin } from '@/lib/config'

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <section className='rounded-xl bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-slate-600'>
      <div className='flow-root'>
        <div className='flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700'>
          {posts.map((post) => (
            <PostSimple key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

const PostSimple = ({ post }: { post: Post }) => {
  const status = usePostDateStatus(post.createdDate!, post.updatedDate!, defaultMaxDayWithThin)
  return (
    <Link
      href={post.permalink}
      className='group flex items-center p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 first:rounded-t-xl last:rounded-b-xl'
    >
      <Button
        variant='transparent'
        className={cn('mr-2.5 p-0', { tooltip: post.verified })}
        data-tooltip={post.verified && 'Verified by me.'}
      >
        {post.pinned ? <AiFillPushpin className='size-6' /> : <CgFileDocument className='size-5' />}
        {post.verified && (
          <span className='bg-transparent absolute bottom-[-5px] right-[-5px]'>
            <HiMiniCheckBadge className='text-sm text-gray-400 dark:text-gray-300' />
          </span>
        )}
      </Button>
      <div className='flex-1'>
        <h3 className='text-[15px] group-hover:text-indigo-800 dark:group-hover:text-indigo-400 text-neutral-900 dark:text-neutral-100 font-medium'>
          {post.title}
          {post.draft && (
            <Button className='ml-2' size='sm'>
              Draft
            </Button>
          )}
        </h3>
      </div>
      {(post.createdDate || post.updatedDate) && (
        <div className='gap-2 hidden md:flex items-center'>
          {['updated', 'updatedWithin'].includes(status) && post.updatedDate && (
            <Button size='sm'>
              <DateComponent humanize dateString={post.updatedDate} dateLabel='updated' />
            </Button>
          )}
          {status === 'new' && (
            <Button variant='yellow' size='sm'>
              new
            </Button>
          )}
          {post.createdDate && (
            <DateComponent
              className='text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"'
              dateString={post.createdDate}
              humanize
              dateLabel='created'
            />
          )}
        </div>
      )}
    </Link>
  )
}
