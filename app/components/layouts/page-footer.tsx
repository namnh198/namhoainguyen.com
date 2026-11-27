import { Link } from "react-router";

import { cn } from "~/lib/utils";
import { MENU } from "~/data/menu";

import { buttonVariants } from "../ui/button";

const ELSEWHERE = [
  { href: "https://github.com/namnh198", label: "GitHub" },
  { href: "https://www.linkedin.com/in/namnh198/", label: "LinkedIn" },
];

function Directory() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
      <div className="col-span-2 space-y-4 lg:col-span-6">
        <Link
          viewTransition
          to="/"
          className="font-heading block w-fit text-4xl leading-none tracking-[-0.03em] lg:text-6xl"
        >
          Nam Hoai Nguyen
        </Link>
        <p className="text-text-2 max-w-md">Notes on web development and cloud services, written down as I learn.</p>
      </div>
      <div className="lg:col-span-3 lg:col-start-7">
        <h3 className="text-text-2 mb-2 text-[13px] font-medium">Site</h3>
        <ul>
          {MENU.filter((menu) => menu.footer).map(({ href, label }) => (
            <li key={href}>
              <Link viewTransition to={href} className="flex min-h-11 w-fit items-center">
                <span className="nav-word">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-3">
        <h3 className="text-text-2 mb-2 text-[13px] font-medium">Elsewhere</h3>
        <ul>
          {ELSEWHERE.map(({ href, label }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 w-fit items-center">
                <span className="nav-word">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PageFooter({ closing = false }: { closing?: boolean }) {
  // per render: a Worker's clock reads 0 (1970) while its module loads
  const legal = `© ${new Date().getFullYear()} Nam Hoai Nguyen`;
  if (closing) {
    // taste-skill close-type: the page's last screen holds the close (row 1) and the directory (row 2)
    return (
      <footer className="closing band pt-24 pb-[calc(6rem+var(--gut)/2)] [--band-end:calc(var(--gut)/2)] [--band:var(--bg-deep)]">
        <div className="wrap container flex flex-col gap-24">
          <div className="space-y-6">
            <h2 className="font-heading text-[30px] leading-[1.1] font-medium tracking-[-0.03em] lg:text-5xl">
              Every note, newest first
            </h2>
            <p className="text-text-2">Search them from any page with ⌘K.</p>
            <Link
              viewTransition
              to="/notes"
              className={cn(
                buttonVariants(),
                "btn--xl font-heading h-12 w-full justify-between px-6 text-lg lg:h-22 lg:px-10 lg:text-[32px] pointer-fine:hover:-translate-y-0.5",
              )}
            >
              Read the notes
              <svg
                viewBox="0 0 12 12"
                aria-hidden="true"
                className="size-4 fill-none stroke-current stroke-[1.5] transition-transform duration-150 [stroke-linecap:round] [stroke-linejoin:round] lg:size-7 pointer-fine:group-hover/button:translate-x-[3px]"
              >
                <path d="M1 6h8" />
                <path d="M4.5 2.5 8 6l-3.5 3.5" />
              </svg>
            </Link>
          </div>
          <div className="space-y-10 border-t pt-24">
            <Directory />
            <p className="text-text-2 border-t pt-6 text-sm">{legal}</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-bg-deep border-t">
      <div className="container py-16 lg:py-24">
        <Directory />
      </div>
      <div className="border-t">
        <div className="text-text-2 container py-6 text-sm">{legal}</div>
      </div>
    </footer>
  );
}
