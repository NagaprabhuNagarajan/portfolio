"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyEmail({
  email,
  className,
  label = "Copy email",
}: {
  email: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface-2/40 px-4 font-mono text-sm text-muted transition-all hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      {copied ? (
        <Check className="size-4 text-emerald-400" />
      ) : (
        <Copy className="size-4 transition-transform group-hover:-translate-y-px" />
      )}
      <span className="tabular-nums">{copied ? "Copied!" : email}</span>
    </button>
  );
}
