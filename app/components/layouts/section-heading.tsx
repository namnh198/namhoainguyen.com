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
    <div className={cn("flex items-center gap-3 [&_svg]:text-accent", [className])}>
      {icon}
      <h2 className="text-2xl font-extrabold text-gradient">{title}</h2>
      <div className="flex-1 divider-gradient" />
      {viewAll && (
        <Link to={viewAll} className="text-sm text-accent whitespace-nowrap font-medium">
          View all →
        </Link>
      )}
    </div>
  );
}
