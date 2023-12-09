import { SkeletonCardProject } from '@/components/Card/CardProject'
import Container from '@/components/Container'
import SkeletonHeadingNote from '@/components/skeleton/SkeletonHeadingNote'

export default function Loading() {
  return (
    <>
      <SkeletonHeadingNote />
      <Container className="py-16 space-y-16">
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCardProject key={i} />
          ))}
        </div>
      </Container>
    </>
  )
}
