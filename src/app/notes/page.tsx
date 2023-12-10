import notesImg from '@/assets/images/notes.svg'
import Container from '@/components/Container'
import HeadingNote from '@/components/Heading/HeadingNote'
import HeadingNoteTopic from '@/components/Heading/HeadingNoteTopic'
import NotesToc from '@/components/NoteToc'
import NoteTopicSection from '@/components/NoteTopicSection'
import { defaultPostTypeOpts } from '@/lib/config'
import { getTopics, getTotalPosts, getUnofficalPinnedPost } from '@/lib/notes'
import { getMetadata } from '@/lib/utils'
import PostList from '@notion-x/components/PostList'
import type { Tag } from '@notion-x/interface'

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
  const pinnedPosts = await getUnofficalPinnedPost()
  const recentPosts = await getUnofficalPinnedPost(false)

  return (
    <>
      <HeadingNote title={title} image={notesImg} total={`${totalPost} Notes`}>
        {description}
      </HeadingNote>
      <Container className="py-16 space-y-16">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="order-2 flex-1 relative flex flex-col gap-y-12">
            <div className="flex flex-col gap-2">
              <PostList
                posts={pinnedPosts}
                postType="simple"
                postTypeOpts={{ ...defaultPostTypeOpts, showPinned: true }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <HeadingNoteTopic name="Recently updated notes" slug="recently-updated-notes" />
              <PostList posts={recentPosts} postType="simple" postTypeOpts={defaultPostTypeOpts} />
            </div>
            {pinnedTags.map((tag: Tag) => (
              <NoteTopicSection key={tag.slug} tag={tag} />
            ))}
          </div>
          <NotesToc
            className="order-1 md:order-2 md:sticky top-[70px] h-fit md:w-fit w-full"
            tags={pinnedTags}
          />
        </div>
      </Container>
    </>
  )
}
