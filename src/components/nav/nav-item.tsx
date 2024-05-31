import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@notion-x/lib/utils'
import { NavbarItemProps } from '@/types/app'

interface NavItemProps {
  nav: NavbarItemProps
  isMobile?: boolean
  onClick?: () => void
}
export default function NavItem({ nav, isMobile = false, onClick }: NavItemProps) {
  const { name, url } = nav
  const pathname = usePathname()
  const matchRoute = pathname.match(/(\/+[^/\s]+\/)(.*)/)
  const currentRoute = matchRoute ? matchRoute[1] : pathname

  return (
    <Link href={url} title={name} className={classNavItem(url, currentRoute, isMobile)} onClick={onClick}>
      {name}
    </Link>
  )
}

const classNavItem = (url: string, currentRoute: string, isMobile: boolean) => {
  const isActive = url === currentRoute || `${url}/` === currentRoute
  return cn({
    'flex rounded-xl text-sm font-medium capitalize whitespace-nowrap': true,
    'p-2.5 ps-4 leading-6': isMobile,
    'py-2 px-4': !isMobile,
    'text-slate-700 bg-slate-200 dark:text-slate-200 dark:bg-slate-700': isActive,
    'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-200':
      !isActive
  })
}
