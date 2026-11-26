import { Link } from "react-router";

import { MENU } from "~/data/menu";

const ELSEWHERE = [
  { href: "https://github.com/namnh198", label: "GitHub" },
  { href: "https://www.linkedin.com/in/namnh198/", label: "LinkedIn" },
];

export function PageFooter() {
  return (
    <footer className="bg-bg-deep border-t">
      <div className="container grid gap-12 py-16 lg:grid-cols-12 lg:gap-6 lg:py-24">
        <div className="space-y-4 lg:col-span-7">
          <Link to="/" className="font-heading block w-fit text-4xl leading-none tracking-[-0.03em] lg:text-6xl">
            Nam Hoai Nguyen
          </Link>
          <p className="text-text-2 max-w-md">Notes on web development and cloud services, written down as I learn.</p>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:col-span-5">
          <div>
            <h3 className="text-text-2 mb-2 text-[13px] font-medium">Site</h3>
            <ul>
              {MENU.filter((menu) => menu.footer).map(({ href, label }) => (
                <li key={href}>
                  <Link to={href} className="flex min-h-11 w-fit items-center">
                    <span className="nav-word">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
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
      </div>
      <div className="border-t">
        <div className="text-text-2 container py-6 text-sm">© {new Date().getFullYear()} Nam Hoai Nguyen</div>
      </div>
    </footer>
  );
}
