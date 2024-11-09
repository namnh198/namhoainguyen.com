import type { APIRoute } from 'astro';
import { getPosts, getTags } from '@/lib/note.ts';

const getSiteMapItem = ({
  loc,
  lastMod,
  freq = 'daily',
  priority = 0.7
}: {
  loc?: string;
  lastMod?: Date;
  freq?: string;
  priority?: number;
}) => {
  return `
   <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod ? lastMod.toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>
  `;
};

const getSitemap = async (site: URL | undefined) => {
  const posts = await getPosts();
  const tags = await getTags();

  return `  
    <?xml version="1.0" encoding="UTF-8"?>  
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">  
      ${getSiteMapItem({ loc: site?.toString() })}
      ${getSiteMapItem({ loc: `${site}/tags/` })}
      ${getSiteMapItem({ loc: `${site}/notes/` })}
      ${getSiteMapItem({ loc: `${site}/bookmarks/` })}
      ${getSiteMapItem({ loc: `${site}/support-me/` })}
      ${getSiteMapItem({ loc: `${site}/privacy/` })}
      ${tags
        .map(tag => {
          const loc = `${site}tags/${tag.slug}/`;
          return getSiteMapItem({ loc });
        })
        .join('\n')}
      ${posts
        .map(post => {
          const loc = `${site}notes/${post.slug}/`;
          const lastMod = post.updateDate;
          return getSiteMapItem({ loc, lastMod });
        })
        .join('\n')}  
    </urlset>  
  `.trim();
};

export const GET: APIRoute = async ({ site }) => {
  return new Response(await getSitemap(site), {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
