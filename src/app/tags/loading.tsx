import { tagListContainerClass } from '@/assets/styles/styles'
import Container from '@/components/Container'
import SkeletonHeadingNote from '@/components/Skeleton/SkeletonHeadingNote'

export default function Loading() {
  return (
    <>
      <SkeletonHeadingNote />
      <Container className="py-16 space-y-16">
        <div className={tagListContainerClass}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded-xl bg-neutral-100 " />
          ))}
        </div>
      </Container>
    </>
  )
}
