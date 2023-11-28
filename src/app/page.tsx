import BgGlassmorphism from '@/components/BgGlassmorphism'
import CardProject from '@/components/Card/CardProject'
import CardTool from '@/components/Card/CardTool'
import TagListItem from '@/components/Card/CardTopic'
import Container from '@/components/Container'
import Heading from '@/components/Heading/Heading'
import HeadingIndex from '@/components/Heading/HeadingIndex'
import PostSimple from '@/components/Post/PostSimple'
import { me } from '@/data/me'
import { getProjects, getTools, getTopics, getUnofficalPosts } from '@/lib/notes'
import { getMetadata } from '@/lib/utils'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = getMetadata({
  title: "Hi! I'm Nam",
  description: me.quote
})

export default async function HomePage() {
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
    limit: 4
  })
  const recentPosts = await getUnofficalPosts({ limit: 4 })
  const pinnedTags = (await getTopics()).filter(tag => tag.pinned)
  const projects = await getProjects()
  const tools = await getTools()

  return (
    <>
      <BgGlassmorphism />
      <Container className="pb-6">
        <HeadingIndex />
        <div className="relative">
          <Heading title="Recent updated notes" />
          <div className="flex flex-col gap-y-6">
            <Suspense fallback={null}>
              <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-700">
                <div className="flow-root">
                  <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
                    {pinnedPosts.map(post => (
                      <PostSimple key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              </div>
            </Suspense>
            <Suspense fallback={null}>
              <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-700">
                <div className="flow-root">
                  <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
                    {recentPosts.map(post => (
                      <PostSimple key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              </div>
            </Suspense>
          </div>
        </div>
        <div className="relative">
          <Heading title="Recent tools I used" />
          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
            <Suspense fallback={null}>
              {tools.tools.slice(0, 6).map(tool => (
                <CardTool key={tool.id} tool={tool} />
              ))}
            </Suspense>
          </div>
        </div>
        <div className="relative">
          <Heading title="Main Topics" />
          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
            <Suspense fallback={null}>
              {pinnedTags.map(tag => (
                <TagListItem key={tag.id} tag={tag} />
              ))}
            </Suspense>
          </div>
        </div>
        <div className="relative">
          <Heading title="Recent Projects" />
          <div className="grid gap-6 grid-cols-1 md:gap-8 sm:grid-cols-2 lg:md:grid-cols-3 xl:grid-cols-4">
            <Suspense fallback={null}>
              {projects.slice(0, 8).map(project => (
                <CardProject key={project.id} project={project} />
              ))}
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  )
}
