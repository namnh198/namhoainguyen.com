import notesImg from '@/assets/images/notes.svg'
import Container from '@/components/Container'
import HeadingNote from '@/components/Heading/HeadingNote'
import NoteTopicSection from '@/components/NoteTopicSection'
import SliderPost from '@/components/Slider/SliderPost'
import { getTopics, getTotalPosts, getUnofficalPosts } from '@/lib/notes'
import { getMetadata } from '@/lib/utils'
import type { Tag } from '@notion-x/interface'
import { Suspense } from 'react'

export const revalidate = 20

const title = 'Notes'
const description =
  'When I learn something new, I write it down here. It helps me to remember and understand better. I hope you find it useful.'

export const metadata = getMetadata({
  title,
  description,
  images: [`/api/og?title=${encodeURI(title)}&description=${encodeURI(description)}`]
})

export default async function NotesPage() {
  const totalPost = await getTotalPosts()
  const pinnedTags = (await getTopics()).filter(tag => tag.pinned)
  const pinnedPosts = await getUnofficalPosts({
    filter: {
      property: process.env.NEXT_PUBLIC_ID_NOTE_PINNED_KEY,
      filter: {
        operator: 'checkbox_is',
        value: {
          type: 'exact',
          value: true
        }
      }
    },
    limit: 8
  })
  return (
    <Suspense fallback={null}>
      <HeadingNote title={title} image={notesImg} total={`${totalPost} Notes`}>
        {description}
      </HeadingNote>
      <Container>
        <SliderPost posts={pinnedPosts} />
        <div className="flex flex-wrap">
          <div className="order-2 flex-1 relative flex flex-col gap-y-6">
            {pinnedTags.map((tag: Tag) => (
              <NoteTopicSection key={tag.slug} tag={tag} showHeader />
            ))}
          </div>
        </div>
        <div className="relative space-y-6"></div>
      </Container>
    </Suspense>
  )
}
