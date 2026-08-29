import React, { useState } from "react";
import type { Color } from "notion-types";

import { IconChevronRight } from "@tabler/icons-react";

import { mapBlockColorClass } from "~/lib/helpers";
import { cn } from "~/lib/utils";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export function Toggle({
  color,
  children,
  text,
  className,
}: {
  text: React.ReactNode;
  color?: Color;
  children?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(mapBlockColorClass(color!), "toggle-container relative", className)}>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className={cn("toggle-button group/toggle flex w-full items-start gap-1.5 rounded-md")}>
          <span
            className={cn("z-20 mt-0.5 cursor-pointer rounded-md border border-transparent p-0.5", {
              "group-hover/toggle:bg-bg-elevated group-hover/toggle:text-text group-hover/toggle:border-[#4f80ff33]":
                !open,
              "bg-bg-elevated text-text border-[#4f80ff33]": open,
            })}
          >
            <IconChevronRight
              size={18}
              className={cn("shrink-0 transform transition-all duration-300 ease-in-out", {
                "rotate-90": open,
                "rotate-0": !open,
              })}
            />
          </span>
          <span className="text-start">{text}</span>
        </CollapsibleTrigger>
        {!!children && (
          <CollapsibleContent className="pl-2">
            <div className={"inside-toggle-container px-4 pt-[0.1px]"}>{children}</div>
          </CollapsibleContent>
        )}
        <div
          className={cn("absolute top-0 left-0 z-10 mt-3 ml-2.5 h-[calc(100%-8px)] w-1 border-l-2 border-[#4f80ff33]", {
            hidden: !open,
          })}
        />
      </Collapsible>
    </div>
  );
}
