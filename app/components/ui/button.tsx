import type { VariantProps } from "class-variance-authority";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";

import { cn } from "~/lib/utils";

// taste-skill: 44px buttons, 16px label, one primary (filled accent) and the "arrow" look's text-link secondary.
// Hover steps the fill 14% toward the ink and lifts 1px; press sinks 1px and scales .985; the focus ring never animates.
const buttonVariants = cva(
  "btn group/button inline-flex shrink-0 items-center justify-center rounded-btn border border-transparent bg-clip-padding font-medium whitespace-nowrap select-none transition-[transform,background-color,border-color,color,text-decoration-color] duration-150 ease-out  active:not-aria-[haspopup]:translate-y-px active:not-aria-[haspopup]:scale-[.985] active:duration-[90ms] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "btn--primary bg-primary text-primary-foreground pointer-fine:hover:-translate-y-px hover:bg-[color-mix(in_oklab,var(--accent)_86%,var(--text))]",
        outline:
          "border-border-bright bg-background text-foreground pointer-fine:hover:-translate-y-px hover:bg-[color-mix(in_oklab,var(--bg)_94%,var(--text))] hover:border-[color-mix(in_oklab,var(--text)_35%,transparent)] aria-expanded:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground pointer-fine:hover:-translate-y-px hover:bg-[color-mix(in_oklab,var(--bg-elevated)_86%,var(--text))] aria-expanded:bg-secondary",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        // the page's secondary action: ink text on a faint underline that darkens; it does not step
        link: "btn--secondary text-foreground underline decoration-[color-mix(in_oklab,var(--text)_35%,transparent)] decoration-1 underline-offset-4 hover:decoration-current",
      },
      size: {
        default: "h-11 gap-2 px-6 text-base has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-7 text-base",
        icon: "size-11",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
