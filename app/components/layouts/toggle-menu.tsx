import { cn } from "~/lib/utils";

export function ToggleMenu({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <button
      className={cn(
        "border-border-bright bg-bg text-text rounded-btn flex size-11 flex-col items-center justify-center gap-1 border",
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
