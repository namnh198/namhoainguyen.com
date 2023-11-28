import { getFormattedDate } from '@/lib/utils'
import type { Post } from '@notion-x/interface'
import { DocumentText, Verify } from 'iconsax-react'
import Link from 'next/link'
import { BsPinAngle } from 'react-icons/bs'
import Badge from '../Badge/Badge'

export default function PostSimple({ post }: { post: Post }) {
  return (
    <Link
      key={post.id}
      href={post.permalink}
      className="group flex items-center p-4 hover:bg-neutral-200 dark:hover:bg-neutral-700"
    >
      <div className="relative shrink-0 mr-2.5">
        {post.pinned ? <BsPinAngle className="w-8 h-8" /> : <DocumentText className="w-8 h-8" />}
        {post.verified && (
          <span className="bg-white dark:bg-neutral-900 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 p-0.5 rounded-full absolute bottom-[-5px] right-[-5px]">
            <Verify variant="Bold" size={16} />
          </span>
        )}
      </div>
      <div className="flex-1">
        <h2 className="text-[15px] group-hover:text-indigo-800 dark:group-hover:text-indigo-400 text-neutral-900 dark:text-neutral-100 font-medium">
          {post.title}
        </h2>
      </div>
      <div className="gap-2 hidden md:flex items-center">
        <Badge label={`updated ${getFormattedDate(post.updatedDate)}`} color="green" />
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          added {getFormattedDate(post.createdDate)}
        </span>
      </div>
    </Link>
  )
}
