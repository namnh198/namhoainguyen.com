import * as React from "react";

import { cn } from "~/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      className={cn(
        "bg-bg-card text-text ring-offset-accent placeholder:text-text-3 focus-visible:ring-border-bright flex h-10 w-full rounded-md border px-3 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
