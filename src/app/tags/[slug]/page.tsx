import Container from '@/components/Container'
import HeadingNote from '@/components/Heading/HeadingNote'
import { defaultPostTypeOpts } from '@/lib/config'
import { getTopics, getTotalPosts, getUnofficalPostByTag } from '@/lib/notes'
import { getMetadata } from '@/lib/utils'
import type { ParamsProps } from '@/types'
import PostList from '@notion-x/components/PostList'
import type { Tag } from '@notion-x/interface'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const revalidate = 20

export async function generateMetadata({ params }: { params: ParamsProps }): Promise<Metadata> {
  const slug = params?.slug?.[0] as string
  const tags = await getTopics()
  const tag = getTag(slug, tags)
  if (!tag) {
    return getMetadata({
      title: 'Cannot find this tag!'
    })
  }
  const title = `Topic "${tag?.name}"`
  const description = tag.description ? tag.description : `List all notes of topic ${tag.name}`

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
    <Suspense>
      <HeadingNote
        title={`Topic ${tag.name}`}
        image={tag.icon}
        total={`${totalPost} Notes`}
        imageClass={tag.customClass}
      >
        {tag.description ? tag.description : `List all notes of topic ${tag.name}`}
      </HeadingNote>
      <Container className="py-16 space-y-16">
        <PostList posts={posts} postType="simple" postTypeOpts={defaultPostTypeOpts} />
      </Container>
    </Suspense>
  )
}

const getTag = (slug: string, tags: Tag[]) => {
  return tags.find(tag => tag.slug === slug || tag.slug === slug.replace(/%26/g, '&'))
}
