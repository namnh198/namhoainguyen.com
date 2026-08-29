import type { Block } from "notion-types";

import { getTextContent } from "~/lib/notion/get-block-value";
import { cn } from "~/lib/utils";

import { LazyImage } from "../ui/lazy-image";
import { useNotionContext } from "./context";
import { Text } from "./text";

function Bookmark({ block }: { block: Block }) {
  if (!block.properties) {
    return null;
  }
  const { mapImageUrl } = useNotionContext();
  const link = block.properties.link;
  if (!link || !link[0]?.[0]) {
    return null;
  }

  let title = getTextContent(block.properties.title);
  if (!title) {
    title = getTextContent(link);
  }

  if (title) {
    if (title.startsWith("http")) {
      try {
        const url = new URL(title);
        title = url.hostname;
      } catch (_err) {
        // ignore invalid links
      }
    }
  }

  return (
    <div className={cn("notion-bookmark")}>
      <a
        className={cn("hover:border-border-bright flex w-full gap-4 rounded-xl border p-4 transition-colors")}
        href={link[0][0]}
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex flex-[4_1_180px] flex-col justify-between gap-4 overflow-hidden">
          <div className="flex flex-col gap-1.5">
            {title && (
              <div className="text-text truncate font-normal">
                <Text value={[[title]]} block={block} />
              </div>
            )}
            {block.properties?.description && (
              <div className="text-text-2! truncate text-[0.9em] font-normal">
                <Text value={block.properties?.description} block={block} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {block.format?.bookmark_icon && (
              <div className="relative h-4 w-4 shrink-0">
                <LazyImage src={mapImageUrl(block.format?.bookmark_icon, block)} alt={title} layout="fullWidth" />
              </div>
            )}
            <div className="text-text-2! truncate text-[0.9em] font-normal">
              <Text value={link} block={block} />
            </div>
          </div>
        </div>
        {block.format?.bookmark_cover && (
          <div className="relative hidden flex-[1_1_100px] sm:block">
            <LazyImage
              src={mapImageUrl(block.format?.bookmark_cover, block)}
              alt={getTextContent(block.properties?.title)}
              layout="fullWidth"
              className="object-cover"
            />
          </div>
        )}
      </a>
    </div>
  );
}

export { Bookmark };
