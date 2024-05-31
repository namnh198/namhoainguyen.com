import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import homeImg from '@/public/images/index-home.webp'
import BG from '@/components/ui/bg'
import CardProject, { SkeletonCardProject } from '@/components/Card/CardProject'
import CardTool, { SkeletonCardTool } from '@/components/Card/CardTool'
import TagListItem from '@/components/Card/CardTopic'
import { Heading } from '@/components/ui/heading'
import me from '@/data/me'
import { defaultOpenGraphImage, defaultPostTypeOpts } from '@/lib/config'
import { getProjects, getTools, getTopics, getUnofficalPinnedPost } from '@/lib/notion'
import { getMetadata } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import PostList from '@notion-x/components/PostList'
import SkeletonPostList from '@notion-x/components/SkeletonPostList'

export const metadata: Metadata = getMetadata({
  title: "Hi! I'm Nam",
  description: me.quote,
  images: [defaultOpenGraphImage]
})

export default async function HomePage() {
  const pinnedPosts = await getUnofficalPinnedPost(true, 4)
  const recentPosts = await getUnofficalPinnedPost(false, 4)
  const pinnedTags = (await getTopics()).filter((tag) => tag.pinned)
  const projects = await getProjects()
  const tools = await getTools()

  return (
    <main>
      <BG grassMorphism />
      <div className='container py-16 space-y-16'>
        <HeadingHome />
        <div className='relative'>
          <Heading title='Recent updated notes' url='/notes' size='lg' />
          <div className='flex flex-col gap-y-6'>
            <Suspense
              fallback={
                <SkeletonPostList
                  count={4}
                  postType='simple'
                  options={{
                    className: 'flex flex-col divide-y'
                  }}
                />
              }
            >
              <PostList
                posts={pinnedPosts}
                postType='simple'
                postTypeOpts={{ ...defaultPostTypeOpts, showPinned: true }}
              />
            </Suspense>
            <Suspense
              fallback={
                <SkeletonPostList
                  count={4}
                  postType='simple'
                  options={{
                    className: 'flex flex-col divide-y'
                  }}
                />
              }
            >
              <PostList posts={recentPosts} postType='simple' postTypeOpts={defaultPostTypeOpts} />
            </Suspense>
          </div>
        </div>
        <div className='relative'>
          <Heading title='Recent tools I used' url='/tools' size='lg' />
          <div className='grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3'>
            <Suspense fallback={<SkeletonCardTool />}>
              {tools.tools.slice(0, 6).map((tool) => (
                <CardTool key={tool.id} tool={tool} compactMode />
              ))}
            </Suspense>
          </div>
        </div>
        <div className='relative'>
          <Heading title='Main Topics' url='/tags' size='lg' />
          <div className='flex flex-wrap gap-4'>
            {pinnedTags.map((tag) => (
              <TagListItem key={tag.id} tag={tag} className='p-2.5' />
            ))}
          </div>
        </div>
        <div className='relative'>
          <Heading title='Recent Projects' url='/projects' size='lg' />
          <div className='grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3'>
            {projects.slice(0, 6).map((project) => (
              <Suspense key={project.id} fallback={<SkeletonCardProject />}>
                <CardProject key={project.id} project={project} />
              </Suspense>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

const HeadingHome = () => (
  <div className='relative flex flex-col-reverse md:flex-row justify-end'>
    <div className='md:absolute z-10 md:start-0 md:top-1/2 md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-2/5'>
      <div className='p-4 sm:p-8 xl:py-14 md:px-10 md:backdrop-blur-lg shadow-lg  rounded-3xl space-y-3 sm:space-y-5 bg-white/40 dark:bg-neutral-900/40 dark:shadow-2xl'>
        <h1 className='text-2xl xl:text-3xl font-semibold'>
          Hi! <span className='inline-block animate-wave'>👋</span> I&rsquo;m Nam
        </h1>
        <p className='text-sm md:text-base'>
          I&rsquo;m a senior full-stack engineer based in Ho Chi Minh City, Viet Nam with a focus on Web Design and
          Cloud Services. On this site, You can find the notes that I made when I discovered something.
        </p>
        <p className='text-sm md:text-base'>You can follow me more on:</p>
        <div className='flex flex-wrap gap-2 justify-center'>
          {me.socials.map((social) => (
            <Button
              href={social.url}
              key={social.label}
              className='grow lg:grow-0 text-xs'
              target='_blank'
              variant={social.variant as 'red' | 'sky' | 'teal' | 'blue'}
              rel='noreferrer'
            >
              <social.icon className='size-5' />
              <span className='ml-1 text-inherit'>{social.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
    <div className='w-full md:w-3/5 lg:w-2/3'>
      <div className='aspect-w-16 aspect-h-12 bg-[#f8f8f8] rounded-3xl sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative'>
        <Image
          src={homeImg}
          className='absolute inset-0 object-cover rounded-3xl'
          width={850}
          height={450}
          alt="Hi! I'm Nam"
          priority
        />
      </div>
    </div>
  </div>
)
