'use client'

import { cn } from '@/lib/utils'
import Fuse from 'fuse.js'

import { Tool } from '@/app/types'
import CardTool from '@/components/Card/CardTool'
import { FiSearch } from 'react-icons/fi'
import { IoCloseCircle } from 'react-icons/io5'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function ToolPage({ tools, tags }: { tools: Tool[]; tags: string[] }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [toolResults, setToolResults] = useState<Tool[]>(tools)
  const [tagsToShow, setTagsToShow] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')
  const fuse = new Fuse(tools, {
    includeScore: false,
    keys: ['title', 'description', 'tags']
  })

  const toolsToShow = toolResults.filter(
    (tool) => tagsToShow.every((type) => tool.tags && tool.tags.includes(type)) || tagsToShow.length === 0
  )

  const toggleTypeToShow = (tag: string) => {
    if (tagsToShow.includes(tag) && tagsToShow.length === 1) {
      router.push('/tools', { scroll: false })
      setTagsToShow(tagsToShow.filter((item) => item !== tag))
    } else if (tagsToShow.includes(tag) && tagsToShow.length > 1) {
      router.push(`/tools?tag=${tagsToShow.filter((item) => item !== tag).join(',')}`, {
        scroll: false
      })
      setTagsToShow(tagsToShow.filter((item) => item !== tag))
    } else {
      setTagsToShow([...tagsToShow, tag])
      router.push(`/tools?tag=${[...tagsToShow, tag].join(',')}`, { scroll: false })
    }
  }

  useEffect(() => {
    if (tag && tag.length) {
      setTagsToShow(tag.split(','))
    }
  }, [tag])

  const handleOnchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setQuery(value)
    if (value.length) {
      const result = fuse.search(value)
      setToolResults(result.map((item) => item.item))
    } else {
      setToolResults(tools)
    }
  }

  const clearQuery = () => {
    setQuery('')
    setToolResults(tools)
    inputRef.current?.focus()
  }

  return (
    <div className='flex flex-col gap-6 md:gap-8'>
      <div className='flex items-center gap-3 p-3 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-slate-600 rounded-xl'>
        <div className='grid place-items-center text-slate-500 dark:text-slate-400'>
          <FiSearch className='text-2xl' />
        </div>
        <input
          ref={inputRef}
          className='peer hide-search-cancel h-full w-full text-ellipsis bg-transparent pr-2 outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400'
          id='search'
          type='search'
          placeholder={'Search tools...'}
          autoComplete='off'
          value={query}
          onChange={(e) => handleOnchangeInput(e)}
        />
        {query && (
          <button onClick={() => clearQuery()} title='Clear Search Query'>
            <IoCloseCircle className='h-5 w-5 text-slate-500' />
          </button>
        )}
      </div>
      <div className='flex items-center gap-3 flex-wrap md:flex-nowrap md:items-baseline justify-start sm:justify-start'>
        <div className='flex gap-2 flex-wrap items-center'>
          {/* <TiTag className="text-gray-500 text-lg" /> */}
          {tags.map((tag) => (
            <button
              key={tag}
              title={`Tag: ${tag}`}
              onClick={() => toggleTypeToShow(tag)}
              className={cn(
                'whitespace-nowrap p-0.5 border border-neutral-200 dark:border-slate-600 px-2 text-base rounded-md',
                'transition duration-200 ease-in-out',
                {
                  'bg-white dark:bg-neutral-700': !tagsToShow.includes(tag),
                  'bg-sky-500 !border-sky-700 text-white': tagsToShow.includes(tag)
                }
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3'>
        {toolsToShow.map((tool) => (
          <CardTool key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
