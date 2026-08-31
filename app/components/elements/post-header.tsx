import { type ReactNode } from "react";
import type { Tag } from "~/lib/types";

import { Link } from "react-router";

import { getUri } from "~/lib/helpers";

import { PageIcon } from "../notion/page-icon";

export function PostHeader({
  title,
  icon,
  desc,
  tags = [],
  notionDomain,
  children,
}: {
  title: string;
  icon?: ReactNode | string;
  desc?: ReactNode | string;
  tags?: Tag[];
  notionDomain?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-border relative mb-12 border-b pt-14 pb-12">
      <div className="bg-glow-mesh absolute inset-0 cursor-none" />
      <div className="absolute inset-0 bg-[linear-gradient(#4f80ff08_1px,#0000_1px),linear-gradient(90deg,#4f80ff08_1px,#0000_1px)] mask-[radial-gradient(100%_100%_at_0%,#000_20%,#0000_80%)] bg-size-[40px_40px]" />
      <div className="relative container space-y-3.5">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="bg-accent-glow text-accent inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#4f80ff40]">
              <PageIcon inputIcon={icon as string} notionDomain={notionDomain!} />
            </div>
          )}
          <h1 className="font-heading text-gradient text-[1.75rem] leading-tight font-extrabold tracking-[-0.02em] lg:text-[2.5rem]">
            {title}
          </h1>
        </div>
        {desc && <p className="text-text-2 max-w-xl text-lg">{desc}</p>}
        {children}
        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to={`/tags`}
              className="bg-accent-flow text-accent rounded-full border border-[#4f80ff66] px-4 py-2 text-sm font-medium whitespace-nowrap"
              aria-label="All Tags"
            >
              All
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                to={getUri(tag.slug, "tag")}
                className="border-border bg-bg-card text-text-2 hover:border-border-bright hover:text-text hover:bg-bg-elevated rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ease-in-out"
                aria-label={`Tag ${tag.name}`}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
