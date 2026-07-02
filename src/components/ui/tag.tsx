import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-wide transition-colors",
        accent
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-border bg-surface-2/60 text-muted hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
