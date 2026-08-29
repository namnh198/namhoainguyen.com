import * as React from "react";
import type { Block } from "notion-types";

import { IconBrandGithub, IconCircle } from "@tabler/icons-react";

import { formatNotionDateTime } from "~/lib/notion/format-date";
import { cn } from "~/lib/utils";

export const EOI: React.FC<{
  block: Block;
  inline?: boolean;
  className?: string;
  updatedBlock?: React.ReactElement;
}> = ({ block, inline, className, updatedBlock }) => {
  const { original_url, attributes, domain } = block?.format || {};
  if (!original_url || !attributes) {
    return null;
  }

  const title = attributes.find((attr: { id: string }) => attr.id === "title")?.values[0];
  let owner = attributes.find((attr: { id: string }) => attr.id === "owner")?.values[0];
  const lastUpdatedAt = attributes.find((attr: { id: string }) => attr.id === "updated_at")?.values[0];
  const lastUpdated = lastUpdatedAt ? formatNotionDateTime(lastUpdatedAt) : null;

  switch (domain) {
    case "github.com":
      if (owner) {
        const parts = owner.split("/");
        owner = parts[parts.length - 1];
      }
      break;

    default:
      if (process.env.NODE_ENV !== "production") {
        console.log(`Unsupported external_object_instance domain "${domain}"`, JSON.stringify(block, null, 2));
      }

      return null;
  }

  return (
    <>
      {!inline && (
        <div className="relative">
          <a
            className={cn(
              className,
              "group/github bg-bg-card hover:border-border-bright flex flex-row items-center gap-3 rounded-xl border px-5 py-4 transition-colors",
            )}
            target="_blank"
            href={original_url}
            rel="noopener noreferrer"
          >
            <IconBrandGithub width={30} height={30} className="text-text transition-colors" />
            <div className={cn("flex flex-col gap-0")}>
              <div className="text-text text-base">{title}</div>
              <div className="text-text-2 flex flex-row items-center gap-1 text-[0.9em]">
                <div>{owner}</div>
                <IconCircle size={8} fill="currentColor" />
                <div>{lastUpdated}</div>
              </div>
            </div>
          </a>
        </div>
      )}
      {inline && (
        <a
          className="group/github-inline relative inline-flex flex-row items-baseline gap-1 px-1"
          target="_blank"
          href={original_url}
          rel="noopener noreferrer"
        >
          <IconBrandGithub width={18} height={18} className="text-text absolute top-0.5" />
          <div className="text-accent group-hover/github-inline:text-accent-2 pl-5">{title}</div>
        </a>
      )}
    </>
  );
};
