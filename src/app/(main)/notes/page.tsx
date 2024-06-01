import { concat } from 'lodash'
import HeadingNote from '@/components/Heading/HeadingNote'
import HeadingNoteTopic from '@/components/Heading/HeadingNoteTopic'
import Toc from './toc'
import NoteTopicSection from '@/components/NoteTopicSection'
import { defaultPostTypeOpts } from '@/lib/config'
import { getTopics, getTotalPosts, getUnofficalPinnedPost, getUnofficalPostByTag } from '@/lib/notion'
import { getMetadata } from '@/lib/utils'
import notesImg from '@/public/images/notes.svg'
import type { Tag } from '@notion-x/interface'
import PostList from '@/components/post-list'
import { Heading } from '@/components/ui/heading'

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
  const pinnedTags = (await getTopics()).filter((tag) => tag.pinned)
  const pinnedPosts = await getUnofficalPinnedPost()
  const recentPosts = await getUnofficalPinnedPost(false, 4)
  const tags = concat(
    [
      {
        name: 'Pinned Notes',
        slug: 'pinned-notes',
        posts: pinnedPosts
      },
      {
        name: 'Recently Updated',
        slug: 'recently-updated',
        posts: recentPosts
      }
    ],
    pinnedTags
  )

  return (
    <>
      <HeadingNote title={title} image={notesImg} total={`${totalPost} Notes`}>
        {description}
      </HeadingNote>
      <div className='container py-16 space-y-16'>
        <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
          <div className='order-2 flex-1 relative flex flex-col gap-y-12 scroll-mt-[80px]'>
            {tags.map((tag) => (
              <NotesSection key={tag.name} tag={tag} />
            ))}
          </div>
          <Toc className='order-1 md:order-2 md:sticky top-[70px] h-fit md:w-fit w-full' tags={tags} />
        </div>
      </div>
    </>
  )
}

export const NotesSection = async ({ tag, showHeader = true }: { tag: Tag; showHeader?: boolean }) => {
  if (!tag.posts || tag.posts.length === 0) {
    tag.posts = await getUnofficalPostByTag(tag.name)
  }

  return tag.posts.length > 0 ? (
    <div className='flex flex-col gap-4'>
      {showHeader && (
        <Heading
          className='m-0 md:m-0'
          id={tag.slug}
          url={tag.permalink}
          icon={{ src: tag.icon as string, alt: `Image of Topic ${tag.name}`, width: 28, height: 28 }}
          title={tag.name}
        />
      )}
      <PostList posts={tag.posts} />
    </div>
  ) : null
}
