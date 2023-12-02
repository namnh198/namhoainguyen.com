import { Tool } from '@/types'
import cn from 'classnames'
import Image from 'next/image'

export default function CardTool({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      className="group p-4 dark:bg-neutral-900 shadow-md border border-neutral-200/70 dark:border-neutral-700 rounded-3xl transition duration-200 ease-in-out hover:-translate-y-1"
      target="_blank"
    >
      <div className="flex flex-row h-full">
        <div className="w-[90px] h-full rounded-l-xl relative overflow-hidden shrink-0 border-[0.5px] border-neutral-200/70 dark:border-neutral-700">
          <div className="relative w-full h-full overflow-hidden">
            <div className="items-center flex justify-center absolute bg-neutral-100 dark:bg-neutral-800 inset-0"></div>
            <div className="flex items-center justify-center p-8">
              <Image
                src={tool.icon}
                alt={tool.title}
                className="absolute inset-0 m-auto rounded-md"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 py-4 px-3.5 flex flex-col space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {tool.tags?.map(tag => (
              <span
                key={tag}
                className={cn({
                  'px-2.5 py-1 rounded-md space-x-1 text-xs': true,
                  'bg-neutral-100 dark:bg-neutral-800': !['free', 'paid'].includes(tag),
                  'font-medium text-red-500 bg-red-100': tag === 'paid',
                  'font-medium text-teal-500 bg-teal-100': tag === 'free'
                })}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="block group-hover:text-indigo-800 dark:group-hover:text-indigo-400 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            <span className="line-clamp-2" title={tool.title}>
              {tool.title}
            </span>
          </h3>
          <p className="block dark:text-neutral-400 text-neutral-500 text-sm mt-3.5 mb-4">
            {tool.description}
          </p>
        </div>
      </div>
    </a>
  )
}
