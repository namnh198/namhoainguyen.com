import { cn } from '@notion-x/lib/utils'
import { twMerge } from 'tailwind-merge'
export default function SkeletonLoading({ className }: { className?: string }) {
  return (
    <span className={twMerge(cn('block', [className]))} aria-live="polite" aria-busy="true">
      <span className="block h-full w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700"></span>
    </span>
  )
}
