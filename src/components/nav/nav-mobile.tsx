import { Transition, TransitionChild, Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import { HiOutlineXMark } from 'react-icons/hi2'
import { Fragment } from 'react'

import NavItem from './nav-item'
import Avatar from './avatar'
import { NavbarItemProps } from '@/types/app'

export default function NavMobile({
  isShowMenu,
  closeModal,
  navbar
}: {
  isShowMenu: boolean
  closeModal: any
  navbar: NavbarItemProps[]
}) {
  return (
    <Transition appear show={isShowMenu}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <div className='fixed bg/black/40 transition-opacity opacity-100 inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black/40 transition-opacity opacity-100' aria-hidden='true'></div>
            </TransitionChild>

            <TransitionChild
              as='div'
              className='fixed inset-y-0 start-0 w-screen max-w-sm overflow-y-auto z-50 opacity-100'
              enter='transition ease-in-out duration-300'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <DialogPanel className='flex h-screen'>
                <div className='w-full max-w-sm overflow-hidden transition-all'>
                  <div className='overflow-y-auto w-full h-screen py-2 transition shadow-lg ring-1 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-slate-700'>
                    <DialogTitle className='py-7 px-5'>
                      <div className='absolute start-2 top-4'>
                        <Avatar />
                      </div>
                      <div className='absolute end-2 top-4 p-1'>
                        <button
                          onClick={closeModal}
                          className='w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-slate-800 focus:outline-none'
                        >
                          <HiOutlineXMark className='w-6 h-6' />
                        </button>
                      </div>
                    </DialogTitle>
                    <ul className='flex flex-col py-6 px-2 space-y-1 rtl:space-x-reverse'>
                      {navbar.map((nav) => (
                        <NavItem key={nav.name} isMobile nav={nav} onClick={closeModal} />
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
