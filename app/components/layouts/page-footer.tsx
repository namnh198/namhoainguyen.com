import { IconBrandGithub, IconPrompt } from "@tabler/icons-react";
import { Link } from "react-router";
import { MENU } from "~/data/menu";

export function PageFooter() {
  return (
    <footer className="border-t bg-linear-[0deg,rgba(79,128,255,0.03)_0%,transparent_100%] py-10">
      <div className="container">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link to="/" className="flex items-center shrink-0 gap-2">
              <span className="inline-flex items-center justify-center size-9 rounded-[10px] bg-linear-(--btn-gradient)">
                <IconPrompt stroke={3} width={20} height={20} />
              </span>
            </Link>
            <span className="text-sm text-text-3">© {new Date().getFullYear()} Nam Hoai Nguyen</span>
          </div>
          <div className="flex items-center gap-6">
            {MENU.filter((menu) => menu.footer).map(({ href, label }) => (
              <Link
                key={`footer-menu-${href}`}
                to={href}
                className="text-sm text-text-2 transition-colors hover:text-text"
              >
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/namnh198"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent"
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
