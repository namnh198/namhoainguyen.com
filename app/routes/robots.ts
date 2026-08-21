import type { Route } from "./+types/robots";

export function loader({ url }: Route.LoaderArgs): Response {
  const robots = [];
  console.log(url);
  if (import.meta.env.DEV) {
    robots.push("User-agent: *");
    robots.push("Disallow: /");
  } else {
    robots.push("User-agent: *");
    robots.push("Allow: /");
    robots.push("Disallow: /api/search-notion");
    robots.push("");
    robots.push(`Sitemap: ${url.origin}/sitemap.xml`);
  }

  return new Response(robots.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Cloudflare-CDN-Cache-Control": "public, max-age=86400",
    },
  });
}
