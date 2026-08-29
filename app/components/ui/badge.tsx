import type { VariantProps } from "class-variance-authority";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex items-center justify-center whitespace-nowrap font-medium py-0.5 px-1.5 border rounded-sm text-xs",
  {
    variants: {
      variant: {
        green: "text-[#4ade80] bg-[#101e15] border-[#14532d]",
        orange: "text-[#fb923c] bg-[#201510] border-[#7c2d12]",
        sky: "text-[#38bdf8] bg-[#101e2e] border-[#0c4a6e]",
        red: "text-[#f87171] bg-[#251010] border-[#7f1d1d]",
        grey: "text-[#94a3b8] bg-[#1a1d2e] border-[#334155]",
      },
    },
    defaultVariants: {
      variant: "grey",
    },
  },
);

function Badge({
  className,
  variant = "grey",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
