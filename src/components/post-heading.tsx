'use client'
import { Block } from 'notion-types'
import { HiOutlineFire } from 'react-icons/hi2'
import Image, { ImageProps } from 'next/image'
import { notionSpace, defaultMaxDayWithThin } from '@/lib/config'
import { PageIcon } from '@notion-x/components/page-icon'
import { useNotionContext } from '@notion-x/hooks/context'
import { usePostDateStatus } from '@notion-x/hooks/hook'
import HiMiniCheckBadge from '@notion-x/icons/HiMiniCheckBadge'
import HiOutlinePencilSquare from '@notion-x/icons/HiOutlinePencilSquare'
import { Button } from '@/components/ui/button'
import DateComponent from '@notion-x/components/DateComponent'

import me from '@/data/me'
import { Post } from '@notion-x/interface'
import { getTextContent } from 'notion-utils'
import { getPostProperties } from '@/lib/utils'

export const PostHeading = ({ block, post, hideMeta }: { block: Block; post?: Post; hideMeta?: boolean }) => {
  const { mapImageUrl } = useNotionContext()
  if (!post) {
    post = getPostProperties(block)
  }

  const status = usePostDateStatus(post.createdDate!, post.updatedDate!, defaultMaxDayWithThin)
  return (
    <div className='w-full'>
      {post.cover ? (
        <div className='relative w-full h-40 md:h-60 2xl:h-72'>
          <Image
            src={mapImageUrl(post.cover as string, block)}
            alt={getTextContent(post.title as any)}
            className='object-cover size-full'
            width={1200}
            height={240}
          />
        </div>
      ) : (
        <div className='relative w-full h-40'>
          <div className='bg-indigo-50 size-full'></div>
        </div>
      )}

      <div className='container -mt-10 lg:-mt-16'>
        <div className='relative bg-white dark:bg-neutral-900 shadow-2xl px-4 sm:px-5 py-7 lg:p-11 rounded-2xl md:rounded-[40px] flex flex-col md:flex-row gap-8 lg:gap-10 items-center justify-center'>
          {post.icon && (
            <div className='relative shrink-0 overflow-hidden size-24 lg:size-40 sm:size-32 wil-avatar ring-4 ring-white dark:ring-slate-600 rounded-3xl z-0'>
              <div className='items-center flex justify-center absolute bg-neutral-100 dark:bg-neutral-800 inset-0'>
                <PageIcon block={block} inline={false} />
              </div>
            </div>
          )}
          <div className='flex-1 space-y-4 lg:space-y-5'>
            <h1 className='inline-flex items-center text-center md:text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold'>
              {post.title}
            </h1>
            <div className='w-full border-b border-neutral-200/70 dark:border-slate-600' />
            {!hideMeta && (
              <div className='flex flex-wrap justify-between sm:items-end gap-5'>
                {/* Author & Date */}
                <div className='flex items-center flex-wrap text-neutral-700 dark:text-neutral-300 text-left  text-base leading-none shrink-0'>
                  <div className='flex items-center space-x-2'>
                    <div className='relative shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 dark:text-neutral-800 uppercase font-semibold rounded-full shadow-inner h-10 w-10 sm:h-11 sm:w-11 text-xl ring-1 ring-white '>
                      <Image src={me.avatar} alt='Avatar' />
                    </div>
                  </div>
                  <div className='ms-3'>
                    <div className='flex items-center font-semibold'>{me.name}</div>
                    {post.createdDate && (
                      <div className='text-xs mt-[6px]'>
                        <span className='text-neutral-700 dark:text-neutral-300'>
                          <DateComponent dateString={post.createdDate!} format='MMM DD, YYYY' />
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Label Status */}
                <div className='hidden sm:flex flex-row space-x-2 sm:space-x-2.5 items-center'>
                  {post.draft && (
                    <Button className='ml-2' size='sm'>
                      Draft
                    </Button>
                  )}
                  <div className='flex items-center gap-3 flex-wrap justify-center md:justify-start'>
                    {['updated', 'updatedWithin'].includes(status) && post.updatedDate && (
                      <Button size='sm'>
                        <DateComponent dateString={post.updatedDate} dateLabel='updated' />
                      </Button>
                    )}
                    {status === 'new' && (
                      <Button variant='yellow' size='sm'>
                        new
                      </Button>
                    )}
                  </div>
                  <div className='px-1 border-s note-border-primary h-5 sm:h-6' />
                  {post.verified && (
                    <Button
                      variant='sky'
                      className='rounded-full cursor-pointer tooltip'
                      data-tooltip='Verified by me.'
                    >
                      <HiMiniCheckBadge className='size-5' />
                    </Button>
                  )}
                  <Button
                    variant='teal'
                    className='rounded-full'
                    href={notionSpace + block.id.replace(/-/g, '')}
                    target='_blank'
                  >
                    <HiOutlinePencilSquare className='size-5' />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const PostListHeading = ({
  title,
  image,
  total,
  description
}: {
  title: string
  image?: ImageProps['src']
  total?: string
  description?: string
}) => {
  return (
    <div className='relative pt-8 lg:pt-16'>
      <div className='bg-indigo-50 dark:bg-neutral-700 absolute top-0 inset-x-0 h-48 w-full'></div>
      <div className='container'>
        <div className='flex flex-col gap-4 lg:p-7 md:flex-row md:gap-6 p-5 relative xl:gap-12 border md:rounded-[2rem] rounded-3xl shadow-md bg-white dark:bg-neutral-900 border-neutral-200/70 dark:border-slate-600'>
          {image && (
            <div className='shrink-0'>
              <div className='relative overflow-hidden h-24 lg:h-40 lg:w-40 ring-4 ring-white dark:ring-slate-600 rounded-3xl sm:h-32 sm:w-32 w-24 z-0'>
                <div className='items-center flex justify-center absolute bg-neutral-100 dark:bg-neutral-800 inset-0'>
                  <Image
                    className='object-cover lg:h-24 h-12 lg:w-24 w-12'
                    src={image}
                    alt={title}
                    width={80}
                    height={80}
                  />
                </div>
              </div>
            </div>
          )}
          <div className='grow'>
            <div className='max-w-screen-md space-y-3.5'>
              <h2 className='text-xl py-0.5 flex items-center sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-rainbow'>
                {title}
              </h2>
              {total && (
                <div className='flex items-center text-sm font-medium space-x-2 text-neutral-500 dark:text-neutral-400'>
                  <div className='h-8 w-8 transition-colors duration-75 shrink-0 flex items-center justify-center rounded-full text-rose-600 bg-rose-50'>
                    <HiOutlineFire size={20} />
                  </div>
                  <div className='text-neutral-700 dark:text-neutral-300'>{total}</div>
                </div>
              )}
              <div className='block text-sm sm:text-base text-neutral-500 dark:text-neutral-400'>{description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
