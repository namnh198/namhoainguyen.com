import { cn } from '@notion-x/lib/utils'
import Link from 'next/link'

interface Props {
  color?: string
  label: string
  href?: string
  className?: string
}

export default function Badge({ color, label, href, className }: Props) {
  const badgeClasses = cn(
    'transition-colors duration-300 inline-flex px-2.5 py-1 font-medium text-xs rounded-full relative',
    'ring-1 ring-inset',
    {
      'text-green-700 bg-green-50 ring-green-600/20': color === 'green',
      'hover:bg-green-600 hover:text-green-100': href && color === 'green',
      'text-blue-700 bg-blue-50 ring-blue-600/20': color === 'blue',
      'hover:bg-blue-600 hover:text-blue-100': href && color === 'blue',
      'text-yellow-700 bg-yellow-50 ring-yellow-600/20': color === 'yellow',
      'hover:bg-yellow-600 hover:text-yellow-100': href && color === 'yellow',
      'text-red-700 bg-red-50 ring-red-600/20': color === 'red',
      'hover:bg-red-600 hover:text-red-100': href && color === 'red'
    },
    [className]
  )
  return href ? (
    <Link href={href} className={badgeClasses}>
      {label}
    </Link>
  ) : (
    <span className={badgeClasses}>{label}</span>
  )
}
