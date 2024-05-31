import type { MetadataRoute } from 'next'

import { navItems } from '@/lib/config'
import { getTopics, getUnofficalPosts } from '@/lib/notion'
import { getPermalink } from '@/lib/utils'

const URL = 'https://www.namhoainguyen.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemaps: MetadataRoute.Sitemap = []
  navItems.map((nav) => {
    sitemaps.push({
      url: URL + nav.url,
      lastModified: new Date(),
      changeFrequency: nav.freq,
      priority: 0.5
    })
  })

  // tags sitemaps
  const tags = await getTopics()
  tags.map((tag) => {
    sitemaps.push({
      url: URL + getPermalink('tag', tag.slug),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    })
  })

  // posts sitemap
  const posts = await getUnofficalPosts()
  posts.map((post) => {
    sitemaps.push({
      url: URL + getPermalink('note', post.slug),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7
    })
  })

  sitemaps.push({
    url: URL + '/support-me',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.7
  })

  return sitemaps
}
