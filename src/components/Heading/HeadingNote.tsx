import HiOutlineFire from '@notion-x/icons/HiOutlineFire'
import type { ImageType } from '@notion-x/interface'
import cn from 'classnames'
import Image, { StaticImageData } from 'next/image'
import SkeletonLoading from '../Skeleton/SkeletonLoading'

interface Props {
  title?: string
  loading?: boolean
  image?: string | ImageType | StaticImageData
  imageClass?: string
  imageFluid?: boolean
  icon?: React.ReactNode
  total?: string
  children?: React.ReactNode
}
export default function HeadingNote({
  title,
  loading = false,
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
      <div className="container">
        <div className="bg-indigo-50 dark:bg-neutral-800 absolute top-0 inset-x-0 h-48 w-full"></div>
        <div className="flex bg-white dark:bg-neutral-900 shadow-md flex-col border border-neutral-200/70 dark:border-neutral-700 gap-4 lg:p-7 md:flex-row md:gap-6 md:rounded-[2rem] p-5 relative rounded-3xl xl:gap-12">
          <div className="shrink-0">
            <div className="relative shrink-0 overflow-hidden dark:ring-0 h-24 lg:h-40 lg:w-40 ring-4 ring-white rounded-3xl sm:h-32 sm:w-32 w-24 wil-avatar z-0">
              {loading ? (
                <SkeletonLoading className="absolute inset-0 leading-none" />
              ) : (
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
              )}
            </div>
          </div>
          <div className="grow">
            <div className="max-w-screen-md space-y-3.5">
              <h1 className="text-xl flex items-center sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-rainbow">
                {loading ? (
                  <SkeletonLoading className="max-w-xs" />
                ) : (
                  <span className="line-clamp-1">{title}</span>
                )}
              </h1>
              {loading ? (
                <SkeletonLoading className="max-w-xs" />
              ) : (
                total && (
                  <div className="flex items-center text-sm font-medium space-x-2 text-neutral-500 dark:text-neutral-400">
                    <div className="h-8 w-8 transition-colors duration-75 shrink-0 flex items-center justify-center rounded-full text-rose-600 bg-rose-50 dark:bg-rose-100">
                      <HiOutlineFire className="w-5 h-5" />
                    </div>
                    <div className="dark:text-neutral-300 text-neutral-700">{total}</div>
                  </div>
                )
              )}
              {loading ? (
                <SkeletonLoading />
              ) : (
                <div className="block text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
