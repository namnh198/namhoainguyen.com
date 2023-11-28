import type { NotionSorts } from '@notion-x/interface'
import {
  QueryDatabaseParameters,
  QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints'
import { get } from 'lodash'
import { NotionAPI } from 'notion-client'
import { CollectionInstance } from 'notion-types'
import pMemoize from 'p-memoize'

export const notionMaxRequest = 100

export const getPage = async (id: string) => {
  const api = new NotionAPI({
    authToken: process.env.NOTION_TOKEN_V2,
    activeUser: process.env.NOTION_ACTIVE_USER
  })

  return await api.getPage(id)
}

export const getUnofficalDBImpl = async ({
  sourceId,
  collectionViewId,
  filter = [],
  searchQuery = '',
  limit = 50,
  sorts = []
}: {
  sourceId?: string
  collectionViewId?: string
  filter?: Array<any>
  searchQuery?: string
  limit?: number
  sorts?: NotionSorts[]
}): Promise<CollectionInstance> => {
  if (!sourceId || !collectionViewId) {
    throw new Error('Notion spaceId, sourceId, collectionViewId are required')
  }

  if (!process.env.NOTION_TOKEN_V2 || !process.env.NOTION_ACTIVE_USER) {
    throw new Error('Missing notion configuration: TOKEN_V2 or ACTIVE_USER')
  }

  const api = new NotionAPI({
    authToken: process.env.NOTION_TOKEN_V2,
    activeUser: process.env.NOTION_ACTIVE_USER
  })

  const collectionView: any = {
    query2: {
      sort: sorts,
      filter: {
        filters: filter
      }
    }
  }

  return await api.getCollectionData(sourceId, collectionViewId, collectionView, {
    searchQuery,
    limit
  })
}

export const getUnofficalDB = pMemoize(getUnofficalDBImpl, {
  cacheKey: (...args) => JSON.stringify(args)
})

export const queryDbImpl = async ({
  dbId,
  filter,
  startCursor,
  pageSize,
  sorts
}: {
  dbId: string
  filter?: QueryDatabaseParameters['filter']
  startCursor?: string
  pageSize?: number
  sorts?: NotionSorts[]
}): Promise<QueryDatabaseResponse> => {
  try {
    const url = `https://api.notion.com/v1/databases/${dbId}/query`
    const payload = {
      filter,
      sorts,
      start_cursor: startCursor,
      page_size: pageSize
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Notion-Version': process.env.NOTION_VERSION as string,
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`
      },
      body: JSON.stringify(payload)
    })
    let data = await res.json()
    let children = data?.results as QueryDatabaseResponse['results']
    if (
      data &&
      data['has_more'] &&
      data['next_cursor'] &&
      pageSize &&
      pageSize >= notionMaxRequest
    ) {
      while (data!['has_more']) {
        const nextCursor = data!['next_cursor']
        data = await queryDbImpl({
          dbId,
          filter,
          startCursor: nextCursor!,
          pageSize,
          sorts
        })
        if (get(data, 'results')) {
          const lst = data['results'] as any[]
          children = [...children, ...lst]
        }
      }
    }
    return { results: children } as QueryDatabaseResponse
  } catch (error: any) {
    const retryAfter = error?.response?.headers['retry-after'] || error['retry-after']
    if (retryAfter || error?.status === 502) {
      console.error(`Retrying after ${retryAfter} seconds`)
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000 + 500))
      return await queryDbImpl({ dbId, filter, startCursor, pageSize, sorts })
    }
    console.error(error)
    return { results: [] } as any
  }
}

export const queryDb = pMemoize(queryDbImpl, {
  cacheKey: (...args) => JSON.stringify(args)
})
