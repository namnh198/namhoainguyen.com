import SkeletonHeadingNote from '@/components/Skeleton/SkeletonHeadingNote'
import SkeletonPostList from '@notion-x/components/SkeletonPostList'

export default function Loading() {
  return (
    <>
      <SkeletonHeadingNote />
      <div className='container py-16 space-y-16'>
        <div className='flex-1 flex flex-col gap-12'>
          <div className='overflow-hidden flex-1'>
            <SkeletonPostList
              count={4}
              postType='simple'
              options={{
                className: 'flex flex-col divide-y'
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
