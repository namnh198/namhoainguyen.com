import SkeletonLoading from '@/components/skeleton/SkeletonLoading'

import { headingNoteImg, headingNoteWrapper } from '@/assets/styles/styles'
import Container from '@/components/Container'

export default function Loading() {
  return (
    <>
      <div className="relative pt-8 lg:pt-16">
        <div className="bg-indigo-50 absolute top-0 inset-x-0 h-48 w-full"></div>
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
          <div className="w-100 mt-4 mb-2 h-5 rounded-2xl bg-slate-200"></div>
          <div className="w-100 mb-2 h-5 rounded-2xl bg-slate-200"></div>
          <div className="w-100 mb-2 h-5 rounded-2xl bg-slate-200"></div>
          <div className="mb-1 h-5 w-1/2 rounded-2xl bg-slate-200"></div>
        </div>
      </Container>
    </>
  )
}
