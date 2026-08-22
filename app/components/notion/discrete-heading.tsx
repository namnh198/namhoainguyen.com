import type { Block } from "notion-types";
import type { ReactNode } from "react";
import { generateAnchor, uuidToId } from "~/lib/helpers";
import { getTextContent } from "~/lib/notion/get-text-content";
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
    <div className="border rounded-xl bg-bg-elevated bg-linear-[180deg,#4f80ff09,transparent_45%)] overflow-hidden mb-8 last:mb-0 discrete">
      <div className="flex items-center justify-start gap-1.5 py-3 px-4 border-b bg-[#ffffff05] font-medium discrete-heading">
        {innerHeader}
      </div>
      <div className="relative p-4 discrete-content">{children}</div>
    </div>
  );

  return null;
}
