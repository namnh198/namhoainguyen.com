import { SkeletonCardTool } from '@/components/Card/CardTool'
import Container from '@/components/Container'
import SkeletonHeadingNote from '@/components/Skeleton/SkeletonHeadingNote'

export default function Loading() {
  return (
    <>
      <SkeletonHeadingNote />
      <Container className="py-16 space-y-16">
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCardTool key={i} />
          ))}
        </div>
      </Container>
    </>
  )
}
