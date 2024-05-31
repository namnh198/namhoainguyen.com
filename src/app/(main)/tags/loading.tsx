import Container from '@/components/Container'
import SkeletonHeadingNote from '@/components/Skeleton/SkeletonHeadingNote'
import { tagListContainerClass } from '@/lib/styles'

export default function Loading() {
  return (
    <>
      <SkeletonHeadingNote />
      <Container className="py-16 space-y-16">
        <div className={tagListContainerClass}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-neutral-700"
            />
          ))}
        </div>
      </Container>
    </>
  )
}
