import { Tool as ToolProps } from '@/app/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Tool({ tool, compactMode = false }: { tool: ToolProps; compactMode?: boolean }) {
  return (
    <a
      href={tool.url}
      className='group p-4 shadow-md border border-neutral-200/70 dark:border-neutral-600 bg-transparent dark:bg-neutral-900 rounded-3xl transition duration-200 ease-in-out hover:-translate-y-1'
      target='_blank'
    >
      <div className='flex flex-row h-full'>
        <div className='w-[90px] h-full rounded-l-xl relative overflow-hidden shrink-0 border-[0.5px] border-neutral-200/70 dark:border-neutral-600'>
          <div className='relative w-full h-full overflow-hidden'>
            <div className='items-center flex justify-center absolute bg-neutral-100 dark:bg-neutral-800 inset-0'></div>
            <div
              className={cn({
                'flex items-center justify-center': true,
                'p-8': !compactMode
              })}
            >
              <Image
                src={tool.icon}
                alt={tool.title}
                className='absolute inset-0 m-auto rounded-md'
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
        <div
          className={cn({
            'flex-1 py-4 px-3.5 flex flex-col gap-y-3': true,
            'flex-col-reverse': compactMode
          })}
        >
          <div className='flex flex-wrap gap-1.5'>
            {tool.isFree ? (
              <span className='px-2.5 py-1 rounded-md space-x-1 text-xs font-medium text-green-900 bg-green-200'>
                free
              </span>
            ) : (
              <span className='px-2.5 py-1 rounded-md space-x-1 text-xs font-medium text-red-900 bg-red-200'>paid</span>
            )}
            {!compactMode &&
              tool.tags?.map((tag) => (
                <span key={tag} className='px-2.5 py-1 rounded-md space-x-1 text-xs bg-neutral-200 dark:bg-neutral-700'>
                  {tag}
                </span>
              ))}
          </div>
          <h3 className='block group-hover:text-indigo-800 dark:group-hover:text-indigo-300 text-base font-semibold text-neutral-900 dark:text-neutral-300'>
            <span className='line-clamp-2' title={tool.title}>
              {tool.title}
            </span>
          </h3>
          {!compactMode && (
            <p className='block text-neutral-500 dark:text-neutral-400 text-sm mt-3.5 mb-4'>{tool.description}</p>
          )}
        </div>
      </div>
    </a>
  )
}

export const SkeletonCardTool = () => (
  <div className='group p-4 shadow-md border border-neutral-200 dark:border-slate-600 rounded-3xl'>
    <div className='flex flex-row h-full'>
      <div className='w-[90px] min-h-[180px] h-full rounded-l-xl relative overflow-hidden shrink-0 border-[0.5px] border-neutral-200 dark:border-slate-600'>
        <div className='relative w-full h-full overflow-hidden'>
          <div className='items-center flex justify-center absolute bg-neutral-100 dark:bg-neutral-800 inset-0' />
          <div className='flex items-center justify-center p-8'>
            <div className='w-[60px] h-[60px] bg-slate-200 dark:bg-neutral-700 rounded-md absolute inset-0 m-auto animate-pulse'></div>
          </div>
        </div>
      </div>
      <div className='flex-1 py-4 px-3.5 flex flex-col space-y-3 animate-pulse'>
        <div className='flex flex-wrap gap-1.5'>
          <div className='flex flex-wrap gap-1.5'>
            <div className='w-8 h-6 bg-slate-200 dark:bg-neutral-700 rounded-md'></div>
            <div className='w-8 h-6 bg-slate-200 dark:bg-neutral-700 rounded-md'></div>
          </div>
        </div>
        <div className={cn('text-[0.83rem] text-slate-700 break-words overflow')}>
          <div className='w-full h-6 bg-slate-200 dark:bg-neutral-700 rounded-md'></div>
          <div className='w-4/5 h-4 bg-slate-200 dark:bg-neutral-700 rounded-md mt-1'></div>
        </div>
      </div>
    </div>
  </div>
)
