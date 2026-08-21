import type { Route } from "./+types/home";
import { getMetaData } from "~/lib/get-meta-data";
import { getPosts } from "~/lib/fetcher";
import { env } from "cloudflare:workers";
import { PostList } from "~/components/elements/post-list";
import { SectionHeading } from "~/components/layouts/section-heading";
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
import { BOOKMARKS } from "~/data/bookmarks";
import { BookmarkList } from "~/components/elements/bookmarks-list";
import { AnimatedSkills } from "~/components/ui/animated-skills";
import { TagsGrid } from "~/components/elements/tags-grid";
import { Link } from "react-router";
import { LazyImage } from "~/components/ui/lazy-image";

export async function loader({}: Route.LoaderArgs) {
  const posts = await getPosts(env);
  const allTags = posts.flatMap((post) => post.tags);
  const tags = [...new Map(allTags.map((tag) => [tag.slug, tag])).values()];
  const allBookmarks = BOOKMARKS.flatMap((bookmark) => bookmark.list);
  const bookmarks = [...new Map(allBookmarks.map((bookmark) => [bookmark.url, bookmark])).values()];
  return { posts, tags, bookmarks, notionDomain: env.NOTION_SITE_DOMAIN };
}

export function meta({}: Route.MetaArgs) {
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
      <section className="relative overflow-hidden pt-10 sm:pt-13 md:pt-17 lg:pt-25 pb-11 md:pb-13 lg:pb-23">
        <div className="cursor-none absolute inset-0 bg-size-[48px_48px] bg-[linear-gradient(#4f80ff08_1px,#0000_1px),linear-gradient(90deg,#4f80ff08_1px,#0000_1px)] mask-[radial-gradient(80%_60%_at_50%_0,#000_40%,#0000_100%)]" />
        <div className="cursor-none absolute -top-50 left-1/2 -translate-1/2 rounded-full size-150 bg-[radial-gradient(circle,#4f80ff26_0%,#0000_70%)]" />
        <div className="cursor-none absolute -top-25 -right-25 rounded-full size-125 bg-[radial-gradient(circle,#4f80ff26_0%,#0000_70%)]" />
        <div className="container">
          <div className="relative flex flex-col lg:flex-row items-center text-center lg:text-left justify-between gap-12">
            <div className="flex-[0_0_100%] lg:flex-[0_560px]">
              <div className="relative font-mono tracking-[.12rem] inline-flex items-center gap-2.5 mb-6 text-xs text-text-3">
                <span className="w-[2.35rem] h-px shadow-[0_0_18px_#4f80ffa6] bg-linear-[90deg,var(--accent),var(--accent-2)]" />
                <span>Software Engineer</span>
              </div>
              <h1 className="relative grid leading-none w-fit font-heading uppercase mx-auto lg:mx-0 mb-6">
                <span className="blur-[18px] absolute inset-[-.45rem_-1rem_-.25rem_-.7rem] opacity-90 -z-1 bg-[radial-gradient(circle_at_24%_18%,#4f80ff52,#0000_34%),radial-gradient(circle_at_74%_68%,#9b6dff47,#0000_36%),linear-gradient(120deg,#4f80ff29,#9b6dff1f,#0000_74%)]" />
                <span className="text-transparent bg-clip-text text-shadow-[0_0_34px_#4f80ff2e] bg-linear-[15deg,#f4f7ff_0%,#82a5ff_28%,#9b6dff_58%,#f4f7ff_100%] bg-size-[220%_100%] font-extrabold text-[3.25rem] lg:text-[5.7rem]">
                  Nam Hoai
                </span>
                <span className="text-transparent bg-clip-text text-shadow-[0_0_24px_#9b6dff42,0_0_42px_#4f80ff1fv] bg-linear-[115deg,#8fb0ff_0%,#d5c8ff_24%,#9b6dff_52%,#4f80ff_82%,#f4f7ff_100%] bg-size-[240%_100%] font-extrabold text-[3.05rem] lg:text-[5.35rem]">
                  Nguyen
                </span>
              </h1>
              <p className="relative max-w-135 text-text-2 mb-9 text-sm sm:text-[1.12rem] sm:leading-7">
                I'm a senior full-stack engineer based in Ho Chi Minh City, Viet Nam with a focus on Web Design and
                Cloud Services. On this site, You can find the notes that I made when I discovered something.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/notes"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6.5 text-sm bg-linear-(--btn-gradient) font-medium transition-all rounded-lg shadow-[0_2px_12px_#4f80ff4d] hover:shadow-[0_4px_20px_#4f80ff66] hover:-translate-y-px w-full xs:w-auto"
                >
                  Open Lab Notes
                  <IconArrowRight width={20} height={20} />
                </Link>
                <a
                  href="https://github.com/namnh198"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6.5 text-sm rounded-lg transition-all border text-text hover:bg-accent-glow hover:text-accent hover:border-accent w-full xs:w-auto"
                >
                  <IconBrandGithub width={20} height={20} />
                  View on Github
                </a>
              </div>
              <div className="flex flex-wrap gap-5 items-center justify-center lg:justify-start mt-8">
                <a
                  href="https://www.linkedin.com/in/namnh198/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 p-[.45rem_1rem] rounded-full border backdrop-blur-lg text-xs transition-colors hover:border-border-bright hover:bg-bg-elevated"
                >
                  <IconBrandLinkedin width={16} height={16} className="stroke-accent" />
                  <span className="text-accent">LinkedIn</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/namnh198/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 p-[.45rem_1rem] rounded-full border backdrop-blur-lg text-xs transition-colors hover:border-border-bright hover:bg-bg-elevated"
                >
                  <IconBrandFacebook width={16} height={16} className="stroke-success" />
                  <span className="text-success">Facebook</span>
                </a>
                <a
                  href="mailto:me@namhoainguyen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 p-[.45rem_1rem] rounded-full border backdrop-blur-lg text-xs transition-colors hover:border-border-bright hover:bg-bg-elevated"
                >
                  <IconAddressBook width={16} height={16} className="stroke-accent-2" />
                  <span className="text-accent-2">Contact Me</span>
                </a>
              </div>
            </div>
            <div className="w-full lg:w-110 flex items-center justify-center lg:justify-end">
              <div className="relative">
                <LazyImage
                  // src="/developer-hero.webp"
                  src="https://res.cloudinary.com/dabgirqbj/image/upload/v1787321667/nhn.com/developer-hero_yyj114.webp"
                  alt="Developer Hero Banner"
                  width={440}
                  height={660}
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
