import { cn } from '@/lib/utils'

export const headingNoteWrapper = cn(
  'flex flex-col gap-4 lg:p-7 md:flex-row md:gap-6 p-5 relative xl:gap-12',
  'border md:rounded-[2rem] rounded-3xl shadow-md',
  'bg-white dark:bg-neutral-900 border-neutral-200/70 dark:border-slate-600'
)

export const headingNoteImg = cn(
  'relative overflow-hidden h-24 lg:h-40 lg:w-40 ring-4 ring-white dark:ring-slate-600 rounded-3xl sm:h-32 sm:w-32 w-24 z-0'
)

export const tagListContainerClass = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'
