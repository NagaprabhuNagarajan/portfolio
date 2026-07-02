"use client";

import { motion, type Variants } from "motion/react";
import { ArrowDown, ArrowRight, Download, Sparkles } from "lucide-react";
import { heroStack, site } from "@/lib/data";
import { CopyEmail } from "@/components/ui/copy-email";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-24 sm:px-8"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="aurora animate-float absolute left-1/2 top-[-10%] size-[42rem] -translate-x-1/2 opacity-60" />
        <div className="aurora animate-float absolute right-[-10%] top-1/3 size-[26rem] opacity-40 [animation-delay:-6s]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl"
      >
        <motion.div
          variants={item}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/50 px-3.5 py-1.5 font-mono text-xs text-muted backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Available for frontend roles · {site.location}
        </motion.div>

        <motion.h1
          variants={item}
          className="text-balance text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-[5.5rem]"
        >
          {site.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-3 font-serif text-3xl italic text-gradient sm:text-5xl"
        >
          {site.role}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-pretty text-lg text-muted sm:text-xl"
        >
          {site.tagline}. Specialized in React, Next.js, Flutter &amp; TypeScript.
        </motion.p>

        {/* Stack marquee */}
        <motion.div
          variants={item}
          className="relative mt-8 max-w-xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
        >
          <div className="flex w-max animate-marquee gap-3">
            {[...heroStack, ...heroStack].map((t, i) => (
              <span
                key={i}
                className="whitespace-nowrap rounded-full border border-border bg-surface-2/50 px-3.5 py-1.5 font-mono text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:shadow-[0_0_36px_-8px] hover:shadow-accent/60"
          >
            <Download className="size-4 transition-transform group-hover:-translate-y-0.5" />
            Download Resume
          </a>
          <a
            href="#contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface-2/40 px-6 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            Contact Me
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <CopyEmail email={site.email} className="hidden sm:inline-flex" />
        </motion.div>

        <motion.div
          variants={item}
          className="mt-8 flex items-center gap-2 font-mono text-xs text-faint"
        >
          <Sparkles className="size-3.5 text-accent" />
          Press{" "}
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px]">
            ⌘ K
          </kbd>{" "}
          to jump anywhere
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-faint transition-colors hover:text-foreground md:block"
      >
        <ArrowDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}
