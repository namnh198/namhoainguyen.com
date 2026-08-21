import { MENU } from "~/data/menu";
import type { Route } from "./+types/sitemap";
import { getPosts } from "~/lib/fetcher";
import { env } from "cloudflare:workers";
import { getUri } from "~/lib/helpers";

interface SitemapUrl {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export async function loader({ url }: Route.LoaderArgs) {
  const baseUrl = url.origin;
  const siteMapUrls: SitemapUrl[] = MENU.map((menu) => ({
    path: menu.href,
    changefreq: "monthly",
    priority: 1.0,
  }));
  const posts = await getPosts(env);
  const allTags = posts.flatMap((post) => post.tags);
  const tags = [...new Map(allTags.map((tag) => [tag.slug, tag])).values()];

  tags.forEach((tag) => {
    siteMapUrls.push({
      path: getUri(tag.slug, "tag"),
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  posts.forEach((post) => {
    siteMapUrls.push({
      path: getUri(post.slug, "note"),
      changefreq: "daily",
      priority: 0.7,
    });
  });

  const sitemapXml = generateSitemap(baseUrl, siteMapUrls);

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Cloudflare-CDN-Cache-Control": "public, max-age=86400",
    },
  });
}

function generateSitemap(baseUrl: string, urls: SitemapUrl[]): string {
  const entries = urls
    .map((url) => {
      const location = escapeXml(`${baseUrl}${url.path}`);
      const values = ["  <url>", `    <loc>${location}</loc>`];
      if (url.lastmod) {
        values.push(`    <lastmod>${escapeXml(url.lastmod)}</lastmod>`);
      }
      if (url.changefreq) {
        values.push(`    <changefreq>${url.changefreq}</changefreq>`);
      }
      if (url.priority !== undefined) {
        values.push(`    <priority>${url.priority.toFixed(1)}</priority>`);
      }
      values.push("  </url>");
      return values.join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</urlset>",
    "",
  ].join("\n");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
