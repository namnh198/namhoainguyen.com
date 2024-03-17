'use client'
import NAVIGATION from '@/data/navigation'
import { cn } from '@notion-x/lib/utils'
import NavMenu from './NavMenu'
import NavMobile from './NavMobile'
import NavSearch from './NavSearch'

export default function Navbar() {
  return (
    <header
      className={cn(
        'sticky top-0 w-full z-40 border-b',
        'bg-white border-neutral-200/70',
        'dark:bg-neutral-900 dark:border-neutral-600'
      )}
    >
      <div className="container">
        <div className="h-14 flex justify-between">
          <NavMobile navbar={NAVIGATION} />
          <NavMenu navbar={NAVIGATION} />
          <NavSearch />
        </div>
      </div>
    </header>
  )
}
