/*
  taste-skill deal (software): palette blue-black-cornflower, type funnel, radius sharp; hero centred;
  nav-mega, footer-dark, close-type, buttons arrow; moment counter-rolls (the topics section's figures).
  Screens: hero 1 · notes 1 · topics 1 · about 1 · closing footer 1.
*/
import { useEffect, useRef } from "react";

import { IconNotes, IconPin, IconSearch } from "@tabler/icons-react";
import { env } from "cloudflare:workers";
import { Link } from "react-router";

import type { Route } from "./+types/home";

import { getPosts } from "~/lib/fetcher";
import { getMetaData } from "~/lib/get-meta-data";
import { getUri } from "~/lib/helpers";
import { formatDate } from "~/lib/notion/utils";
import { cn } from "~/lib/utils";
import { BOOKMARKS } from "~/data/bookmarks";
import { TAGS } from "~/data/tags";

import { buttonVariants } from "~/components/ui/button";

export const handle = { screens: true };

export async function loader({}: Route.LoaderArgs) {
  const posts = await getPosts(env);
  const counts = new Map<string, number>();
  for (const tag of posts.flatMap((post) => post.tags)) counts.set(tag.slug, (counts.get(tag.slug) ?? 0) + 1);
  const topics = TAGS.filter((tag) => counts.has(tag.slug))
    .map((tag) => ({ ...tag, count: counts.get(tag.slug)! }))
    .sort((a, b) => b.count - a.count);
  const recent = [...posts].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const bookmarks = new Set(BOOKMARKS.flatMap((group) => group.list.map((bookmark) => bookmark.url))).size;
  return { recent, topics, bookmarks };
}

export function meta({}: Route.MetaArgs) {
  return [
    ...getMetaData({ title: "Engineering notes on web and cloud", prefix: true }),
    { name: "page-type", content: "software" },
    { name: "site-kind", content: "software" },
  ];
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={cn(
        "size-3 fill-none stroke-current stroke-[1.5] transition-transform duration-150 [stroke-linecap:round] [stroke-linejoin:round] pointer-fine:group-hover/button:translate-x-[3px]",
        className,
      )}
    >
      <path d="M1 6h8" />
      <path d="M4.5 2.5 8 6l-3.5 3.5" />
    </svg>
  );
}

const h2 = "font-heading text-[30px] leading-[1.1] font-medium tracking-[-0.03em] lg:text-5xl";
const stat = "t-stat font-heading text-[28px] leading-none font-medium lg:text-[38px]";

export default function Home({ loaderData }: Route.ComponentProps) {
  const { recent, topics, bookmarks } = loaderData;
  const [latest, ...older] = recent;
  // the search window shows a real query: the busiest topic and the notes filed under it
  const search = {
    topic: topics[0]?.name,
    results: recent.filter((post) => post.tags.some((tag) => tag.slug === topics[0]?.slug)).slice(0, 5),
  };
  const figures = useRef<HTMLDivElement>(null);

  // counter-rolls (taste-skill moment): mounted after hydration, so its DOM rewrite never meets React's
  useEffect(() => {
    const el = figures.current;
    if (!el) return;
    // a runtime module script: the kit file lives in public/ and must not go through Vite's module graph
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `import("/assets/moments/moments.js").then((m) => m.mount(document.getElementById("${el.id}")))`;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <main id="content" tabIndex={-1} className="outline-none">
      <section className="hero screen-section pt-24 pb-6 sm:pb-16 lg:pt-30" data-enter aria-labelledby="hero-h">
        <div className="wrap container h-full">
          <div className="hero-text flex h-full flex-col">
            <div className="mx-auto grid max-w-[880px] justify-items-center gap-4 text-center">
              {latest && (
                <Link
                  to={getUri(latest.slug, "note")}
                  data-enter-step
                  className="inline-flex min-h-8 max-w-full items-center gap-2 text-sm"
                >
                  <span className="text-accent shrink-0 font-medium">New note</span>
                  <span className="nav-word truncate">{latest.title}</span>
                </Link>
              )}
              <h1
                id="hero-h"
                data-enter-step
                style={{ "--i": 1 } as React.CSSProperties}
                className="font-heading max-w-[16ch] text-[40px] leading-[1.02] font-medium tracking-[-0.04em] lg:text-[72px]"
              >
                Engineering notes on web and cloud
              </h1>
              <p
                data-enter-step
                style={{ "--i": 2 } as React.CSSProperties}
                className="hero__lead text-text-2 max-w-[52ch] text-lg lg:text-xl lg:leading-[30px]"
              >
                I&rsquo;m Nam, a full-stack engineer in Ho Chi Minh City. {recent.length} notes on React, Docker and
                Magento, with the code that worked.
              </p>
              <div
                data-enter-step
                style={{ "--i": 3 } as React.CSSProperties}
                className="mt-3 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
              >
                <Link to="/notes" className={cn(buttonVariants(), "w-full sm:w-auto")}>
                  Read the notes
                  <Arrow />
                </Link>
                <Link to="/tags" className={buttonVariants({ variant: "link" })}>
                  See all topics
                </Link>
              </div>
            </div>

            {latest && (
              <div
                data-visual
                className="hero__window border-border relative mt-8 min-h-60 flex-1 overflow-hidden rounded-lg border bg-[radial-gradient(80%_120%_at_50%_0%,color-mix(in_oklab,var(--accent)_22%,var(--bg-elevated)),var(--bg-card)_70%)] [mask-image:linear-gradient(#000_82%,transparent)] max-[359px]:hidden"
                role="img"
                aria-label={`The newest note, ${latest.title}, as it opens on this site`}
              >
                <div
                  data-enter-settle
                  aria-hidden="true"
                  className="bg-inv-bg text-inv-ink absolute top-4 left-4 max-h-[calc(100%-16px)] w-[calc(100%-32px)] overflow-hidden rounded-lg shadow-[0_24px_48px_rgb(0_0_0/0.35)] lg:top-8 lg:left-1/2 lg:w-[min(880px,calc(100%-64px))] lg:-translate-x-1/2"
                >
                  <div className="border-inv-ink/10 flex min-h-10 items-center gap-3 border-b px-4 py-2 font-mono text-xs">
                    <span className="flex gap-1.5">
                      <i className="bg-inv-ink/20 size-2.5 rounded-full" />
                      <i className="bg-inv-ink/20 size-2.5 rounded-full" />
                      <i className="bg-inv-ink/20 size-2.5 rounded-full" />
                    </span>
                    <span className="text-inv-muted min-w-0 break-all">notes/{latest.slug}</span>
                  </div>
                  <div className="space-y-3 p-5 lg:p-8">
                    <div className="flex flex-wrap gap-1.5">
                      {latest.tags.map((tag) => (
                        <span key={tag.slug} className="bg-inv-surface rounded-sm px-2 py-0.5 font-mono text-xs">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <p className="font-heading text-2xl leading-tight font-medium tracking-[-0.02em] lg:text-[32px]">
                      {latest.title}
                    </p>
                    {latest.description && <p className="text-inv-muted line-clamp-2">{latest.description}</p>}
                    <p className="text-inv-muted font-mono text-xs">
                      Created {formatDate(latest.createdAt)} · updated {formatDate(latest.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="notes" className="screen-section" aria-labelledby="notes-h">
        <div className="wrap container">
          <h2 id="notes-h" className={h2}>
            Latest notes. <span className="text-text-2">Newest first.</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <ul className="lg:col-span-6">
              {older.slice(0, 6).map((post, i) => (
                <li key={post.id} className={cn("border-b", i > 3 && "max-sm:hidden")}>
                  <Link to={getUri(post.slug, "note")} className="flex min-h-16 items-center gap-4 py-3">
                    <span className="flex flex-1 items-center gap-2 text-base font-medium lg:text-lg">
                      <span className="nav-word">{post.title}</span>
                      {post.pinned && <IconPin aria-label="Pinned" className="text-text-2 size-4 shrink-0" />}
                    </span>
                    <span className="text-text-2 hidden shrink-0 font-mono text-[13px] sm:block">
                      {formatDate(post.createdAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {search.topic && (
              <div
                data-visual
                role="img"
                aria-label={`The ⌘K search on this site, filtered to ${search.topic}, listing ${search.results.length} notes`}
                className="frame bg-bg-elevated rounded-lg border p-4 sm:p-6 lg:col-span-6 lg:col-start-7"
              >
                <div aria-hidden="true" className="bg-inv-bg text-inv-ink overflow-hidden rounded-lg">
                  <div className="border-inv-ink/10 flex h-12 items-center gap-3 border-b px-4">
                    <IconSearch className="text-inv-muted size-4" />
                    <span className="flex-1 font-medium">{search.topic}</span>
                    <span className="text-inv-muted rounded-sm border border-current/30 px-1 font-mono text-xs">
                      ⌘K
                    </span>
                  </div>
                  <ul className="p-1.5">
                    {search.results.map((post, i) => (
                      <li
                        key={post.id}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2.5",
                          i === 0 && "bg-inv-surface",
                          i > 2 && "max-sm:hidden",
                        )}
                      >
                        <IconNotes className="text-inv-muted size-4 shrink-0" />
                        <span className="min-w-0 flex-1 text-sm font-medium">{post.title}</span>
                        <span className="text-inv-muted hidden font-mono text-xs sm:inline">
                          {formatDate(post.createdAt)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="topics" className="screen-section bg-bg-card" aria-labelledby="topics-h">
        <div className="wrap container">
          <h2 id="topics-h" className={h2}>
            Topics I write about
          </h2>
          <p className="text-text-2 mt-4 max-w-[52ch]">
            Each note is filed under one or more topics. These eight hold the most.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
            {topics.slice(0, 8).map((tag, i) => (
              <li key={tag.slug} className={cn(i > 3 && "max-sm:hidden")}>
                <Link
                  to={getUri(tag.slug, "tag")}
                  className="card bg-bg border-border hover:border-border-bright flex h-full flex-col items-start gap-4 rounded-lg border p-4 transition-[transform,border-color] duration-150 sm:gap-6 sm:p-6 pointer-fine:hover:-translate-y-0.5"
                >
                  {tag.icon && (
                    <img
                      src={tag.icon}
                      alt=""
                      width={24}
                      height={24}
                      loading="lazy"
                      className="size-6 object-contain"
                    />
                  )}
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate font-medium">{tag.name}</span>
                    <span className="text-text-2 font-mono text-[13px]">
                      {tag.count} {tag.count === 1 ? "note" : "notes"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div
            ref={figures}
            id="home-figures"
            data-moment="counter-rolls"
            className="mt-10 grid gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-6"
          >
            <div>
              <p className={stat}>{recent.length}</p>
              <p className="text-text-2 mt-2 text-sm">notes written so far</p>
            </div>
            <div>
              <p className={stat}>{topics.length}</p>
              <p className="text-text-2 mt-2 text-sm">topics the notes are filed under</p>
            </div>
            <div>
              <p className={stat}>{bookmarks}</p>
              <p className="text-text-2 mt-2 text-sm">links kept on the bookmarks page</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="screen-section" aria-labelledby="about-h">
        <div className="wrap container grid h-full items-start gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="space-y-6 lg:col-span-5">
            <h2 id="about-h" className={h2}>
              Written by Nam Hoai Nguyen
            </h2>
            <p className="text-text-2 text-lg">
              I&rsquo;m a senior full-stack engineer with a focus on web design and cloud services. These are the notes
              I made each time I worked something out.
            </p>
            <Link to="/about" className={cn(buttonVariants({ variant: "link" }), "px-0")}>
              Read about me
            </Link>
          </div>
          <div className="border-border bg-bg-card aspect-[4/3] overflow-hidden rounded-lg border lg:col-span-6 lg:col-start-7 lg:aspect-square lg:max-h-full">
            <img
              alt="Illustration of Nam at his desk, coding on a laptop surrounded by the logos of his tools"
              className="size-full object-cover"
              srcSet="https://res.cloudinary.com/dabgirqbj/image/upload/w_660,h_667,f_auto,c_lfill/v1788027211/nhn.com/developer-hero_ohunzu.webp 660w,https://res.cloudinary.com/dabgirqbj/image/upload/w_1320,h_1334,f_auto,c_lfill/v1788027211/nhn.com/developer-hero_ohunzu.webp 1320w"
              sizes="(min-width: 1024px) 628px, 100vw"
              src="https://res.cloudinary.com/dabgirqbj/image/upload/w_660,h_667,f_auto,c_lfill/v1788027211/nhn.com/developer-hero_ohunzu.webp"
              width="660"
              height="667"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
