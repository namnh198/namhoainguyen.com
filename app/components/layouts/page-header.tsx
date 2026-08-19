import { useState } from "react";
import { NavLink } from "react-router";
import { IconPrompt } from "@tabler/icons-react";
import { cn } from "~/lib/utils";
import { useIsMobile } from "~/hooks/use-mobile";
import { ToggleMenu } from "./toggle-menu";
import { SearchModal, SearchTrigger } from "./search-modal";
import { ModalProvider } from "../ui/animated-modal";
import { MENU } from "~/data/menu";

export function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile(992);

  return (
    <ModalProvider>
      <SearchModal />
      <header className="sticky top-0 left-0 z-50 bg-[rgba(7,10,20,0.88)] backdrop-blur-lg shadow-[0_1px_0_var(--border),0_4px_24px_rgba(0,0,0,0.3)]">
        <div className="relative container flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center shrink-0 gap-2">
            <span className="inline-flex items-center justify-center size-9 rounded-[10px] bg-linear-(--btn-gradient)">
              <IconPrompt stroke={3} width={20} height={20} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-bold leading-none">Nam Hoai Nguyen</span>
              <span className="leading-none text-xs font-medium text-text-3">My taking notes</span>
            </span>
          </NavLink>
          {isMobile && (
            <div className="flex gap-2">
              <SearchTrigger showText={false} />
              <ToggleMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
          )}

          <nav
            className={cn(
              "flex flex-col lg:flex-row gap-1.5 items-start md:items-center bg-[rgba(7,10,20,1)] lg:bg-transparent",
              {
                "absolute top-[calc(100%+0.5rem)] left-4 right-4 z-50 border rounded-lg p-2 [&_a]:w-full":
                  isMobile && menuOpen,
                "h-0 hidden": isMobile && !menuOpen,
              },
            )}
          >
            {MENU.map(({ href, label }) => (
              <NavLink
                key={`header-menu-${href}`}
                to={href}
                className={({ isActive }) =>
                  cn("relative text-text rounded-md py-2 px-3.5 text-sm font-medium transition-all", {
                    "hover:text-text hover:bg-bg-elevated": !isActive,
                    "text-accent bg-accent-glow": isActive,
                  })
                }
              >
                {label}
              </NavLink>
            ))}
            {!isMobile && <SearchTrigger showText={true} />}
          </nav>
        </div>
      </header>
    </ModalProvider>
  );
}
