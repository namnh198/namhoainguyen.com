import SkeletonHeadingNote from '@/components/Skeleton/SkeletonHeadingNote'
import SkeletonPostList from '@/components/notion/SkeletonPostList'

export default function Loading() {
  return (
    <>
      <SkeletonHeadingNote />
      <div className='container py-16 space-y-16'>
        <div className='flex-1 flex flex-col gap-12'>
          <div className='overflow-hidden flex-1'>
            <SkeletonPostList
              count={4}
              options={{
                className: 'flex flex-col divide-y dark:divide-neutral-700'
              }}
            />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='flex flex-col gap-3'>
              <div className='flex gap-2 items-center animate-pulse'>
                <div className='h-[30px] w-[30px] rounded-full bg-slate-200 dark:bg-neutral-700'></div>
                <div className='h-[30px] bg-slate-200 dark:bg-neutral-700 w-[250px] rounded-md'></div>
              </div>
              <div className='overflow-hidden flex-1'>
                <SkeletonPostList
                  count={4}
                  options={{
                    className: 'flex flex-col divide-y'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
