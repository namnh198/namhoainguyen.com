import { defaultPostTypeOpts } from '@/lib/config'
import { getUnofficalPostByTag } from '@/lib/notes'
import PostList from '@notion-x/components/PostList'
import type { Tag } from '@notion-x/interface'
import HeadingNoteTopic from './Heading/HeadingNoteTopic'

interface Props {
  tag: Tag
}
export default async function NoteTopicSection({ tag }: Props) {
  const posts = await getUnofficalPostByTag(tag.name)
  if (posts.length < 1) return null

  return (
    <div className="flex flex-col gap-4">
      <HeadingNoteTopic {...tag} />
      <PostList posts={posts} postType="simple" postTypeOpts={defaultPostTypeOpts} />
    </div>
  )
}
