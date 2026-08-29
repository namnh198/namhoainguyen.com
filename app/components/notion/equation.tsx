import Katex from "@matejmazur/react-katex";
import type { EquationBlock } from "notion-types";
import * as React from "react";

import { useNotionContext } from "./context";
import { cn } from "~/lib/utils";
import { getBlockTitle } from "~/lib/notion/get-block-value";

const katexSettings = {
  throwOnError: false,
  strict: false,
};

export function Equation(props: {
  block?: EquationBlock;
  math?: string;
  inline?: boolean;
  className?: string;
}) {
  const { block, math, inline = false, className } = props;
  const { recordMap } = useNotionContext();
  const math2Use = math ?? (block ? getBlockTitle(block, recordMap) : null);
  if (!math2Use) return null;

  return (
    <span
      tabIndex={0}
      className={cn(
        "notion-equation",
        inline
          ? "notion-equation-inline"
          : "relative block text-text-2 overflow-x-auto overflow-y-hidden text-center",
        className,
      )}
    >
      <Katex math={math2Use} settings={katexSettings} block={!inline} />
    </span>
  );
}
