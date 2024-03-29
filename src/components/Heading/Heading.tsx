import { cn } from '@notion-x/lib/utils'
import Link from 'next/link'

export default function Heading({
  title,
  href,
  showMore = false
}: {
  title: string
  href?: string
  showMore?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col relative  justify-between mb-10 md:mb-12 sm:flex-row sm:items-end',
        'text-neutral-900',
        'dark:text-neutral-100'
      )}
    >
      <h2 className="text-3xl md:text-4xl font-semibold leading-9 md:leading-10">
        {title}
        {href && showMore && (
          <Link
            href={href}
            className="text-[80%] ml-2 italic text-slate-600 dark:text-slate-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-400"
          >
            ...more
          </Link>
        )}
      </h2>
    </div>
  )
}
