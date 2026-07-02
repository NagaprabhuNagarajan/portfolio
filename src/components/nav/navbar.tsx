"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Command, Menu, X } from "lucide-react";
import { navSections, site } from "@/lib/data";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Scroll-spy across sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of navSections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("open-command-palette"));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent via-amber to-accent"
      />
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 sm:px-8",
          scrolled
            ? "mt-3 h-14 rounded-full border border-border bg-background/70 backdrop-blur-xl sm:mx-auto sm:max-w-4xl"
            : "h-16 border-b border-transparent",
        )}
      >
        <a href="#top" aria-label={site.name} className="shrink-0">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                active === s.id
                  ? "text-foreground"
                  : "text-faint hover:text-foreground",
              )}
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-full border border-border bg-surface-2/40 px-3 py-1.5 font-mono text-xs text-faint transition-colors hover:border-border-strong hover:text-foreground sm:flex"
          >
            <Command className="size-3.5" />
            <span>K</span>
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 sm:block"
          >
            Contact
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid size-9 place-items-center rounded-full border border-border text-muted md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-2 rounded-2xl border border-border bg-background/95 p-3 backdrop-blur-xl md:hidden"
        >
          <div className="grid grid-cols-2 gap-1">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-lg bg-foreground py-2.5 text-center text-sm font-medium text-background"
          >
            Contact
          </a>
        </motion.div>
      )}
    </header>
  );
}
