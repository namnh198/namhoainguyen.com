import { defaultPostDate } from '@/lib/config'
import type { Project, Tool } from '@/types'
import type { NotionPostData, NotionSorts, NotionTagData } from '@notion-x/interface'

import type { Post, Tag } from '@notion-x/interface'
import { defaultMapImageUrl } from '@notion-x/lib/map-image-url'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { get } from 'lodash'
import { CollectionInstance } from 'notion-types'
import { getUnofficalDB, queryDb } from './notion'
import {
  getNotionFilter,
  getPermalink,
  getPostProperties,
  getRichText,
  getUnOfficalNotionFilter,
  makeSlugByText,
  mapTag
} from './utils'

export const getPosts = async ({
  filter,
  startCursor,
  pageSize,
  sorts
}: {
  filter?: QueryDatabaseParameters['filter']
  startCursor?: string
  pageSize?: number
  sorts?: NotionSorts[]
} = {}): Promise<Post[]> => {
  if (!process.env.NOTION_DB_NOTES) {
    throw new Error('NOTION_DB_POSTS is not defined')
  }
  try {
    const defaultSort = {
      property: 'finalModified',
      direction: 'descending'
    } as NotionSorts
    const sortToUse = (sorts?.length ? sorts.push(defaultSort) : [defaultSort]) as NotionSorts[]
    const filterToUse: QueryDatabaseParameters['filter'] = getNotionFilter(filter)

    const data = await queryDb({
      dbId: process.env.NOTION_DB_NOTES as string,
      filter: filterToUse,
      startCursor,
      pageSize,
      sorts: sortToUse
    })

    return await tranformNotionPost({ data: data?.results as any[] })
  } catch (error) {
    console.error(`Error in getPosts(): ${error}`)
    return []
  }
}

export const getTotalPosts = async (tag?: Tag) => {
  try {
    const tagFilter = tag
      ? {
          property: process.env.NEXT_PUBLIC_ID_NOTE_TAGS_KEY,
          filter: {
            operator: 'enum_contains',
            value: {
              type: 'exact',
              value: tag.name
            }
          }
        }
      : null
    const filterToUse = getUnOfficalNotionFilter(tagFilter)
    const data = await getUnofficalDB({
      sourceId: process.env.NOTE_SOURCE_ID as string,
      collectionViewId: process.env.NOTE_COLLECTION_VIEW_ID as string,
      filter: filterToUse
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return data?.result?.reducerResults?.collection_group_results?.blockIds.length ?? 0
  } catch (error) {
    console.error(error)
    return 0
  }
}

export const getUnofficalPosts = async ({
  filter,
  limit,
  sorts,
  fulldata = false
}: {
  filter?: any
  limit?: number
  sorts?: NotionSorts[]
  fulldata?: boolean
} = {}): Promise<Post[]> => {
  try {
    const defaultSort = {
      property: process.env.NEXT_PUBLIC_ID_NOTE_FINAL_MODIFIED_KEY,
      direction: 'descending'
    } as NotionSorts
    const sortToUse = (sorts?.length ? sorts.push(defaultSort) : [defaultSort]) as NotionSorts[]
    const filterToUse: any = getUnOfficalNotionFilter(filter)

    const data = await getUnofficalDB({
      sourceId: process.env.NOTE_SOURCE_ID as string,
      collectionViewId: process.env.NOTE_COLLECTION_VIEW_ID as string,
      filter: filterToUse,
      limit,
      sorts: sortToUse
    })
    return transformUnofficalPosts(data, fulldata)
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getUnofficalPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const allPosts = await getUnofficalPosts()
  return allPosts.find(post => post?.slug === slug)
}

export const getUnofficalPostByTag = async (tag: string) => {
  const limit = (process.env.NEXT_PUBLIC_ID_NOTE_PER_PAGE || 8) as number
  return await getUnofficalPosts({
    filter: {
      property: process.env.NEXT_PUBLIC_ID_NOTE_TAGS_KEY,
      filter: {
        operator: 'enum_contains',
        value: {
          type: 'exact',
          value: tag
        }
      }
    },
    limit: limit
  })
}

export const transformUnofficalPosts = async (
  data: CollectionInstance,
  fulldata = false
): Promise<Post[]> => {
  const block = data?.recordMap?.block

  const blockIds: Array<string> = fulldata
    ? Object.keys(block)
    : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (data?.result?.reducerResults?.collection_group_results?.blockIds as string[])
  const posts = blockIds.reduce<Post[]>((result: Post[], id: string) => {
    const post = block[id]
    const properties = post?.value?.properties
    const slug = properties?.[`${process.env.NEXT_PUBLIC_ID_NOTE_SLUG_KEY}`]?.[0]?.[0]
    if (!slug) {
      return result
    }
    return [...result, getPostProperties(post?.value)]
  }, [])

  return posts
}

const tranformNotionPost = async ({ data }: { data: NotionPostData[] }): Promise<Post[]> => {
  if (!data?.length) return []

  return Promise.all(
    data?.map(async (post: NotionPostData) => {
      const title = getRichText(get(post, 'properties.Name.title') as any) || 'Untitled'
      const updatedDate = new Date(
        get(
          post,
          'properties.finalModified.formula.date.start',
          get(post, 'last_edited_time', defaultPostDate)
        )
      ).toISOString()
      const createdDate = new Date(
        get(post, 'properties.createdDate.date.start', get(post, 'created_time', defaultPostDate))
      ).toISOString()
      const tags =
        post.properties?.tags?.multi_select?.map((tag: NotionTagData) => mapTag(tag)) || []
      const slug = get(post, 'properties.slug.rich_text[0].plain_text', '') || makeSlugByText(title)
      const draft = get(post, 'properties.draft.checkbox') || false
      const verified = get(post, 'properties.verified.checkbox') || false
      const pinned = get(post, 'properties.pinned.checkbox') || false
      return {
        id: get(post, 'id'),
        title,
        slug,
        permalink: getPermalink('note', slug),
        tags,
        draft,
        verified,
        pinned,
        updatedDate,
        createdDate
      }
    })
  )
}

export const getTopics = async (): Promise<Tag[]> => {
  try {
    const data = await getUnofficalDB({
      sourceId: process.env.TOPICS_SOURCE_ID,
      collectionViewId: process.env.TOPICS_COLLECTION_VIEW_ID,
      sorts: [
        {
          property: 'title',
          direction: 'ascending'
        }
      ]
    })
    return transformTopics(data)
  } catch (error) {
    console.error(error)
    return []
  }
}

const transformTopics = (data: CollectionInstance) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const blockIds = data?.result?.reducerResults?.collection_group_results?.blockIds as string[]
  const block = data?.recordMap?.block
  const topics = blockIds.reduce<Tag[]>((result, id) => {
    const topic = block[id]
    const properties = topic?.value?.properties
    if (!properties) return result
    const name = properties?.title?.[0]?.[0] ?? ''
    const slug = makeSlugByText(name)
    const icon = topic?.value?.format?.page_icon
    if (!icon) {
      return result
    }
    const customClass = properties?.[`${process.env.TOPICS_CUSTOM_CLASS_KEY}`]?.[0]?.[0]
    const description = properties?.[`${process.env.TOPICS_DESC_KEY}`]?.[0]?.[0]
    const pinned = properties?.[`${process.env.TOPICS_PINNED_KEY}`]?.[0]?.[0] === 'Yes'
    return [
      ...result,
      {
        id: slug,
        name,
        slug,
        permalink: getPermalink('tag', slug),
        customClass,
        icon: defaultMapImageUrl(icon, topic?.value) as string,
        description,
        pinned
      }
    ]
  }, [])

  return topics
}

export const getProjects = async (): Promise<Project[]> => {
  try {
    const data = await getUnofficalDB({
      sourceId: process.env.PROJECTS_SOURCE_ID,
      collectionViewId: process.env.PROJECTS_COLLECTION_VIEW_ID,
      sorts: [
        {
          property: process.env.PROJECTS_CREATED_AT_KEY as string,
          direction: 'descending'
        }
      ]
    })
    return transformProjects(data)
  } catch (error) {
    console.error(error)
    return []
  }
}

const transformProjects = (data: CollectionInstance): Project[] => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const blockIds = data?.result?.reducerResults?.collection_group_results?.blockIds as string[]
  const block = data?.recordMap?.block
  const projects = blockIds.reduce<Project[]>((result, id) => {
    const project = block[id]
    const properties = project?.value?.properties
    return [
      ...result,
      {
        id: id,
        title: properties?.title?.[0]?.[0] ?? '',
        permalink:
          properties?.[`${process.env.PROJECTS_URL_KEY}`]?.[0]?.[0] ??
          properties?.[`${process.env.PROJECTS_SOURCE_KEY}`]?.[0]?.[0],
        description: properties?.[`${process.env.PROJECTS_DESC_KEY}`]?.[0]?.[0],
        techs: properties?.[`${process.env.PROJECTS_TECHS_KEY}`]?.[0]?.[0]?.split(',')
      }
    ]
  }, [])

  return projects
}

export const getTools = async (): Promise<{ tools: Tool[]; tags: string[] }> => {
  try {
    const data = await getUnofficalDB({
      sourceId: process.env.TOOLS_SOURCE_ID,
      collectionViewId: process.env.TOOLS_COLLECTION_VIEW_ID,
      sorts: [
        {
          property: 'title',
          direction: 'descending'
        }
      ]
    })
    return {
      tools: transformTools(data),
      tags: getAllToolsTags(data)
    }
  } catch (error) {
    console.error(error)
    return { tools: [], tags: [] }
  }
}

const transformTools = (data: CollectionInstance): Tool[] => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const blockIds = data?.result?.reducerResults?.collection_group_results?.blockIds as string[]
  const block = data?.recordMap?.block
  const tools = blockIds.reduce<Tool[]>((result, id) => {
    const tool = block[id]
    const properties = tool?.value?.properties
    const icon = defaultMapImageUrl(tool?.value?.format?.page_icon, tool?.value)
    if (!icon) {
      return result
    }
    const tags = properties?.[`${process.env.TOOLS_TAGS_KEY}`]?.[0]?.[0]?.split(',') as
      | string[]
      | undefined

    return [
      ...result,
      {
        id: id,
        title: properties?.title?.[0]?.[0] ?? '',
        icon,
        url: properties?.[`${process.env.TOOLS_URL_KEY}`]?.[0]?.[0],
        description: properties?.[`${process.env.TOOLS_DESC_KEY}`]?.[0]?.[0],
        tags,
        isFree: tags?.includes('free')
      }
    ]
  }, [])

  return tools
}

const getAllToolsTags = (data: CollectionInstance): string[] => {
  return (
    data?.recordMap?.collection?.[`${process.env.TOOLS_SOURCE_ID}`]?.value?.schema?.[
      `${process.env.TOOLS_TAG_KEY}`
    ]?.options?.map((option: any) => option.value) ?? []
  )
}
