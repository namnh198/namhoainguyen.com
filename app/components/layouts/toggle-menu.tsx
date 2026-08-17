import { cn } from "~/lib/utils";

export function ToggleMenu({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <button
      className={cn(
        "md:hidden flex flex-col items-center justify-center gap-1 bg-bg-card text-text size-10 rounded-lg",
        "nav-menu-button",
        {
          "nav-menu-button-open": menuOpen,
        },
      )}
      onClick={() => setMenuOpen(!menuOpen)}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
