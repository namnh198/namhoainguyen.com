import { useCallback, useEffect, useState } from "react";
import type { SearchResult } from "~/lib/notion/types";

import { IconLoader2, IconNotebook, IconSearch, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router";

import { getUri } from "~/lib/helpers";
import { useDebounce } from "~/hooks/use-debounce";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export function SearchModal({}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);

    fetch(`/api/search?q=${debouncedQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data as SearchResult[]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedQuery]);

  const openResult = (result?: SearchResult) => {
    if (!result) return;
    navigate(getUri(result.slug));
    handleModalOpenChange(false);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!results.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          // nothing highlighted yet: Enter opens the top result
          openResult(results[Math.max(activeIndex, 0)]);
          break;
        case "Escape":
          setActiveIndex(-1);
          break;
      }
    },
    [results, activeIndex, openResult],
  );

  const handleModalOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setQuery("");
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setModalOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Dialog open={modalOpen} onOpenChange={handleModalOpenChange}>
      <DialogTrigger
        render={
          <button
            type="button"
            aria-label="Search notes"
            aria-expanded={modalOpen}
            className="text-text hover:bg-secondary rounded-btn inline-flex size-10 items-center justify-center gap-2 text-[15px] font-medium transition-colors duration-150 lg:size-auto lg:min-h-11 lg:hover:bg-transparent"
          >
            <IconSearch stroke={2} className="text-text-2 size-4" />
            <span className="nav-word hidden lg:inline">Search</span>
            <kbd className="text-text-2 hidden rounded-sm border px-1 font-mono text-xs lg:inline">⌘K</kbd>
          </button>
        }
      />
      <DialogContent
        showCloseButton={false}
        className="ring-border top-18 mx-auto w-11/12 max-w-xl translate-y-0 overflow-hidden p-0! md:max-w-170 lg:w-full"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search notes</DialogTitle>
          <DialogDescription>Search through your notes</DialogDescription>
        </DialogHeader>
        <div className="divide-border flex h-full min-h-0 flex-1 flex-col divide-y">
          <div className="relative flex items-center justify-between">
            {/* both end icons: same 44px box, same 20px glyph, no hover fill or border */}
            <span aria-hidden="true" className="text-text-2 grid size-11 shrink-0 place-items-center">
              {loading && query ? <IconLoader2 className="size-5 animate-spin" /> : <IconSearch className="size-5" />}
            </span>
            <Input
              aria-activedescendant={activeIndex >= 0 ? `action-${results[activeIndex]?.id}` : undefined}
              aria-autocomplete="list"
              autoComplete="off"
              aria-expanded={results.length > 0}
              role="combobox"
              className="text-text-2 rounded-none border-0 bg-transparent px-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search notes..."
            />
            <DialogClose
              render={
                <button
                  type="button"
                  aria-label="Close search"
                  className="text-text-2 hover:text-text grid w-11 shrink-0 place-items-center self-stretch transition-colors duration-150"
                >
                  <IconX className="size-5" />
                </button>
              }
            />
          </div>
          {results.length > 0 && (
            <div className="nhn-scrollbar max-h-[60vh] overflow-y-auto p-1.5">
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`group aria-selected:bg-bg-elevated aria-selected:border-border-bright flex cursor-pointer items-start gap-3 rounded-lg border border-transparent px-3 py-2 text-sm outline-none`}
                  aria-selected={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  onClick={() => openResult(result)}
                >
                  <span className="inline-flex size-6 shrink-0 items-center justify-center">{<IconNotebook />}</span>
                  <div className="text-text flex flex-col gap-2">
                    <div
                      className="text-text font-bold"
                      dangerouslySetInnerHTML={{ __html: result.titleHighlighted }}
                    />
                    <div className="text-text-2 text-sm" dangerouslySetInnerHTML={{ __html: result.textHighlighted }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {results.length > 0 && (
            <div className="text-text-2 p-3 pl-4 text-xs">
              Found <span className="text-success font-medium">{results.length}</span> results
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
