import {
  IconAddressBook,
  IconArrowRight,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCode,
  IconLink,
  IconNotes,
  IconTags,
} from "@tabler/icons-react";
import { env } from "cloudflare:workers";
import { Link } from "react-router";

import type { Route } from "./+types/home";

import { getPosts } from "~/lib/fetcher";
import { getMetaData } from "~/lib/get-meta-data";
import { BOOKMARKS } from "~/data/bookmarks";

import { AnimatedSkills } from "~/components/ui/animated-skills";
import { LazyImage } from "~/components/ui/lazy-image";
import { BookmarkList } from "~/components/elements/bookmarks-list";
import { PostList } from "~/components/elements/post-list";
import { TagsGrid } from "~/components/elements/tags-grid";
import { SectionHeading } from "~/components/layouts/section-heading";

export async function loader({}: Route.LoaderArgs) {
  const posts = await getPosts(env);
  const allTags = posts.flatMap((post) => post.tags);
  const tags = [...new Map(allTags.map((tag) => [tag.slug, tag])).values()];
  const allBookmarks = BOOKMARKS.flatMap((bookmark) => bookmark.list);
  const bookmarks = [...new Map(allBookmarks.map((bookmark) => [bookmark.url, bookmark])).values()];
  return { posts, tags, bookmarks, notionDomain: env.NOTION_SITE_DOMAIN };
}

export function meta({ location }: Route.MetaArgs) {
  return getMetaData({
    title: "Hi! I'm Nam",
    prefix: false,
  });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, tags, bookmarks, notionDomain } = loaderData;
  const pinnedTag = tags.filter((tag) => tag.pinned);

  return (
    <main className="min-h-dvh">
      <section className="relative overflow-hidden pt-10 pb-11 sm:pt-13 md:pt-17 md:pb-13 lg:pt-25 lg:pb-23">
        <div className="absolute inset-0 cursor-none bg-[linear-gradient(#4f80ff08_1px,#0000_1px),linear-gradient(90deg,#4f80ff08_1px,#0000_1px)] mask-[radial-gradient(80%_60%_at_50%_0,#000_40%,#0000_100%)] bg-size-[48px_48px]" />
        <div className="absolute -top-50 left-1/2 size-150 -translate-1/2 cursor-none rounded-full bg-[radial-gradient(circle,#4f80ff26_0%,#0000_70%)]" />
        <div className="absolute -top-25 -right-25 size-125 cursor-none rounded-full bg-[radial-gradient(circle,#4f80ff26_0%,#0000_70%)]" />
        <div className="container">
          <div className="relative flex flex-col items-center justify-between gap-12 text-center lg:flex-row lg:text-left">
            <div className="flex-[0_0_100%] lg:flex-[0_560px]">
              <div className="text-text-3 relative mb-6 inline-flex items-center gap-2.5 font-mono text-xs tracking-[.12rem]">
                <span className="h-px w-[2.35rem] bg-linear-[90deg,var(--accent),var(--accent-2)] shadow-[0_0_18px_#4f80ffa6]" />
                <span>Software Engineer</span>
              </div>
              <h1 className="font-heading relative mx-auto mb-6 grid w-fit leading-none uppercase lg:mx-0">
                <span className="absolute inset-[-.45rem_-1rem_-.25rem_-.7rem] -z-1 bg-[radial-gradient(circle_at_24%_18%,#4f80ff52,#0000_34%),radial-gradient(circle_at_74%_68%,#9b6dff47,#0000_36%),linear-gradient(120deg,#4f80ff29,#9b6dff1f,#0000_74%)] opacity-90 blur-[18px]" />
                <span className="bg-linear-[15deg,#f4f7ff_0%,#82a5ff_28%,#9b6dff_58%,#f4f7ff_100%] bg-size-[220%_100%] bg-clip-text text-[3.25rem] font-extrabold text-transparent text-shadow-[0_0_34px_#4f80ff2e] lg:text-[5.7rem]">
                  Nam Hoai
                </span>
                <span className="bg-linear-[115deg,#8fb0ff_0%,#d5c8ff_24%,#9b6dff_52%,#4f80ff_82%,#f4f7ff_100%] bg-size-[240%_100%] bg-clip-text text-[3.05rem] font-extrabold text-transparent text-shadow-[0_0_24px_#9b6dff42,0_0_42px_#4f80ff1fv] lg:text-[5.35rem]">
                  Nguyen
                </span>
              </h1>
              <p className="text-text-2 relative mb-9 max-w-135 text-sm sm:text-[1.12rem] sm:leading-7">
                I'm a senior full-stack engineer based in Ho Chi Minh City, Viet Nam with a focus on Web Design and
                Cloud Services. On this site, You can find the notes that I made when I discovered something.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/notes"
                  className="xs:w-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-(--btn-gradient) px-6.5 py-3 text-sm font-medium shadow-[0_2px_12px_#4f80ff4d] transition-all hover:-translate-y-px hover:shadow-[0_4px_20px_#4f80ff66]"
                  aria-label="Open Lab Notes"
                >
                  Open Lab Notes
                  <IconArrowRight width={20} height={20} />
                </Link>
                <a
                  href="https://github.com/namnh198"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text hover:bg-accent-glow hover:text-accent hover:border-accent xs:w-auto inline-flex w-full items-center justify-center gap-2 rounded-lg border px-6.5 py-3 text-sm transition-all"
                  aria-label="View on github"
                >
                  <IconBrandGithub width={20} height={20} />
                  View on Github
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5 lg:justify-start">
                <a
                  href="https://www.linkedin.com/in/namnh198/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:border-border-bright hover:bg-bg-elevated inline-flex items-center justify-center gap-2 rounded-full border p-[.45rem_1rem] text-xs backdrop-blur-lg transition-colors"
                  aria-label="View on linkedin"
                >
                  <IconBrandLinkedin width={16} height={16} className="stroke-accent" />
                  <span className="text-accent">LinkedIn</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/namnh198/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:border-border-bright hover:bg-bg-elevated inline-flex items-center justify-center gap-2 rounded-full border p-[.45rem_1rem] text-xs backdrop-blur-lg transition-colors"
                  aria-label="View on facebook"
                >
                  <IconBrandFacebook width={16} height={16} className="stroke-success" />
                  <span className="text-success">Facebook</span>
                </a>
                <a
                  href="mailto:me@namhoainguyen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:border-border-bright hover:bg-bg-elevated inline-flex items-center justify-center gap-2 rounded-full border p-[.45rem_1rem] text-xs backdrop-blur-lg transition-colors"
                  aria-label="Contact me"
                >
                  <IconAddressBook width={16} height={16} className="stroke-accent-2" />
                  <span className="text-accent-2">Contact Me</span>
                </a>
              </div>
            </div>
            <div className="flex w-full items-center justify-center lg:w-110 lg:justify-end xl:w-150">
              <div className="relative">
                <LazyImage
                  src="https://res.cloudinary.com/dabgirqbj/image/upload/v1788027211/nhn.com/developer-hero_ohunzu.webp"
                  alt="Developer Hero Banner"
                  width={660}
                  height={667}
                  layout="fixed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="container space-y-8">
          <SectionHeading title="Latest Notes" icon={<IconNotes width={20} height={20} />} viewAll="/notes" />
          <PostList posts={posts.slice(0, 15)} />
        </div>
      </section>
      <section className="py-8">
        <div className="container space-y-8">
          <SectionHeading title="Bookmarks" icon={<IconLink width={20} height={20} />} viewAll="/bookmarks" />
          <BookmarkList bookmarks={bookmarks.slice(0, 6)} />
        </div>
      </section>
      <section className="py-8">
        <div className="container space-y-8">
          <SectionHeading title="Tech Stacks" icon={<IconCode width={20} height={20} />} />
          <AnimatedSkills />
        </div>
      </section>
      <section className="py-8">
        <div className="container space-y-8">
          <SectionHeading title="Main Topics" icon={<IconTags width={20} height={20} />} viewAll="/tags" />
          <TagsGrid tags={pinnedTag} posts={posts} notionDomain={notionDomain} />
        </div>
      </section>
    </main>
  );
}
