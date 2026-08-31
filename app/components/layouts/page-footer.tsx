import { IconBrandGithub, IconPrompt } from "@tabler/icons-react";
import { Link } from "react-router";

import { MENU } from "~/data/menu";

export function PageFooter() {
  return (
    <footer className="border-t bg-linear-[0deg,rgba(79,128,255,0.03)_0%,transparent_100%] py-10">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Footer Logo">
              <span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-linear-(--btn-gradient)">
                <IconPrompt stroke={3} width={20} height={20} />
              </span>
            </Link>
            <span className="text-text-3 text-sm">© {new Date().getFullYear()} Nam Hoai Nguyen</span>
          </div>
          <div className="flex items-center gap-6">
            {MENU.filter((menu) => menu.footer).map(({ href, label }) => (
              <Link
                key={`footer-menu-${href}`}
                to={href}
                className="text-text-2 hover:text-text text-sm transition-colors"
                aria-label={`Menu ${label}`}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/namnh198"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent inline-flex items-center gap-1 text-sm"
            >
              <IconBrandGithub stroke={2} width={16} height={16} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
