import { SkeletonCardTool } from '@/components/CardTool'
import SkeletonHeadingNote from '@/components/Skeleton/SkeletonHeadingNote'

export default function Loading() {
  return (
    <>
      <SkeletonHeadingNote />
      <div className='containerpy-16 space-y-16'>
        <div className='flex flex-col gap-6 md:gap-8'>
          <div className='h-12 bg-slate-200 dark:bg-neutral-700 rounded-xl animate-pulse'></div>
          <div className='flex items-center gap-3 flex-wrap md:flex-nowrap md:items-baseline justify-start sm:justify-start'>
            <div className='flex gap-2 flex-wrap items-center'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='w-12 h-6 bg-slate-200 dark:bg-neutral-700 rounded-md animate-pulse'></div>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCardTool key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
