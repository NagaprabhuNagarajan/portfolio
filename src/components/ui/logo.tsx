import { cn } from "@/lib/utils";
import { site } from "@/lib/data";

/** NP monogram badge (mirrors the avatar logo) + optional wordmark. */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-amber to-accent-strong text-[13px] font-extrabold tracking-tight text-background shadow-sm ring-1 ring-inset ring-white/10">
        NP
      </span>
      {showWordmark && (
        <span className="font-semibold tracking-tight text-foreground">
          {site.shortName}
        </span>
      )}
    </span>
  );
}
