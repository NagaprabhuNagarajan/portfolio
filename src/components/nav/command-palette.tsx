"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  AtSign,
  Command as CommandIcon,
  CornerDownLeft,
  FileText,
  Mail,
  Search,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { navSections, site } from "@/lib/data";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
  keywords?: string;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (hash: string) => {
      close();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    },
    [close],
  );

  const items = useMemo<Item[]>(() => {
    const nav: Item[] = navSections.map((s) => ({
      id: `nav-${s.id}`,
      label: `Go to ${s.label}`,
      hint: "Section",
      icon: ArrowUpRight,
      keywords: s.label,
      run: () => go(s.id),
    }));
    const actions: Item[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        hint: site.email,
        icon: AtSign,
        keywords: "copy email contact",
        run: () => {
          navigator.clipboard?.writeText(site.email);
          close();
        },
      },
      {
        id: "email",
        label: "Send an email",
        hint: "Mail",
        icon: Mail,
        keywords: "email contact mail",
        run: () => {
          window.location.href = `mailto:${site.email}`;
          close();
        },
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        icon: FileText,
        keywords: "resume cv download",
        run: () => {
          window.open(site.resume, "_blank");
          close();
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "External",
        icon: Github,
        keywords: "github code",
        run: () => {
          window.open(site.github, "_blank");
          close();
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "External",
        icon: Linkedin,
        keywords: "linkedin",
        run: () => {
          window.open(site.linkedin, "_blank");
          close();
        },
      },
    ];
    return [...nav, ...actions];
  }, [close, go]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.label} ${it.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  // Global open shortcut + custom event from navbar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return close();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 text-faint" />
              <input
                ref={inputRef}
                id="command-palette-input"
                name="command"
                type="text"
                autoComplete="off"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search sections and actions…"
                className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-faint"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint">
                ESC
              </kbd>
            </div>

            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-faint">
                  No results for “{query}”
                </li>
              )}
              {filtered.map((it, i) => {
                const Icon = it.icon;
                return (
                  <li key={it.id}>
                    <button
                      onMouseMove={() => setActive(i)}
                      onClick={it.run}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        active === i
                          ? "bg-surface-2 text-foreground"
                          : "text-muted",
                      )}
                    >
                      <Icon className="size-4 shrink-0 text-accent" />
                      <span className="flex-1 truncate">{it.label}</span>
                      {it.hint && (
                        <span className="truncate font-mono text-[10px] text-faint">
                          {it.hint}
                        </span>
                      )}
                      {active === i && (
                        <CornerDownLeft className="size-3.5 text-faint" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10px] text-faint">
              <span className="flex items-center gap-1">
                <CommandIcon className="size-3" /> command palette
              </span>
              <span>↑ ↓ to navigate · ↵ to select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
