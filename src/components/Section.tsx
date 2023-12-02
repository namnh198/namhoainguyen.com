import cn from 'classnames'

interface Props {
  title: string
  subtitle?: string
  bg?: boolean
  customClass?: string
  children: React.ReactNode
}

export default function Section({ title, subtitle, bg = false, children }: Props) {
  return (
    <div className={cn('relative', { 'py-16': bg })}>
      {bg && (
        <div className="absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-100  /20">
          <span className="sr-only">background</span>
        </div>
      )}
      <div className="relative text-neutral-900  not-prose border-b border-neutral-200  mb-9 pb-7">
        <div className="max-w-2xl w-full">
          <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">{title}</h2>
          {subtitle && (
            <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 ">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
