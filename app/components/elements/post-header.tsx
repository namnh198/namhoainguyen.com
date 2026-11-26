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
    <div className="border-border mb-12 border-b pt-16 pb-12 lg:pt-24 lg:pb-16">
      <div className="container space-y-5">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="bg-bg-card text-text-2 inline-flex size-10 shrink-0 items-center justify-center rounded-md border lg:size-12">
              <PageIcon inputIcon={icon as string} notionDomain={notionDomain!} />
            </div>
          )}
          <h1 className="font-heading text-[34px] leading-[1.05] font-medium tracking-[-0.03em] lg:text-[56px]">
            {title}
          </h1>
        </div>
        {desc && <p className="text-text-2 max-w-[62ch] text-lg">{desc}</p>}
        {children}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3">
            <Link
              to={`/tags`}
              className="rounded-btn border-border-bright text-text inline-flex min-h-11 items-center border px-4 text-sm font-medium whitespace-nowrap"
            >
              All topics
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                to={getUri(tag.slug, "tag")}
                className="rounded-btn border-border text-text-2 hover:border-border-bright hover:text-text inline-flex min-h-11 items-center border px-4 text-sm font-medium whitespace-nowrap transition-colors"
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
