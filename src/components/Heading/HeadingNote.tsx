import { headingNoteImg, headingNoteWrapper } from '@/lib/styles'
import HiOutlineFire from '@notion-x/icons/HiOutlineFire'
import type { ImageType } from '@notion-x/interface'
import { cn } from '@notion-x/lib/utils'
import Image, { StaticImageData } from 'next/image'

interface Props {
  title?: string
  image?: string | ImageType | StaticImageData
  imageClass?: string
  imageFluid?: boolean
  icon?: React.ReactNode
  total?: string
  children?: React.ReactNode
}

export default function HeadingNote({
  title,
  image,
  imageClass,
  imageFluid = false,
  total = '',
  children
}: Props) {
  let aspectRatio: any = {}
  if (!imageFluid) {
    aspectRatio = { width: 96, height: 96 }
  }
  return (
    <div className="relative pt-8 lg:pt-16">
      <div className="bg-indigo-50 dark:bg-neutral-800 absolute top-0 inset-x-0 h-48 w-full"></div>
      <div className="container">
        <div className={headingNoteWrapper}>
          <div className="shrink-0">
            <div className={headingNoteImg}>
              <div
                className={cn(
                  'items-center flex justify-center absolute bg-neutral-100 dark:bg-neutral-800 inset-0',
                  [imageClass]
                )}
              >
                <Image
                  className={cn('object-cover', { 'lg:h-24 h-12 lg:w-24 w-12': !imageFluid })}
                  src={image}
                  alt={title}
                  {...aspectRatio}
                />
              </div>
            </div>
          </div>
          <div className="grow">
            <div className="max-w-screen-md space-y-3.5">
              <h1 className="text-xl flex items-center sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-rainbow">
                <span className="line-clamp-1">{title}</span>
              </h1>
              {total && (
                <div className="flex items-center text-sm font-medium space-x-2 text-neutral-500 dark:text-neutral-400">
                  <div className="h-8 w-8 transition-colors duration-75 shrink-0 flex items-center justify-center rounded-full text-rose-600 bg-rose-50 ">
                    <HiOutlineFire className="w-5 h-5" />
                  </div>
                  <div className=" text-neutral-700 dark:text-neutral-300">{total}</div>
                </div>
              )}
              <div className="block text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
