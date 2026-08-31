import { useState } from "react";

import { IconPrompt } from "@tabler/icons-react";
import { NavLink } from "react-router";

import { cn } from "~/lib/utils";
import { useIsMobile } from "~/hooks/use-mobile";
import { MENU } from "~/data/menu";

import { SearchModal } from "./search-modal";
import { ToggleMenu } from "./toggle-menu";

export function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile(1024);

  return (
    <header className="sticky top-0 left-0 z-50 bg-[rgba(7,10,20,0.88)] shadow-[0_1px_0_var(--border),0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-lg">
      <div className="relative container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex shrink-0 items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-linear-(--btn-gradient)">
            <IconPrompt stroke={3} width={20} height={20} />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="leading-none font-bold">Nam Hoai Nguyen</span>
            <span className="text-text-3 text-xs leading-none font-medium">My taking notes</span>
          </span>
        </NavLink>
        {isMobile && (
          <div className="flex gap-2">
            <SearchModal />
            <ToggleMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        )}

        <nav
          className={cn(
            "flex flex-col items-start gap-1.5 bg-[rgba(7,10,20,1)] lg:flex-row lg:items-center lg:bg-transparent",
            {
              "absolute top-[calc(100%+0.5rem)] right-4 left-4 z-50 rounded-lg border p-2 [&_a]:w-full":
                isMobile && menuOpen,
              "hidden h-0": isMobile && !menuOpen,
            },
          )}
        >
          {MENU.map(({ href, label }) => (
            <NavLink
              key={`header-menu-${href}`}
              to={href}
              onClick={() => setMenuOpen(false)}
              title={label}
              className={({ isActive }) =>
                cn("text-text relative rounded-md px-3.5 py-2 text-sm font-medium transition-all", {
                  "hover:text-text hover:bg-bg-elevated": !isActive,
                  "text-accent bg-accent-glow": isActive,
                })
              }
            >
              {label}
            </NavLink>
          ))}
          {!isMobile && <SearchModal />}
        </nav>
      </div>
    </header>
  );
}
