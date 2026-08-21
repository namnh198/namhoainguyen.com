import { IconLoader, IconNotebook, IconSearch, IconX } from "@tabler/icons-react";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "~/hooks/use-debounce";
import type { SearchResult } from "~/lib/notion/types";
import { useNavigate } from "react-router";
import { getUri } from "~/lib/helpers";

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
          if (activeIndex >= 0 && results[activeIndex]) {
            handleSearchResultClick();
          }
          break;
        case "Escape":
          setActiveIndex(-1);
          break;
      }
    },
    [results, activeIndex],
  );

  const handleSearchResultClick = useCallback(() => {
    if (activeIndex < 1) {
      return;
    }
    const selectedItem = results[activeIndex];
    if (selectedItem) {
      navigate(getUri(selectedItem.slug), { replace: true });
      setModalOpen(false);
    }
  }, [results, activeIndex]);

  const handleModalOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setQuery("");
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
          <Button
            variant="outline"
            className="border-0 lg:border lg:bg-linear-(--btn-gradient) outline-none w-10 h-10 lg:w-fit lg:h-9"
          >
            <IconSearch stroke={2} className="size-4" />
            <span className="hidden lg:inline-block">Search</span>
          </Button>
        }
      />
      <DialogContent
        showCloseButton={false}
        className="top-18 ring-border translate-y-0 w-11/12 lg:w-full max-w-xl md:max-w-170 overflow-hidden p-0! mx-auto"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search notes</DialogTitle>
          <DialogDescription>Search through your notes</DialogDescription>
        </DialogHeader>
        <div className="divide-border-muted flex h-full min-h-0 flex-1 flex-col divide-y">
          <div className="relative flex justify-between items-center">
            <span
              className={buttonVariants({
                variant: "outline",
                size: "icon-lg",
                className: `rounded-none ${loading && query ? "animate-spin" : ""}`,
              })}
            >
              {loading && query ? <IconLoader /> : <IconSearch />}
            </span>
            <Input
              aria-activedescendant={activeIndex >= 0 ? `action-${results[activeIndex]?.id}` : undefined}
              aria-autocomplete="list"
              autoComplete="off"
              aria-expanded={results.length > 0}
              role="combobox"
              className="px-0 rounded-none border-0 ring-0 text-text-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search notes..."
            />
            <DialogClose
              render={
                <Button type="button" className="size-10 text-text-2 rounded-none">
                  <IconX />
                </Button>
              }
            />
          </div>
          {results.length > 0 && (
            <div className="nhn-scrollbar max-h-[60vh] overflow-y-auto p-1.5">
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`group cursor-pointer flex items-start gap-3 rounded-lg px-3 py-2 text-sm outline-none border border-transparent aria-selected:bg-bg-elevated aria-selected:border-border-bright`}
                  aria-selected={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  onClick={handleSearchResultClick}
                >
                  <span className="shrink-0 size-6 inline-flex items-center justify-center">{<IconNotebook />}</span>
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
              Found <span>{results.length}</span> results
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
