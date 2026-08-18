import { type ReactNode } from "react";
import { Link } from "react-router";
import { getUri } from "~/lib/helpers";
import type { Tag } from "~/lib/types";

export function PostHeader({
  title,
  icon,
  desc,
  tags = [],
  children,
}: {
  title: string;
  icon?: ReactNode | string;
  desc?: string;
  tags?: Tag[];
  children?: ReactNode;
}) {
  return (
    <div className="relative border-b border-border mb-12 pt-14 pb-12">
      <div className="absolute inset-0 cursor-none bg-glow-mesh" />
      <div className="absolute inset-0 bg-size-[40px_40px] bg-[linear-gradient(#4f80ff08_1px,#0000_1px),linear-gradient(90deg,#4f80ff08_1px,#0000_1px)] mask-[radial-gradient(100%_100%_at_0%,#000_20%,#0000_80%)]" />
      <div className="relative container">
        <div className="flex items-center gap-2.5 mb-3.5">
          {icon && (
            <div className="inline-flex items-center justify-center size-10 bg-accent-glow border border-[#4f80ff40] rounded-lg text-accent">
              {icon}
            </div>
          )}
          <h1 className="text-[1.75rem] lg:text-[2.5rem] leading-tight font-extrabold tracking-[-0.02em] text-gradient">
            {title}
          </h1>
        </div>
        {desc && <p className="text-lg text-text-2 max-w-xl">{desc}</p>}
        {children}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            <Link
              to={`/tags`}
              className="py-2 px-4 text-sm font-medium rounded-full whitespace-nowrap border border-[#4f80ff66] bg-accent-flow text-accent"
            >
              All
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                to={getUri(tag.slug, "tag")}
                className="py-2 px-4 text-sm font-medium rounded-full whitespace-nowrap border border-border bg-bg-card transition-colors ease-in-out text-text-2 hover:border-border-bright hover:text-text hover:bg-bg-elevated"
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
