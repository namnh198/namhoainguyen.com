import { SearchResult } from '@notion-x/interface'
import { makeSlugText } from '@notion-x/lib/helpers'
import { searchNotion } from '@notion-x/lib/notion-api'

const UNOFFICIAL_NOTION_KEYS = {
  slug: process.env.NEXT_PUBLIC_ID_NOTE_SLUG_KEY as string,
  published: process.env.NEXT_PUBLIC_ID_NOTE_PUBLISHED_KEY as string,
  title: 'title',
  boldSearchKey: `<${process.env.SEARCH_BOLD_KEY}>`,
  boldSearchKeyClose: `</${process.env.SEARCH_BOLD_KEY}>`
}

const defaultPostTitle = 'Untitled'

// Allow CORS for OPTIONS request
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}

export async function POST(request: Request) {
  const searchParams = await request.json()

  const results = await searchNotion(searchParams, process.env.NOTION_DB_NOTES as string)
  const postResults = parseSearchResults(results)

  return new Response(JSON.stringify(postResults), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * We convert the format of search results got from /api/search-notion to the format we want
 * Note that: /api/search-notion uses an unofficial notion api, so the format is a little bit different
 */
function parseSearchResults(data: any): SearchResult[] {
  let results = [] as SearchResult[]
  if (!data || !data.results || data.results.length === 0) results = []
  else {
    for (const result of data.results) {
      const postId = result.id
      const _properties = data.recordMap?.block?.[postId]?.value?.properties
      const isPostPublished = _properties?.[UNOFFICIAL_NOTION_KEYS.published]?.[0]?.[0] === 'Yes'
      const _title = _properties?.[UNOFFICIAL_NOTION_KEYS.title]?.[0]?.[0]
      const postTitle = _title || defaultPostTitle
      const _slug = _properties?.[UNOFFICIAL_NOTION_KEYS.slug]?.[0]?.[0] || null
      const postSlug = _slug || makeSlugText(_title || '')
      const postTitleHighlighted =
        result?.highlight?.title
          ?.replaceAll(
            UNOFFICIAL_NOTION_KEYS.boldSearchKey,
            '<span style="color: #000; font-weight: 600;">'
          )
          ?.replaceAll(UNOFFICIAL_NOTION_KEYS.boldSearchKeyClose, '</span>') || postTitle
      const postTextHighlighted =
        result.highlight?.text
          ?.replaceAll(
            UNOFFICIAL_NOTION_KEYS.boldSearchKey,
            '<span style="color: #000; font-weight: 600;">'
          )
          ?.replaceAll(UNOFFICIAL_NOTION_KEYS.boldSearchKeyClose, '</span>') || null

      if (process.env.ENV_MODE === 'prod' && !isPostPublished) continue

      results.push({
        id: postId,
        title: postTitle,
        slug: postSlug,
        isPublished: isPostPublished,
        titleHighlighted: postTitleHighlighted,
        textHighlighted: postTextHighlighted
      })
    }
  }
  return results
}
