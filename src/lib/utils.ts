import { Metadata } from 'next'
import { Block } from 'notion-types'
import slugify from 'slugify'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import me from '@/data/me'
import type { NotionTagData, Post, Tag } from '@/types/interface'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const makeSlugByText = (text: string): string => {
  if (!text) {
    return ''
  }
  return slugify(text, { lower: true, locale: 'vi', remove: /[:?&".,/\\]/g })
}

export const getUnOfficalNotionFilter = (filter?: any): any => {
  const defaultFilter = [
    {
      property: process.env.NEXT_PUBLIC_ID_NOTE_PAGE_KEY,
      filter: {
        operator: 'checkbox_is',
        value: {
          type: 'exact',
          value: false
        }
      }
    }
  ]

  if (process.env.ENV_MODE === 'prod') {
    defaultFilter.push({
      property: process.env.NEXT_PUBLIC_ID_NOTE_PUBLISHED_KEY,
      filter: {
        operator: 'checkbox_is',
        value: {
          type: 'exact',
          value: true
        }
      }
    })
  }

  if (filter) {
    defaultFilter.push(filter)
  }

  return defaultFilter
}

export const getPostProperties = (post: Block): Post => {
  const properties = post?.properties
  const slug = properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_SLUG_KEY}`]?.[0]?.[0]
  const permalink = getPermalink('note', slug)
  const rawTags = properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_TAGS_KEY}`]?.[0]?.[0]
  const tags = rawTags ? rawTags.split(',').map(mapTag) : []
  return {
    id: post?.id,
    drawTitle: properties?.title,
    title: properties?.title?.[0]?.[0],
    slug,
    tags,
    permalink,
    description: properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_DESCRIPTION_KEY}`]?.[0]?.[0],
    updatedDate:
      properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_MODIFIED_DATE_KEY}`]?.[0]?.[1]?.[0]?.[1]?.start_date ??
      new Date(post?.last_edited_time).toISOString(),
    createdDate:
      properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_CREATED_DATE}`]?.[0]?.[1]?.[0]?.[1]?.start_date ??
      new Date(post?.created_time).toISOString(),
    published: properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_PUBLISHED_KEY}`]?.[0]?.[0] === 'Yes',
    draft: properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_DRAFT_KEY}`]?.[0]?.[0] === 'Yes',
    page: properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_PAGE_KEY}`]?.[0]?.[0] === 'Yes',
    icon: post.format?.page_icon,
    cover: post.format?.page_cover,
    verified: properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_VERIFIED_KEY}`]?.[0]?.[0] === 'Yes',
    pinned: properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_PINNED_KEY}`]?.[0]?.[0] === 'Yes',
    discrete: properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_DISCRETE_KEY}`]?.[0]?.[0] === 'Yes'
  }
}

export const getPermalink = (type: 'tag' | 'note', slug = '/'): string => {
  switch (type) {
    case 'tag':
      return `/tags/${slug}`
    case 'note':
    default:
      return `/notes/${slug}`
  }
}

export const getMetadata = ({
  title,
  description,
  images
}: {
  title: string
  description?: string
  images?: any
}): Metadata => {
  return {
    title: `${title} | Site of Nam`,
    description: description || me.quote,
    openGraph: {
      title: title || "Hi! I'm Nam",
      description: description || me.quote,
      type: 'website',
      images: images || [
        {
          url: 'https://i.imgur.com/PyXUtfTh.png',
          width: 1024,
          height: 581
        }
      ]
    }
  }
}

export const mapTag = (tag: NotionTagData | string): Tag => {
  if (typeof tag === 'string') {
    const slug = makeSlugByText(tag)
    return {
      id: slug,
      name: tag,
      slug: slug,
      permalink: getPermalink('tag', slug)
    }
  }
  if (!tag?.name) throw new Error('Tag is invalid')
  const slug = makeSlugByText(tag.name)
  return {
    id: slug,
    name: tag.name,
    slug,
    permalink: getPermalink('tag', slug)
  }
}

import { BlockMap } from 'notion-types'
export { formatDate, formatNotionDateTime, isUrl } from 'notion-utils'

const groupBlockContent = (blockMap: BlockMap): string[][] => {
  const output: string[][] = []

  let lastType: string | undefined = undefined
  let index = -1

  Object.keys(blockMap).forEach((id) => {
    const blockValue = blockMap[id]?.value

    if (blockValue) {
      blockValue.content?.forEach((blockId) => {
        const blockType = blockMap[blockId]?.value?.type

        if (blockType && blockType !== lastType) {
          index++
          lastType = blockType
          output[index] = []
        }

        if (index > -1) {
          output[index].push(blockId)
        }
      })
    }

    lastType = undefined
  })

  return output
}

export const getListNumber = (blockId: string, blockMap: BlockMap) => {
  const groups = groupBlockContent(blockMap)
  const group = groups.find((g) => g.includes(blockId))

  if (!group) {
    return
  }

  return group.indexOf(blockId) + 1
}

export const getHashFragmentValue = (url: string) => {
  return url.includes('#') ? url.replace(/^.+(#.+)$/, '$1') : ''
}

export const isBrowser = typeof window !== 'undefined'

const youtubeDomains = new Set([
  'youtu.be',
  'youtube.com',
  'www.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com'
])

export const getYoutubeId = (url: string): string | null => {
  try {
    const { hostname } = new URL(url)
    if (!youtubeDomains.has(hostname)) {
      return null
    }
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i

    const match = url.match(regExp)
    if (match && match[2].length === 11) {
      return match[2]
    }
  } catch {
    // ignore invalid urls
  }

  return null
}
