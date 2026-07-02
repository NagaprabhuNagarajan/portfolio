import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Monospace kicker + serif-accented heading — the section's signature. */
export function SectionHeader({
  index,
  kicker,
  title,
  accent,
  description,
}: {
  index: string;
  kicker: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-widest text-accent">
        <span className="text-faint">{index}</span>
        <span className="h-px w-8 bg-border-strong" />
        <span className="uppercase">{kicker}</span>
      </div>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}{" "}
        {accent && (
          <span className="font-serif italic font-normal text-gradient">
            {accent}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
