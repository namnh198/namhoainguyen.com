import { cn } from '@/lib/utils'

export default function SkeletonLoading({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700', [className])}
      aria-live='polite'
      aria-busy='true'
    >
      {children}
    </div>
  )
}
