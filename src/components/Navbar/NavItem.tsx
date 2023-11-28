'use client'

import type { NavbarItemProps } from '@/data/navigation'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface Props {
  nav: NavbarItemProps
  isMobile?: boolean
  onClick?: () => void
}

export const menuItemCommonClass = cn(
  'flex rounded-xl text-sm font-medium capitalize whitespace-nowrap'
)

export default function NavItem({ nav, isMobile = false, onClick }: Props) {
  const { permalink, name } = nav
  const pathname = usePathname()
  const matchRoute = pathname.match(/(\/+[^/\s]+\/)(.*)/)
  const currentRoute = matchRoute ? matchRoute[1] : pathname
  const menuClasses = twMerge(
    cn(
      isActiveClass(areSameUris(permalink, currentRoute)),
      isMobileClass(isMobile),
      menuItemCommonClass
    )
  )
  return (
    <li className="menu-item shrink-0" onClick={onClick}>
      <Link href={permalink} className={menuClasses} title={name} suppressHydrationWarning>
        {name}
      </Link>
    </li>
  )
}

export const isActiveClass = (isCurrent: boolean) =>
  cn({
    'text-slate-700 dark:text-neutral-200 bg-slate-200 dark:bg-neutral-700': isCurrent,
    'text-slate-700 dark:text-neutral-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200':
      !isCurrent
  })

export const isMobileClass = (isMobile: boolean) =>
  cn({
    'p-2.5 ps-4 leading-6': isMobile,
    'py-2 px-4': !isMobile
  })

export const areSameUris = (uri: string, currentRoute: string) => {
  return uri === currentRoute || uri === currentRoute + '/'
}
