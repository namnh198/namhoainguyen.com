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
    <div className={cn("[&_svg]:text-accent flex items-center gap-3", [className])}>
      {icon}
      <h2 className="font-heading text-gradient text-2xl font-extrabold">{title}</h2>
      <div className="divider-gradient flex-1" />
      {viewAll && (
        <Link to={viewAll} className="text-accent text-sm font-medium whitespace-nowrap" aria-label="View All">
          View all →
        </Link>
      )}
    </div>
  );
}
