import Badge from '@/components/Badge/Badge'
import { getFormattedDate } from '@/lib/utils'
import type { Post } from '@notion-x/interface'
import cn from 'classnames'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface Props {
  post: Post
  className?: string
}

export default function PostNoImage({ post, className }: Props) {
  return (
    <div
      className={twMerge(
        cn(
          'relative h-full p-5 group border border-neutral-200 dark:border-neutral-700 rounded-3xl bg-white dark:bg-neutral-900',
          [className]
        )
      )}
    >
      <Link className="absolute inset-0 rounded-lg" href={post.permalink} title={post.title} />
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-wrap gap-1.5">
          {post.verified && <Badge label="Verified" color="green" />}
          {post.pinned && <Badge label="Pinned" color="red" />}
        </div>
        <h2
          className="block text-base font-semibold text-neutral-800 dark:text-neutral-300 group-hover:text-indigo-900 dark:group-hover:text-indigo-400 my-4"
          title={post.title}
        >
          <Link className="line-clamp-2" title={post.title} href={post.permalink}>
            {post.title}
          </Link>
        </h2>
        <div className="flex items-center mt-1.5 relative">
          <span className="block text-neutral-700 dark:text-neutral-300 font-medium text-xs truncate">
            {getFormattedDate(post.updatedDate)}
          </span>
          <span className="mx-[6px] font-medium">·</span>
          <span className="font-normal truncate text-xs text-neutral-500 dark:text-neutral-400">
            {getFormattedDate(post.createdDate)}
          </span>
        </div>
      </div>
    </div>
  )
}
