import SimpleImage from '@notion-x/components/SimpleImage'
import AiOutlineLoading3Quarters from '@notion-x/icons/AiOutlineLoading3Quarters'
import type { Tag } from '@notion-x/interface'
import cn from 'classnames'
import Link from 'next/link'
import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import SkeletonLoading from '../Skeleton/SkeletonLoading'

const ImagePlaceholder = () => {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center',
        'flex flex-col h-[30px] w-[30px] rounded-full'
      )}
    >
      <AiOutlineLoading3Quarters className="text-[30px] text-white animate-spin" />
    </div>
  )
}

export default function TagListItem({ tag, className }: { tag: Tag; className?: string }) {
  return (
    <Link
      href={tag.permalink}
      key={tag.id}
      className={twMerge(
        cn([
          'group relative flex items-center gap-2 p-4 bg-white shadow-md  border border-neutral-200/70  rounded-xl transition duration-200 ease-in-out hover:-translate-y-0.5',
          [tag.customClass],
          [className]
        ])
      )}
    >
      <div className="relative shrink-0">
        <Suspense fallback={<SkeletonLoading className="absolute inset-0 leading-none" />}>
          <SimpleImage
            src={tag.icon}
            alt={`Image of topic ${tag.name}`}
            width={24}
            height={24}
            imagePlaceholder={ImagePlaceholder()}
          />
        </Suspense>
      </div>
      <h2 className="group-hover:text-indigo-800  text-base font-normal" title={tag.name}>
        {tag.name}
      </h2>
    </Link>
  )
}
