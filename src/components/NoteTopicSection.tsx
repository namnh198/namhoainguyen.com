import { defaultPostTypeOpts } from '@/lib/config'
import { getUnofficalPostByTag } from '@/lib/notes'
import PostList from '@notion-x/components/PostList'
import SimpleImage from '@notion-x/components/SimpleImage'
import type { Tag } from '@notion-x/interface'
import Link from 'next/link'

interface Props {
  tag: Tag
}
export default async function NoteTopicSection({ tag }: Props) {
  const posts = await getUnofficalPostByTag(tag.name)
  if (posts.length < 1) return null

  return (
    <div className="flex flex-col gap-4">
      <div className="relative text-neutral-900 ">
        <div className="max-w-2xl w-full">
          <h2
            id={tag.slug}
            className="font-semibold text-xl sm:text-2xl flex flex-wrap gap-x-3 items-center"
          >
            <SimpleImage src={tag.icon} alt={`Image of topic ${tag.name}`} width={28} height={28} />
            <span>
              {tag.name}
              <Link
                href={tag.permalink}
                className="text-[80%] ml-2 italic text-slate-600 font-medium hover:text-indigo-700 "
              >
                ...more
              </Link>
            </span>
          </h2>
        </div>
      </div>
      <PostList posts={posts} postType="simple" postTypeOpts={defaultPostTypeOpts} />
    </div>
  )
}
