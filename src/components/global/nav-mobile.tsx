import type { NavMenuProps } from '@/types';
import clsx from 'clsx';
import { Button, Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function NavMobile({ navItems, activeMenu }: { navItems: NavMenuProps[]; activeMenu?: string }) {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const toggleMenu = () => setIsShowMenu(!isShowMenu);
  const closeMenu = () => setIsShowMenu(false);

  return (
    <>
      <Button
        className={clsx('relative group block lg:hidden w-10 mr-4', {
          'is-active': isShowMenu
        })}
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <span className="absolute top-[calc(50%-1px)] left-[calc(50%-12px)] w-6 h-0.5 bg-text animation-bar1-reverse group-[.is-active]:animation-bar-1"></span>
        <span className="absolute top-[calc(50%-1px)] left-[calc(50%-12px)] w-6 h-0.5 bg-text animation-bar2-reverse group-[.is-active]:animation-bar-2"></span>
        <span className="absolute top-[calc(50%-1px)] left-[calc(50%-12px)] w-6 h-0.5 bg-text animation-bar3-reverse group-[.is-active]:animation-bar-3"></span>
      </Button>
      <Transition appear show={isShowMenu} as={Fragment}>
        <Dialog
          as="div"
          onClose={closeMenu}
          className="fixed z-50 bg-gradient-to-b from-mantle to-mantle/80 top-16 left-0 w-screen h-screen overflow-y-auto"
        >
          <TransitionChild
            as={Fragment}
            enter="transition-transform ease-out duration-200"
            enterFrom="-translate-y-full"
            enterTo="translate-y-0"
            leave="transition-transform ease-in duration-200"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
          >
            <DialogPanel>
              {navItems.map(({ title, href, external }) => (
                <a
                  key={href}
                  href={href}
                  target={external ? '_blank' : '_self'}
                  rel={external ? 'noopener noreferrer' : ''}
                  className={clsx(
                    'relative group block py-5 text-2xl leading-5 text-center whitespace-nowrap transition-fade duration-300 ease-in-out',
                    {
                      'is-active': href === activeMenu
                    }
                  )}
                >
                  <span className="absolute bg-mauve group-[.is-active]:top-0 group-[.is-active]:left-0 group-[.is-active]:w-1 group-[.is-active]:h-full"></span>
                  <span className="absolute size-full opacity-0 group-[.is-active]:opacity-100 from-mauve/15 to-mauve/5 scale-y-0 top-0 left-0 bg-gradient-to-r group-[.is-active]:scale-y-100"></span>
                  <span className="font-bold tracking-[0.04em] transition-opacity duration-300 opacity-50 group-[.is-active]:opacity-100 group-hover:opacity-100 group-hover:underline">
                    {title}
                  </span>
                </a>
              ))}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
