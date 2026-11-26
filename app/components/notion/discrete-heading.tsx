import type { ReactNode } from "react";
import type { Block } from "notion-types";

import { generateAnchor, uuidToId } from "~/lib/helpers";
import { getTextContent } from "~/lib/notion/get-block-value";

import { Text } from "./text";

export function DiscreteHeading({ block, children }: { block: Block; children?: ReactNode }) {
  if (!block.properties) {
    return null;
  }

  const id = uuidToId(block.id);
  const title = getTextContent(block.properties.title) || `Notion Header ${id}`;
  const anchor = generateAnchor(id, title);
  const innerHeader = (
    <span className="notion-h-title leading-none whitespace-nowrap">
      <Text ignoreMarkup={["b"]} value={block.properties.title} block={block} />
    </span>
  );

  return (
    <div className="bg-bg-elevated discrete mb-8 overflow-hidden rounded-xl border bg-linear-[180deg,color-mix(in_oklab,var(--accent)_4%,transparent),transparent_45%)] last:mb-0">
      <div className="discrete-heading bg-text/[0.02] flex items-center justify-start gap-1.5 border-b px-4 py-3 font-medium">
        {innerHeader}
      </div>
      <div className="discrete-content relative p-4">{children}</div>
    </div>
  );

  return null;
}
