import SimpleImage from '@notion-x/components/SimpleImage'
import AiOutlineLoading3Quarters from '@notion-x/icons/AiOutlineLoading3Quarters'
import type { Tag } from '@notion-x/interface'
import cn from 'classnames'
import Link from 'next/link'
import { Suspense } from 'react'
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

export default function TagListItem({ tag }: { tag: Tag }) {
  return (
    <Link
      href={tag.permalink}
      key={tag.id}
      className={cn([
        'group relative flex items-center gap-2 p-4 bg-white shadow-md dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-700 rounded-xl transition duration-200 ease-in-out hover:-translate-y-0.5',
        [tag.customClass]
      ])}
    >
      <div className="relative shrink-0 w-8 h-8">
        <Suspense fallback={<SkeletonLoading className="absolute inset-0 leading-none" />}>
          <SimpleImage
            src={tag.icon}
            alt={`Image of topic ${tag.name}`}
            width={32}
            height={32}
            imagePlaceholder={ImagePlaceholder()}
          />
        </Suspense>
      </div>
      <h2
        className="group-hover:text-indigo-800 dark:group-hover:text-indigo-400 text-base font-normal"
        title={tag.name}
      >
        {tag.name}
      </h2>
    </Link>
  )
}
