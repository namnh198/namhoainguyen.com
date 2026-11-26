import { useState } from "react";

import { IconChevronDown, IconPrompt } from "@tabler/icons-react";
import { Link, NavLink } from "react-router";

import { getUri } from "~/lib/helpers";
import { cn } from "~/lib/utils";
import { MENU } from "~/data/menu";
import { TAGS } from "~/data/tags";

import { buttonVariants } from "../ui/button";
import { SearchModal } from "./search-modal";
import { ToggleMenu } from "./toggle-menu";

const NAV = MENU.filter(({ href }) => href !== "/");
const PRIMARY = { href: "/notes", label: "Read the notes" };

function Arrow() {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="size-3 fill-none stroke-current stroke-[1.5] transition-transform duration-150 [stroke-linecap:round] [stroke-linejoin:round] pointer-fine:group-hover/button:translate-x-[3px]"
    >
      <path d="M1 6h8" />
      <path d="M4.5 2.5 8 6l-3.5 3.5" />
    </svg>
  );
}

function TopicsPanel() {
  return (
    <div className="bg-bg invisible absolute inset-x-0 top-full -translate-y-1.5 border-b opacity-0 transition-[opacity,transform,visibility] duration-[120ms] ease-out group-focus-within/topics:visible group-focus-within/topics:translate-y-0 group-focus-within/topics:opacity-100 group-hover/topics:visible group-hover/topics:translate-y-0 group-hover/topics:opacity-100 group-hover/topics:delay-150 group-hover/topics:duration-200 motion-reduce:translate-y-0">
      <div className="container grid grid-cols-12 gap-6 py-10">
        <div className="col-span-3 space-y-3">
          <p className="font-heading text-2xl">Topics</p>
          <p className="text-text-2">Every note is filed under one or more of these.</p>
          <Link to="/tags" className="text-text inline-flex min-h-11 items-center">
            <span className="nav-word">All topics →</span>
          </Link>
        </div>
        <ul className="col-span-9 grid grid-cols-4 gap-x-6">
          {TAGS.map((tag) => (
            <li key={tag.slug}>
              <Link to={getUri(tag.slug, "tag")} className="flex min-h-11 items-center gap-2.5">
                <img src={tag.icon} alt="" width={20} height={20} loading="lazy" className="size-5 object-contain" />
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

  return (
    <header className="bg-bg h-nav lg:h-nav-lg fixed inset-x-0 top-0 z-50 border-b">
      <div className="container flex h-full items-center justify-between gap-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Nam Hoai Nguyen, home">
          <span className="bg-accent text-accent-ink inline-flex size-9 items-center justify-center rounded-md">
            <IconPrompt stroke={3} width={20} height={20} />
          </span>
          <span className="font-heading text-xl leading-none">Nam Hoai Nguyen</span>
        </NavLink>

        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-8">
            {NAV.map(({ href, label }) =>
              href === "/tags" ? (
                <li key={href} className="group/topics flex h-full items-center">
                  <NavLink to={href} className="flex h-full items-center gap-1 text-[15px] font-medium">
                    <span className="nav-word">{label}</span>
                    <IconChevronDown
                      aria-hidden="true"
                      className="text-text-2 size-3.5 transition-transform duration-200 group-focus-within/topics:rotate-180 group-hover/topics:rotate-180"
                    />
                  </NavLink>
                  <TopicsPanel />
                </li>
              ) : (
                <li key={href} className="flex h-full items-center">
                  <NavLink to={href} className="flex h-full items-center text-[15px] font-medium">
                    <span className="nav-word">{label}</span>
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2 lg:gap-6">
          <SearchModal />
          <Link to={PRIMARY.href} className={cn(buttonVariants(), "hidden sm:inline-flex")}>
            {PRIMARY.label}
            <Arrow />
          </Link>
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
                  <NavLink to={href} className="flex h-14 items-center text-lg font-medium">
                    <span className="nav-word">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to={PRIMARY.href} className={cn(buttonVariants(), "mt-6 w-full sm:hidden")}>
              {PRIMARY.label}
              <Arrow />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
