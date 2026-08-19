import type { ReactNode } from "react";

import { mapBlockColorClass } from "~/lib/helpers";
import type { Color } from "notion-types";
import { cn } from "~/lib/utils";

export function Callout({
  text,
  icon,
  color,
  className,
  children,
}: {
  text: ReactNode;
  icon: ReactNode;
  color?: Color;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn(className, "block-callout relative")}>
      <div className={cn("flex rounded-md", mapBlockColorClass(color) || "border-border-muted border")}>
        {icon && <div className="text-yellow-text py-2 pl-4 text-2xl">{icon}</div>}
        <div className="w-0 flex-1 pr-4 pl-2">
          <div className={``}>{text}</div>
          {!!children && <div className="*:my-3">{children}</div>}
          <div className={``}></div>
        </div>
      </div>
    </div>
  );
}
