'use client'
import SearchModal from '@notion-x/components/SearchModal'
import IsSearchNormal1 from '@notion-x/icons/IsSearchNormal1'
import { cn } from '@notion-x/lib/utils'
import { useEffect, useState } from 'react'

export default function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  // eslint-disable-next-line
  const [searchKeyText, setSearchKeyText] = useState('Ctrl + K')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    const platform = navigator?.platform?.toLowerCase() || ''
    setSearchKeyText(platform.includes('mac') ? '⌘ K' : 'Ctrl K')

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <>
      <div className='flex items-center justify-end'>
        <div className='sm:max-w-xs cursor-pointer relative' onClick={() => setIsSearchOpen(true)}>
          <span className='absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500 '>
            <IsSearchNormal1 className='w-5 h-5' />
          </span>
          <span
            className={cn(
              'flex items-center leading-none border rounded-xl text-sm font-normal h-10 pl-10 pr-3 py-2 w-full',
              'bg-white border-neutral-200/70 group-hover:border-slate-300 hover:ring hover:ring-indigo-200/50',
              'dark:bg-transparent dark:border-slate-700 dark:group-hover:border-slate-400 dark:hover:ring-indigo-500/30'
            )}
          >
            Search&nbsp;
            <span className='hidden sm:inline-block'>
              for notes...&nbsp;
              <kbd
                className={cn([
                  'font-mono border font-semibold rounded mx-1 text-kb p-0.5 whitespace-nowrap',
                  'bg-white border-gray-400 text-gray-900'
                ])}
              >
                ⌘ K
              </kbd>
            </span>
          </span>
        </div>
      </div>
      <SearchModal
        url='/api/search-notion'
        slugPrefix='notes'
        isOpen={isSearchOpen}
        closeModal={() => setIsSearchOpen(false)}
        placeholder='Search for notes...'
      />
    </>
  )
}
