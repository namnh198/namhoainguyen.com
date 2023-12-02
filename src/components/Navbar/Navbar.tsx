'use client'
import NAVIGATION from '@/data/navigation'
import NavMenu from './NavMenu'
import NavMobile from './NavMobile'
import NavSearch from './NavSearch'

export default function Navbar() {
  return (
    <header className="sticky top-0 w-full z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200/70 dark:border-transparent">
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
