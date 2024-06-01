import me from '@/data/me'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import ThemeSwitcher from './theme-switcher'

const aClass =
  'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-neutral-700 dark:hover:text-slate-200 py-2 px-4 flex rounded-xl text-[15px] capitalize whitespace-nowrap'

export default function Footer() {
  return (
    <footer className='border-t border-neutral-200/70 dark:border-slate-600 py-6 sm:py-10'>
      <nav className='container flex flex-wrap items-center justify-center sm:justify-between'>
        <Link
          href='/'
          className={twMerge(`${aClass} w-full sm:w-fit justify-center sm:justify-start mb-3 sm:mb-0 font-medium`)}
        >
          Nam &copy; 2023
        </Link>
        <ul className='flex flex-wrap items-center gap-2 sm:gap-x-4 sm:justify-end'>
          <li>
            <Link href='/support-me' className={aClass}>
              Support Me
            </Link>
          </li>
          <li>
            <a href={`mailto:${me.email}`} className={aClass}>
              Contact
            </a>
          </li>
          <li>
            <Link href='/about' className={aClass}>
              About
            </Link>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
    </footer>
  )
}
