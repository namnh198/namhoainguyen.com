import { headingNoteImg, headingNoteWrapper } from '@/lib/styles'
import SkeletonLoading from './SkeletonLoading'

export default function SkeletonHeadingNote() {
  return (
    <div className="relative pt-8 lg:pt-16">
      <div className="bg-indigo-50 dark:bg-neutral-800 absolute top-0 inset-x-0 h-48 w-full"></div>
      <div className="container">
        <div className={headingNoteWrapper}>
          <div className="shrink-0">
            <div className={headingNoteImg}>
              <SkeletonLoading className="absolute inset-0 leading-none " />
            </div>
          </div>
          <div className="grow">
            <div className="max-w-screen-md space-y-3.5">
              <SkeletonLoading className="h-10" />
              <SkeletonLoading className="h-8" />
              <SkeletonLoading className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
