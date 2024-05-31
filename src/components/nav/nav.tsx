'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { navItems } from '@/lib/config'
import NavItem from './nav-item'
import Avatar from './avatar'
import Search from './search'

export default function Nav() {
  return (
    <header className='sticky top-0 z-50 border-b bg-white'>
      <div className='container'>
        <div className='h-14 flex justify-between'>
          <div className='flex flex-1 items-center sm:space-x-6'>
            <ToggleMenu />
            <Avatar />
            <nav className='hidden lg:flex items-center sm:space-x-1'>
              {navItems.map((nav) => (
                <NavItem key={nav.name} nav={nav} isMobile={false} />
              ))}
            </nav>
          </div>
          <Search />
        </div>
      </div>
    </header>
  )
}

const NavMobile = dynamic(() => import('@/components/nav/nav-mobile'), { ssr: false })

const ToggleMenu = () => {
  const [isRenderNavMobile, setIsRenderNavMobile] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(false)

  const handleToggleMenuClick = () => {
    if (!isRenderNavMobile) {
      setIsRenderNavMobile(true)
    }
    setIsShowMenu(!isShowMenu)
  }

  return (
    <div className='flex item-center lg:hidden mr-2.5'>
      <button
        title='Toggle Menu'
        onClick={handleToggleMenuClick}
        className='p-2.5 -ml-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center'
      >
        <span className='sr-only'>Toggle Menu</span>
        <HiOutlineBars3 className='size-6' />
      </button>
      {isRenderNavMobile && (
        <NavMobile isShowMenu={isShowMenu} closeModal={() => setIsShowMenu(false)} navbar={navItems} />
      )}
    </div>
  )
}
