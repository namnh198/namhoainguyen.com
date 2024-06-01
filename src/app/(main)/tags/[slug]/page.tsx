import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ParamsProps } from '@/app/types'
import { PostListHeading } from '@/components/post-heading'
import { defaultPostTypeOpts } from '@/lib/config'
import { getTopics, getTotalPosts, getUnofficalPostByTag } from '@/lib/notion'
import { getMetadata } from '@/lib/utils'
import type { Tag } from '@/types/interface'
import PostList from '@/components/post-list'

export const revalidate = 100

export async function generateMetadata({ params }: { params: ParamsProps }): Promise<Metadata> {
  const slug = params?.slug as string
  const tags = await getTopics()
  const tag = getTag(slug, tags)
  if (!tag) {
    return getMetadata({
      title: 'Cannot find this tag!'
    })
  }
  const title = `Topic "${tag?.name}"`
  const description = getTagDescription(tag)

  return getMetadata({
    title,
    description,
    images: [`/api/og?title=${encodeURI(title)}&description=${encodeURI(description)}`]
  })
}

export async function generateStaticParams() {
  const tags = await getTopics()
  const params = tags.reduce<ParamsProps[]>((acc, tag) => {
    if (!tag.slug) {
      return acc
    }
    return [...acc, { slug: tag.slug }]
  }, [] as ParamsProps[])
  return params
}

export default async function TagDetail({ params }: { params: ParamsProps }) {
  const slug = params?.slug as string
  if (!slug) return notFound()
  const tags = await getTopics()
  const tag = getTag(slug, tags)
  if (!tag) return notFound()
  const totalPost = await getTotalPosts(tag)
  const posts = await getUnofficalPostByTag(tag.name)
  if (!posts || posts.length < 1) return null

  return (
    <>
      <PostListHeading
        title={`Topic ${tag.name}`}
        total={`${totalPost} Notes`}
        image={tag.icon}
        description={getTagDescription(tag)}
      />
      <div className='container py-16 space-y-16'>
        <PostList posts={posts} />
      </div>
    </>
  )
}

const getTag = (slug: string, tags: Tag[]) => {
  return tags.find((tag) => tag.slug === slug || tag.slug === slug.replace(/%26/g, '&'))
}

const getTagDescription = (tag: Tag) => {
  return tag.description ? tag.description : `List all notes of topic ${tag.name}`
}
