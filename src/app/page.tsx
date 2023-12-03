import BgGlassmorphism from '@/components/BgGlassmorphism'
import CardProject from '@/components/Card/CardProject'
import CardTool from '@/components/Card/CardTool'
import TagListItem from '@/components/Card/CardTopic'
import Container from '@/components/Container'
import Heading from '@/components/Heading/Heading'
import HeadingIndex from '@/components/Heading/HeadingIndex'
import me from '@/data/me'
import { defaultOpenGraphImage, defaultPostTypeOpts } from '@/lib/config'
import { getProjects, getTools, getTopics, getUnofficalPosts } from '@/lib/notes'
import { getMetadata } from '@/lib/utils'
import PostList from '@notion-x/components/PostList'
import SkeletonPostList from '@notion-x/components/SkeletonPostList'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = getMetadata({
  title: "Hi! I'm Nam",
  description: me.quote,
  images: [defaultOpenGraphImage]
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
          <Heading title="Recent updated notes" href="/notes" showMore />
          <div className="flex flex-col gap-y-6">
            <Suspense
              fallback={
                <SkeletonPostList
                  count={4}
                  postType="simple"
                  options={{
                    className: 'flex flex-col divide-y'
                  }}
                />
              }
            >
              <PostList
                posts={pinnedPosts}
                postType="simple"
                postTypeOpts={{ ...defaultPostTypeOpts, showPinned: true }}
              />
            </Suspense>
            <Suspense
              fallback={
                <SkeletonPostList
                  count={4}
                  postType="simple"
                  options={{
                    className: 'flex flex-col divide-y'
                  }}
                />
              }
            >
              <PostList posts={recentPosts} postType="simple" postTypeOpts={defaultPostTypeOpts} />
            </Suspense>
          </div>
        </div>
        <div className="relative">
          <Heading title="Recent tools I used" href="/tools" showMore={tools.tools.length > 6} />
          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {tools.tools.slice(0, 6).map(tool => (
              <CardTool key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
        <div className="relative">
          <Heading title="Main Topics" href="/tags" showMore />
          <div className="flex flex-wrap gap-4">
            {pinnedTags.map(tag => (
              <TagListItem key={tag.id} tag={tag} className="p-2.5" />
            ))}
          </div>
        </div>
        <div className="relative">
          <Heading title="Recent Projects" href="/projects" showMore={projects.length > 6} />
          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.slice(0, 6).map(project => (
              <CardProject key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}
