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
        green: "text-ctp-green bg-ctp-green/10 border-ctp-green/30",
        orange: "text-ctp-peach bg-ctp-peach/10 border-ctp-peach/30",
        sky: "text-ctp-blue bg-ctp-blue/10 border-ctp-blue/30",
        red: "text-ctp-red bg-ctp-red/10 border-ctp-red/30",
        grey: "text-text-2 bg-bg-elevated border-border-bright",
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
