import cn from 'classnames'
import { twMerge } from 'tailwind-merge'
export default function SkeletonLoading({ className }: { className?: string }) {
  return (
    <span className={twMerge(cn('block', [className]))} aria-live="polite" aria-busy="true">
      <span className="w-full h-full skeleton-loading">&zwnj;</span>
    </span>
  )
}
