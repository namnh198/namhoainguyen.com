'use client'

import { HiOutlineFire } from 'react-icons/hi2'
import Image, { ImageProps } from 'next/image'

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
