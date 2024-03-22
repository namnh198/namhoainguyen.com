import SkeletonLoading from '@/components/Skeleton/SkeletonLoading'

import Container from '@/components/Container'
import { headingNoteImg, headingNoteWrapper } from '@/lib/styles'

export default function Loading() {
  return (
    <>
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
      {/* Content */}
      <Container className="py-16 space-y-16 h-[400px]">
        <div className="mx-auto container pb-8 pt-4">
          <div className="w-100 mt-4 mb-2 h-9 rounded-xl bg-slate-200 dark:bg-neutral-700"></div>
          <div className="w-100 mb-2 h-9 rounded-xl bg-slate-200 dark:bg-neutral-700"></div>
          <div className="w-100 mb-2 h-9 rounded-xl bg-slate-200 dark:bg-neutral-700"></div>
          <div className="w-100 mb-2 h-9 rounded-xl bg-slate-200 dark:bg-neutral-700"></div>
          <div className="w-100 mb-2 h-9 rounded-xl bg-slate-200 dark:bg-neutral-700"></div>
          <div className="mb-1 w-2/3 h-9 rounded-xl bg-slate-200 dark:bg-neutral-700"></div>
        </div>
      </Container>
    </>
  )
}
