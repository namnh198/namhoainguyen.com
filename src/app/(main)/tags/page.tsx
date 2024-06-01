import { PostListHeading } from '@/components/post-heading'
import { getTopics } from '@/lib/notion'
import { cn, getMetadata } from '@/lib/utils'
import tagImg from '@/public/images/tags.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export const revalidate = 100

const title = 'List of topics'
const description = 'A list of topics I write about'

export const metadata = getMetadata({
  title,
  description,
  images: [`/api/og?title=${encodeURI(title)}&description=${encodeURI(description)}`]
})

export default async function TagsPage() {
  const tags = await getTopics()

  return (
    <>
      <PostListHeading title='Topics' total={`${tags.length} Topics`} image={tagImg} description={description} />

      <div className='container py-16 space-y-16'>
        {tags.length > 1 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8'>
            {tags.map((tag) => (
              <Button
                key={tag.id}
                href={tag.permalink}
                variant='secondary'
                size='xl'
                className={cn('justify-start shadow-md hover:-translate-y-0.5', [tag.className])}
              >
                {tag.icon && (
                  <div className='relative shrik-0'>
                    <Image src={tag.icon} alt={`Image of Topic ${tag.name}`} width={30} height={30} />
                  </div>
                )}

                <h2
                  className={cn('text-base font-normal group-hover:text-indigo-300', {
                    tooltip: tag.description
                  })}
                  title={tag.name}
                  data-tooltip={tag.description}
                >
                  {tag.name}
                </h2>
              </Button>
            ))}
          </div>
        ) : (
          <div className='my-4 text-xl font-bold'>There is no tags yet!</div>
        )}
      </div>
    </>
  )
}
