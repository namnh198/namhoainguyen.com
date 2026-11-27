import { useEffect, useRef, useState } from "react";

import type { Tag } from "~/lib/types";
import type { loader as rootLoader } from "~/root";

import { IconChevronDown, IconMoon, IconPrompt, IconSun, IconTag } from "@tabler/icons-react";
import { Link, NavLink, useLocation, useRouteLoaderData } from "react-router";

import { getUri } from "~/lib/helpers";
import { MENU } from "~/data/menu";

import { SearchModal } from "./search-modal";
import { ToggleMenu } from "./toggle-menu";

const NAV = MENU.filter(({ href }) => href !== "/");

// Catppuccin Mocha (dark) / Latte (light); the head script in root.tsx sets the first value before paint
function ThemeToggle() {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch light or dark theme"
      className="text-text-2 hover:text-text hover:bg-secondary rounded-btn grid size-10 place-items-center transition-colors duration-150"
    >
      <IconSun aria-hidden="true" className="light:hidden size-5" />
      <IconMoon aria-hidden="true" className="light:block hidden size-5" />
    </button>
  );
}

function TopicsPanel({ topics }: { topics: Tag[] }) {
  return (
    <div className="bg-bg invisible absolute inset-x-0 top-full -translate-y-1.5 border-b opacity-0 transition-[opacity,transform,visibility] duration-[120ms] ease-out group-data-closed/topics:invisible! group-data-closed/topics:opacity-0! group-focus-within/topics:visible group-focus-within/topics:translate-y-0 group-focus-within/topics:opacity-100 group-hover/topics:visible group-hover/topics:translate-y-0 group-hover/topics:opacity-100 group-hover/topics:delay-150 group-hover/topics:duration-200 motion-reduce:translate-y-0">
      <div className="container grid grid-cols-12 gap-6 py-10">
        <div className="col-span-3 space-y-3">
          <p className="font-heading text-2xl">Topics</p>
          <p className="text-text-2">Every note is filed under one or more of these.</p>
          <Link viewTransition to="/tags" className="text-text inline-flex min-h-11 items-center">
            <span className="nav-word">All topics →</span>
          </Link>
        </div>
        <ul className="col-span-9 grid grid-cols-4 gap-x-6">
          {topics.map((tag) => (
            <li key={tag.slug}>
              <Link viewTransition to={getUri(tag.slug, "tag")} className="flex min-h-11 items-center gap-2.5">
                {tag.icon ? (
                  <img src={tag.icon} alt="" width={20} height={20} loading="lazy" className="size-5 object-contain" />
                ) : (
                  <IconTag aria-hidden="true" className="text-text-2 size-5" />
                )}
                <span className="nav-word">{tag.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const topics = useRouteLoaderData<typeof rootLoader>("root")?.topics ?? [];
  // the Topics panel opens on hover/focus in CSS; after a page change it stays shut until the pointer enters again or focus returns
  const [topicsClosed, setTopicsClosed] = useState(false);
  const { key } = useLocation();
  const lastKey = useRef(key);
  useEffect(() => {
    if (lastKey.current === key) return;
    lastKey.current = key;
    setMenuOpen(false);
    setTopicsClosed(true);
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.closest("header")) active.blur();
  }, [key]);

  return (
    <header className="nav [view-transition-name:site-header] bg-bg h-nav lg:h-nav-lg fixed inset-x-0 top-0 z-50 border-b">
      <a
        href="#content"
        className="bg-accent text-accent-ink rounded-btn sr-only z-60 px-4 py-3 font-medium focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <div className="wrap container flex h-full items-center justify-between gap-6">
        <NavLink viewTransition to="/" className="nav__logo flex shrink-0 items-center gap-2.5" aria-label="Nam Hoai Nguyen, home">
          <span className="bg-accent text-accent-ink inline-flex size-9 items-center justify-center rounded-md">
            <IconPrompt stroke={3} width={20} height={20} />
          </span>
          <span className="font-heading text-xl leading-none max-[359px]:hidden">Nam Hoai Nguyen</span>
        </NavLink>

        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-6 xl:gap-8">
            {NAV.map(({ href, label }) =>
              href === "/tags" ? (
                <li
                  key={href}
                  data-closed={topicsClosed || undefined}
                  onMouseEnter={() => setTopicsClosed(false)}
                  onFocus={() => setTopicsClosed(false)}
                  className="group/topics flex h-full items-center"
                >
                  <NavLink viewTransition to={href} className="flex h-full items-center gap-1 text-[15px] font-medium">
                    <span className="nav-word">{label}</span>
                    <IconChevronDown
                      aria-hidden="true"
                      className="text-text-2 size-3.5 transition-transform duration-200 group-focus-within/topics:rotate-180 group-hover/topics:rotate-180 group-data-closed/topics:rotate-0!"
                    />
                  </NavLink>
                  <TopicsPanel topics={topics} />
                </li>
              ) : (
                <li key={href} className="flex h-full items-center">
                  <NavLink viewTransition to={href} className="flex h-full items-center text-[15px] font-medium">
                    <span className="nav-word">{label}</span>
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="nav__actions flex items-center gap-2 lg:gap-4 xl:gap-6">
          <SearchModal />
          <ThemeToggle />
          <div className="lg:hidden">
            <ToggleMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      </div>

      {menuOpen && (
        // full-screen sheet below lg; any tap closes it
        <div
          id="site-menu"
          className="bg-bg top-nav fixed inset-x-0 bottom-0 z-40 overflow-y-auto lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <nav aria-label="Main" className="container">
            <ul>
              {NAV.map(({ href, label }) => (
                <li key={href} className="border-b">
                  <NavLink viewTransition to={href} className="flex h-14 items-center text-lg font-medium">
                    <span className="nav-word">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
