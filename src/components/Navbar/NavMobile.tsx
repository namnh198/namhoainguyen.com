'use client'
import NavItem from '@/components/Navbar/NavItem'
import type { NavbarItemProps } from '@/data/navigation'
import { Dialog, Transition } from '@headlessui/react'
import HiOutlineBars3 from '@notion-x/icons/HiOutlineBars3'
import HiOutlineXMark from '@notion-x/icons/HiOutlineXMark'
import { Fragment, useState } from 'react'
import NavAvatar from './NavAvatar'

export default function NavMobile({ navbar }: { navbar: NavbarItemProps[] }) {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const handleOpenMenu = () => {
    setIsShowMenu(true)
  }

  const handleCloseMenu = () => {
    setIsShowMenu(false)
  }
  return (
    <div className="flex item-center lg:hidden mr-2.5">
      <button
        title="Toggle Menu"
        onClick={handleOpenMenu}
        className="p-2.5 -ml-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center"
      >
        <span className="sr-only">Toggle Menu</span>
        <HiOutlineBars3 className="w-6 h-6" />
      </button>
      <Transition appear as={Fragment} show={isShowMenu}>
        <Dialog as="div" className="relative z-50" onClose={handleCloseMenu}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/40 transition-opacity opacity-100" />
          </Transition.Child>
          <Transition.Child
            className="fixed inset-y-0 start-0 w-screen max-w-sm overflow-y-auto z-50 opacity-100"
            enter="transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="flex h-screen">
              <div className="w-full max-w-sm overflow-hidden transition-all">
                <div className="overflow-y-auto w-full h-screen py-2 transition shadow-lg ring-1 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-slate-700">
                  <div className="py-7 px-5">
                    <div className="absolute start-2 top-4">
                      <NavAvatar />
                    </div>
                    <div className="absolute end-2 top-4 p-1">
                      <button
                        onClick={handleCloseMenu}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-slate-800 focus:outline-none"
                      >
                        <HiOutlineXMark className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <ul className="flex flex-col py-6 px-2 space-y-1 rtl:space-x-reverse">
                    {navbar.map(nav => (
                      <NavItem key={nav.name} isMobile nav={nav} onClick={handleCloseMenu} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  )
}
