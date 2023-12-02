import me from '@/data/me'
import type { NotionTagData, Post, Tag } from '@notion-x/interface'
import {
  QueryDatabaseParameters,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints'
import { Metadata } from 'next'
import { Block } from 'notion-types'
import slugify from 'slugify'
const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC'
})

export const getFormattedDate = (date: Date | string | undefined): string => {
  if (!date) {
    date = new Date()
  } else if (typeof date === 'string') {
    date = new Date(date)
  }
  return date ? formatter.format(date) : ''
}

export const makeSlugByText = (text: string): string => {
  if (!text) {
    return ''
  }
  return slugify(text, { lower: true, locale: 'vi', remove: /[:?&".,/\\]/g })
}

export const getNotionFilter = (filter: any): QueryDatabaseParameters['filter'] => {
  const defaultFilter = [
    {
      property: 'page',
      checkbox: {
        equals: false
      }
    }
  ]

  if (process.env.ENV_MODE === 'prod') {
    defaultFilter.push({
      property: 'published',
      checkbox: {
        equals: true
      }
    })
  }

  if (!filter) {
    return { and: defaultFilter }
  }

  if (!filter?.and) {
    return {
      and: [...defaultFilter, filter]
    }
  }

  if (filter?.and) {
    return {
      and: [...defaultFilter, ...filter.and]
    }
  }
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
  const id = post?.id
  const title = properties?.title?.[0]?.[0]
  const drawTitle = properties?.title
  const slug = properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_SLUG_KEY}`]?.[0]?.[0]
  const permalink = getPermalink('note', slug)
  const createdDate =
    properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_CREATED_DATE}`]?.[0]?.[1]?.[0]?.[1]
      ?.start_date ?? new Date(post?.created_time).toISOString()
  const updatedDate =
    properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_FINAL_MODIFIED_KEY}`]?.[0]?.[1]?.[0]?.[1]
      ?.start_date ?? new Date(post?.last_edited_time).toISOString()
  const published =
    properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_PUBLISHED_KEY}`]?.[0]?.[0] === 'Yes'
  const page = properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_PAGE_KEY}`]?.[0]?.[0] === 'Yes'
  const draft = properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_DRAFT_KEY}`]?.[0]?.[0] === 'Yes'
  const icon = post.format?.page_icon
  const cover = post.format?.page_cover
  const verified =
    properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_VERIFIED_KEY}`]?.[0]?.[0] === 'Yes'
  const pinned = properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_PINNED_KEY}`]?.[0]?.[0] === 'Yes'
  const rawTags = properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_TAGS_KEY}`]?.[0]?.[0]
  const tags = rawTags ? rawTags.split(',').map(mapTag) : []
  return {
    id,
    drawTitle,
    title,
    slug,
    tags,
    permalink,
    updatedDate,
    createdDate,
    published,
    draft,
    page,
    icon,
    cover,
    verified,
    pinned
  }
}

export const getRichText = (richTextArr?: RichTextItemResponse[]): string => {
  return !richTextArr?.length ? '' : richTextArr.map(richText => richText.plain_text).join('')
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
