import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

const sizes = {
  md: "h-11 px-5",
  lg: "h-12 px-6",
};

const variants = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 hover:shadow-[0_0_30px_-8px] hover:shadow-accent/60",
  accent:
    "bg-accent-strong text-background hover:bg-accent-strong/90 hover:shadow-[0_0_30px_-6px] hover:shadow-accent/70",
  ghost:
    "border border-border bg-surface-2/40 text-foreground hover:border-border-strong hover:bg-surface-2",
};

type Common = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
