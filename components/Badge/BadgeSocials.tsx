import { SocialBadge } from '@/data/socials'
import cn from 'classnames'

export default function BadgeSocial({
  social,
  showTitle = false
}: {
  social: SocialBadge
  showTitle?: boolean
}) {
  const { color } = social
  const colorVariants = cn({
    'hover:bg-red-100  hover:text-red-700 ': color === 'red',
    'hover:bg-teal-100  hover:text-teal-700 ': color === 'teal',
    'hover:bg-sky-100  hover:text-sky-700 ': color === 'sky',
    'hover:bg-slate-100  hover:text-slate-700 ': color === 'slate',
    'hover:bg-blue-100  hover:text-blue-700 ': color === 'blue'
  })

  const classes = cn([
    'relative min-w-[68px] mb-2 mr-1.5 flex grow lg:grow-0 items-center justify-center',
    'rounded-full group leading-none transition-colors px-3 h-8 text-xs sm:text-sm',
    'text-neutral-700 bg-neutral-200/90  ',
    colorVariants
  ])

  return (
    <a href={social.url} target="_blank" rel="noreferrer" className={classes}>
      {social.icon}
      {showTitle && <span className="ml-1 text-inherit">{social.title}</span>}
    </a>
  )
}
