import { getUnofficalPosts } from '@/lib/notes'
import SimpleImage from '@notion-x/components/SimpleImage'
import type { Tag } from '@notion-x/interface'
import cn from 'classnames'
import Link from 'next/link'
import PostSimple from './Post/PostSimple'

interface Props {
  tag: Tag
  showHeader?: boolean
}
export default async function NoteTopicSection({ tag, showHeader = false }: Props) {
  const limit = (process.env.NEXT_PUBLIC_ID_NOTE_PER_PAGE || 8) as number
  const posts = await getUnofficalPosts({
    filter: {
      property: process.env.NEXT_PUBLIC_ID_NOTE_TAGS_KEY,
      filter: {
        operator: 'enum_contains',
        value: {
          type: 'exact',
          value: tag.name
        }
      }
    },
    limit: limit
  })

  if (posts.length < 1) return null
  const { id, icon, name, permalink } = tag

  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-700">
      {showHeader && (
        <div className="flex items-center justify-between p-4 xl:py-5 border-b border-neutral-200 dark:border-neutral-700">
          <h2
            id={id}
            className="flex items-center gap-x-2 text-lg text-neutral-900 dark:text-neutral-100 font-semibold grow"
          >
            <div className={cn('shrink-0', [tag.customClass])}>
              <SimpleImage src={icon} alt={`Heading of Tag ${name}`} width={32} height={32} />
            </div>
            <span>{name}</span>
          </h2>
          <Link
            className="shrink-0 block text-indigo-700 dark:text-indigo-500 font-semibold text-sm"
            href={permalink}
          >
            View all
          </Link>
        </div>
      )}
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {posts.map(post => (
            <PostSimple key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
