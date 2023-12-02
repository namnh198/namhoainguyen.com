import BgGlassmorphism from '@/components/BgGlassmorphism'
import CardProject from '@/components/Card/CardProject'
import CardTool from '@/components/Card/CardTool'
import TagListItem from '@/components/Card/CardTopic'
import Container from '@/components/Container'
import Heading from '@/components/Heading/Heading'
import HeadingIndex from '@/components/Heading/HeadingIndex'
import me from '@/data/me'
import { defaultPostTypeOpts } from '@/lib/config'
import { getProjects, getTools, getTopics, getUnofficalPosts } from '@/lib/notes'
import { getMetadata } from '@/lib/utils'
import PostList from '@notion-x/components/PostList'
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
      <Container className="py-16 space-y-16">
        <HeadingIndex />
        <div className="relative">
          <Heading title="Recent updated notes" href="/notes" />
          <div className="flex flex-col gap-y-6">
            <Suspense fallback={null}>
              <PostList
                posts={pinnedPosts}
                postType="simple"
                postTypeOpts={{ ...defaultPostTypeOpts, showPinned: true }}
              />
            </Suspense>
            <Suspense fallback={null}>
              <PostList posts={recentPosts} postType="simple" postTypeOpts={defaultPostTypeOpts} />
            </Suspense>
          </div>
        </div>
        <div className="relative">
          <Heading title="Recent tools I used" href="/tools" />
          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
            <Suspense fallback={null}>
              {tools.tools.slice(0, 6).map(tool => (
                <CardTool key={tool.id} tool={tool} />
              ))}
            </Suspense>
          </div>
        </div>
        <div className="relative">
          <Heading title="Main Topics" href="/tags" />
          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
            <Suspense fallback={null}>
              {pinnedTags.map(tag => (
                <TagListItem key={tag.id} tag={tag} />
              ))}
            </Suspense>
          </div>
        </div>
        <div className="relative">
          <Heading title="Recent Projects" href="/projects" />
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
