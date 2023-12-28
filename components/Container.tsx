import cn from 'classnames'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
  children: React.ReactNode
}

export default function Container({ className, children }: Props) {
  return (
    <div className={twMerge(cn('container md:pt-10 pt-4 space-y-16', [className]))}>{children}</div>
  )
}
