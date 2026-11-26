import { cn } from "~/lib/utils";

export function ToggleMenu({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <button
      className={cn(
        "text-text hover:bg-secondary rounded-btn flex size-10 flex-col items-center justify-center gap-1 transition-colors duration-150",
        "nav-menu-button nav__toggle",
        {
          "nav-menu-button-open": menuOpen,
        },
      )}
      onClick={() => setMenuOpen(!menuOpen)}
      aria-expanded={menuOpen}
      aria-controls="site-menu"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
