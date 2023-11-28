import Container from '@/components/Container'
import HeadingNote from '@/components/Heading/HeadingNote'
import NoteTopicSection from '@/components/NoteTopicSection'
import { getTopics, getTotalPosts } from '@/lib/notes'
import { getMetadata } from '@/lib/utils'
import type { ParamsProps } from '@/types'
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

export default async function TagDetail({ params }: { params: ParamsProps }) {
  const slug = params?.slug?.[0] as string
  if (!slug) return notFound()
  const tags = await getTopics()
  const tag = getTag(slug, tags)
  if (!tag) return notFound()
  const totalPost = await getTotalPosts(tag)

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
      <Container>
        <NoteTopicSection key={tag.slug} tag={tag} />
      </Container>
    </Suspense>
  )
}

const getTag = (slug: string, tags: Tag[]) => {
  return tags.find(tag => tag.slug === slug || tag.slug === slug.replace(/%26/g, '&'))
}
