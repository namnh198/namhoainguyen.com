import TagListItem from '@/components/Card/CardTopic'
import Container from '@/components/Container'
import HeadingNote from '@/components/Heading/HeadingNote'
import { getTopics } from '@/lib/notes'
import { tagListContainerClass } from '@/lib/styles'
import { getMetadata } from '@/lib/utils'
import tagsImg from '@/public/images/tags.svg'
import type { Tag } from '@notion-x/interface'

export const revalidate = 20
const title = 'List of topics'
const description = 'A list of topics I write about'

export const metadata = getMetadata({
  title,
  description,
  images: [`/api/og?title=${encodeURI(title)}&description=${encodeURI(description)}`]
})

export default async function TagsPage() {
  const tags = await getTopics()

  return (
    <>
      <HeadingNote title="Topics" total={`${tags.length} Topics`} image={tagsImg}>
        <span>A list of topics I write about. You can use</span>
        <kbd className="border font-semibold rounded mx-1 text-kb p-0.5 whitespace-nowrap bg-white border-gray-400 text-gray-900">
          <span className="text-base">⌘</span> F
        </kbd>
        <span>to quickly find a topic you wanna check.</span>
      </HeadingNote>

      <Container className="py-16 space-y-16">
        {tags.length > 1 ? (
          <div className={tagListContainerClass}>
            {tags.map((tag: Tag) => (
              <TagListItem key={tag.id} tag={tag} />
            ))}
          </div>
        ) : (
          <div className="my-4 text-xl font-bold">There is no tag yet!</div>
        )}
      </Container>
    </>
  )
}
