'use client'

import { HiOutlineComputerDesktop, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [activeTheme, setActiveTheme] = useState('system')

  useEffect(() => {
    if (theme) {
      setActiveTheme(theme)
    }
  }, [theme])

  const themeSwitchHandler = (theme: string) => {
    setTheme(theme)
    setActiveTheme(theme)
  }

  return (
    <div className='hidden sm:flex gap-x-0.5 border border-neutral-200/70 dark:border-slate-600 rounded-full p-1'>
      <button className={getButtonClass('light', activeTheme)} onClick={() => themeSwitchHandler('light')}>
        <HiOutlineSun className='w-4 h-4' />
      </button>
      <button className={getButtonClass('system', activeTheme)} onClick={() => themeSwitchHandler('system')}>
        <HiOutlineComputerDesktop className='w-4 h-4' />
      </button>
      <button className={getButtonClass('dark', activeTheme)} onClick={() => themeSwitchHandler('dark')}>
        <HiOutlineMoon className='w-4 h-4' />
      </button>
    </div>
  )
}

const getButtonClass = (theme: string, activeTheme: string) =>
  cn({
    'p-2.5 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none flex items-center justify-center':
      true,
    'bg-slate-200 dark:bg-slate-500': activeTheme === theme
  })
