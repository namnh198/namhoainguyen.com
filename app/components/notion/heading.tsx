import { useState } from "react";
import type { Block } from "notion-types";

import { IconChevronRight, IconLink } from "@tabler/icons-react";

import { generateAnchor, uuidToId } from "~/lib/helpers";
import { getTextContent } from "~/lib/notion/get-block-value";
import { cn } from "~/lib/utils";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Text } from "./text";

const headingCommonClassName = "flex items-center gap-2 font-heading font-extrabold scroll-mt-18";

export function Heading({ block, children }: { block: Block; children?: React.ReactNode }) {
  if (!block.properties) return null;

  const id = uuidToId(block.id);
  const title = getTextContent(block.properties.title) || `Notion Header ${id}`;
  const anchor = generateAnchor(id, title);
  const innerHeader = (
    <span className="notion-h-title leading-tight">
      <Text ignoreMarkup={["b"]} value={block.properties.title} block={block} />
    </span>
  );
  const isH1 = block.type === "header";
  const isH2 = block.type === "sub_header";
  const isH3 = block.type === "sub_sub_header";
  let headerBlock = <></>;
  if (isH1) {
    headerBlock = (
      <h1
        id={anchor}
        className={cn(headingCommonClassName, "text-gradient notion-heading notion-h1 text-5xl")}
        data-id={id}
      >
        {innerHeader}
      </h1>
    );
  } else if (isH2) {
    headerBlock = (
      <h2
        id={anchor}
        className={cn(headingCommonClassName, "text-gradient notion-heading notion-h2 text-4xl")}
        data-id={id}
      >
        {innerHeader}
      </h2>
    );
  } else {
    headerBlock = (
      <h3
        id={anchor}
        className={cn(headingCommonClassName, "notion-heading notion-h3 text-2xl font-bold")}
        data-id={id}
      >
        {innerHeader}
      </h3>
    );
  }
  const wrapperClassName = cn("group/heading relative flex items-center gap-1.5", {
    "my-8 [&_svg]:text-accent": isH2 || isH1,
    "my-6": isH3,
  });
  if (block?.format?.toggleable) {
    return (
      <ToggleHeading
        headingType={isH3 ? "h3" : isH1 ? "h1" : "h2"}
        headingElement={headerBlock}
        triggerClassName={wrapperClassName}
      >
        {children}
      </ToggleHeading>
    );
  }

  return (
    <div className={wrapperClassName}>
      {headerBlock}
      {(isH1 || isH2) && <div className="divider-gradient flex-1" />}
    </div>
  );
}

export function ToggleHeading({
  headingElement,
  headingType,
  children,
  className,
  triggerClassName,
}: {
  headingElement: React.ReactNode;
  headingType: "h1" | "h2" | "h3";
  children?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={cn("relative", className)}>
      <div className={triggerClassName}>
        <CollapsibleTrigger
          className={cn("z-20 mt-0.5 cursor-pointer rounded-md border border-transparent p-0.5", {
            "group-hover/toggle:bg-bg-elevated group-hover/toggle:text-text group-hover/toggle:border-[#4f80ff33]":
              !open,
            "bg-bg-elevated text-text border-[#4f80ff33]": open,
            "mt-0.75 -ml-2.5": headingType === "h3",
            "-mt-0.5": headingType === "h2" || headingType === "h1",
          })}
        >
          <IconChevronRight
            className={cn("transform text-lg transition-all duration-300 ease-in-out", {
              "rotate-90": open,
              "rotate-0": !open,
            })}
          />
        </CollapsibleTrigger>
        {headingElement}
      </div>
      <CollapsibleContent>
        <div className="toggle-heading-content-container pl-8">{children}</div>
      </CollapsibleContent>
      <div
        className={cn("absolute top-0 left-0 z-10 mt-3 ml-2.5 h-[calc(100%-8px)] w-1 border-l-2 border-[#4f80ff33]", {
          hidden: !open,
          "mt-5 ml-[16.5px] border-l-3": headingType === "h2" || headingType === "h1",
          "mt-3.75 ml-1.25 border-l-2": headingType === "h3",
        })}
      />
    </Collapsible>
  );
}
