import React from 'react'
import IsDocumentText from '../icons/IsDocumentText'
import { cn } from '@/lib/utils'

type SkeletonPostListProps = {
  count: number
  options?: {
    className?: string
  }
}

export default function SkeletonPostList({ count, options }: SkeletonPostListProps) {
  return (
    <>
      <div
        className={cn(
          options?.className ||
            'rounded-xl bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-slate-600',
          'animate-pulse'
        )}
      >
        {Array.from({ length: count }).map((_, index) => getSkeleton(index))}
      </div>
    </>
  )
}

const getSkeleton = (key: number): JSX.Element => {
  return <PostSimpleSkeleton key={key} />
}

const PostSimpleSkeleton = (): JSX.Element => (
  <div className='flex items-center gap-3 py-3 px-2'>
    <div>
      <IsDocumentText className='text-xl text-slate-700 dark:text-slate-200' />
    </div>
    <div className='flex-1 flex justify-start'>
      <div className='h-6 w-3/4 rounded-md bg-slate-200 dark:bg-neutral-700'></div>
    </div>
    <div className='h-4 w-[150px] rounded-md bg-slate-200 dark:bg-neutral-700'></div>
  </div>
)
