import { useCallback, useEffect, useState } from "react";
import type { SearchResult } from "~/lib/notion/types";

import { IconLoader2, IconNotebook, IconSearch, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router";

import { getUri } from "~/lib/helpers";
import { useDebounce } from "~/hooks/use-debounce";

import { Button, buttonVariants } from "../ui/button";
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
            className="h-10 w-10 border-0 outline-none lg:h-9 lg:w-fit lg:border lg:bg-linear-(--btn-gradient)"
          >
            <IconSearch stroke={2} className="size-4" />
            <span className="hidden lg:inline-block">Search</span>
          </Button>
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
        <div className="divide-border-muted flex h-full min-h-0 flex-1 flex-col divide-y">
          <div className="relative flex items-center justify-between">
            <span
              className={buttonVariants({
                variant: "outline",
                size: "icon-lg",
                className: `rounded-none ${loading && query ? "animate-spin" : ""}`,
              })}
            >
              {loading && query ? <IconLoader2 /> : <IconSearch />}
            </span>
            <Input
              aria-activedescendant={activeIndex >= 0 ? `action-${results[activeIndex]?.id}` : undefined}
              aria-autocomplete="list"
              autoComplete="off"
              aria-expanded={results.length > 0}
              role="combobox"
              className="text-text-2 rounded-none border-0 px-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search notes..."
            />
            <DialogClose
              render={
                <Button type="button" className="text-text-2 size-10 rounded-none">
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
                  className={`group aria-selected:bg-bg-elevated aria-selected:border-border-bright flex cursor-pointer items-start gap-3 rounded-lg border border-transparent px-3 py-2 text-sm outline-none`}
                  aria-selected={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  onClick={handleSearchResultClick}
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
