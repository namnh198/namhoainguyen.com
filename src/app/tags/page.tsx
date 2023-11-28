import tagsImg from '@/assets/images/tags.svg'
import TagListItem from '@/components/Card/CardTopic'
import HeadingNote from '@/components/Heading/HeadingNote'
import SkeletonTags from '@/components/Skeleton/SkeletonTags'
import { getTopics } from '@/lib/notes'
import { getMetadata } from '@/lib/utils'
import type { Tag } from '@notion-x/interface'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const revalidate = 20

export const metadata: Metadata = getMetadata({
  title: 'List of Topics'
})

export default async function TagsPage() {
  const tags = await getTopics()
  const tagListContainerClass =
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'

  return (
    <Suspense fallback={<SkeletonTags className={tagListContainerClass} />}>
      <HeadingNote title="Topics" total={`${tags.length} Topics`} image={tagsImg}>
        <span>A list of topics I write about. You can use</span>
        <kbd className="border font-semibold rounded mx-1 text-kb p-0.5 whitespace-nowrap bg-white border-gray-400 text-gray-900">
          <span className="text-base">⌘</span> F
        </kbd>
        <span>to quickly find a topic you wanna check.</span>
      </HeadingNote>
      <div className="relative container mt-10">
        {tags.length > 1 ? (
          <div className={tagListContainerClass}>
            {tags.map((tag: Tag) => (
              <TagListItem key={tag.id} tag={tag} />
            ))}
          </div>
        ) : (
          <div className="my-4 text-xl font-bold">There is no tag yet!</div>
        )}
      </div>
    </Suspense>
  )
}
