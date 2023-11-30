import Link from 'next/link'

export default function Heading({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex flex-col relative dark:text-neutral-50 justify-between mb-10 md:mb-12 sm:flex-row sm:items-end text-neutral-900">
      <h2 className="text-3xl md:text-4xl font-semibold leading-9 md:leading-10">
        {title}
        {href && (
          <Link
            href={href}
            className="text-[80%] ml-2 italic text-slate-600 font-medium hover:text-indigo-700 dark:hover:text-indigo-400"
          >
            ...more
          </Link>
        )}
      </h2>
    </div>
  )
}
