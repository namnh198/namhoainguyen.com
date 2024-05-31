import { ParamsProps } from '@/app/types'
import { getUnofficalPostBySlug, getUnofficalPosts } from '@/lib/notion'
import { getMetadata } from '@/lib/utils'
import { getPage } from '@notion-x/lib/notion-api'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SinglePostTemplate from './SinglePostTemplate'

export async function generateMetadata({ params }: { params: ParamsProps }): Promise<Metadata> {
  const slug = params.slug as string
  const untitled = 'Unknown note'
  if (!slug) {
    return {
      title: untitled
    }
  }
  const post = await getUnofficalPostBySlug(slug)
  if (!post) {
    return {
      title: untitled
    }
  }
  return getMetadata({
    title: post.title
  })
}

export async function generateStaticParams() {
  const posts = await getUnofficalPosts()
  return posts.reduce((result, post) => {
    if (!post.slug) {
      return result
    }
    return [...result, { slug: post.slug }]
  }, [] as ParamsProps[])
}

export default async function NoteDetail({ params }: { params: ParamsProps }) {
  const slug = params?.slug as string
  if (!slug) notFound()
  try {
    const post = await getUnofficalPostBySlug(slug)
    if (!post) return notFound()
    const recordMap = await getPage(post.id)
    return <SinglePostTemplate recordMap={recordMap} post={post} />
  } catch (error) {
    console.error(error)
    notFound()
  }
}
