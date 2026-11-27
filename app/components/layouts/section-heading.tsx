import type { ReactNode } from "react";

import { Link } from "react-router";

import { cn } from "~/lib/utils";

export function SectionHeading({
  title,
  icon,
  className,
  viewAll,
}: {
  title: string;
  icon?: ReactNode;
  className?: string;
  viewAll?: string;
}) {
  return (
    <div className={cn("[&_svg]:text-text-2 flex items-center gap-3", [className])}>
      {icon}
      <h2 className="font-heading flex-1 text-2xl leading-tight font-medium tracking-[-0.02em] lg:text-[28px]">
        {title}
      </h2>
      {viewAll && (
        <Link
          viewTransition
          to={viewAll}
          className="inline-flex min-h-11 items-center text-sm font-medium whitespace-nowrap"
        >
          <span className="nav-word">All {title} notes →</span>
        </Link>
      )}
    </div>
  );
}
