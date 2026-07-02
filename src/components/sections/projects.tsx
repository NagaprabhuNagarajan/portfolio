"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Layers } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = "all" | "web" | "mobile";

const MOBILE_TECH = ["Flutter", "React Native", "Expo", "Dart"];

function categoryOf(p: Project): "web" | "mobile" {
  return p.tech.some((t) => MOBILE_TECH.includes(t)) ? "mobile" : "web";
}

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
];

/** Faux browser/app frame — renders a screenshot when present, else a branded placeholder. */
function Visual({ project }: { project: Project }) {
  const shot = project.screenshots[0];
  const cat = categoryOf(project);
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-surface-2">
      <div className="flex h-8 items-center gap-1.5 border-b border-border bg-background/60 px-3">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ml-3 font-mono text-[10px] text-faint">
          {cat === "mobile" ? "app · " : "https://"}
          {project.slug}
          {cat === "mobile" ? "" : ".app"}
        </span>
      </div>
      {shot ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/projects/${shot}`}
          alt={`${project.name} screenshot`}
          className="h-[calc(100%-2rem)] w-full object-cover object-top"
        />
      ) : (
        <div className="relative grid h-[calc(100%-2rem)] place-items-center">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="aurora absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 opacity-30" />
          <span className="relative font-serif text-6xl italic text-gradient">
            {project.name[0]}
          </span>
          <span className="absolute bottom-3 font-mono text-[10px] text-faint">
            screenshot coming soon
          </span>
        </div>
      )}
    </div>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3 py-2 sm:grid-cols-[6.5rem_1fr]">
      <span className="pt-0.5 font-mono text-[11px] uppercase tracking-wider text-faint">
        {label}
      </span>
      <p className="text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const hasShot = project.screenshots.length > 0;
  return (
    <motion.article
      layout
      className="glow-border card overflow-hidden p-5 sm:p-7"
    >
      <div className={cn("grid gap-7 lg:gap-10", hasShot && "lg:grid-cols-2")}>
        <div className={cn("order-2 lg:order-1", !hasShot && "max-w-3xl")}>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.name}
            </h3>
            <span className="font-mono text-xs text-faint">{project.year}</span>
          </div>
          <p className="mt-1 text-sm text-accent">{project.tagline}</p>

          <div className="mt-5 divide-y divide-border">
            <DetailRow label="Problem">{project.problem}</DetailRow>
            <DetailRow label="Solution">{project.solution}</DetailRow>
            <DetailRow label="Challenge">{project.challenges}</DetailRow>
            <DetailRow label="Arch">{project.architecture}</DetailRow>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Tag key={t} accent>
                {t}
              </Tag>
            ))}
          </div>
        </div>
        {hasShot && (
          <div className="order-1 self-center lg:order-2">
            <Visual project={project} />
          </div>
        )}
      </div>
    </motion.article>
  );
}

function CompactCard({ project }: { project: Project }) {
  const hasShot = project.screenshots.length > 0;
  return (
    <motion.article
      layout
      className="glow-border card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1"
    >
      {hasShot && <Visual project={project} />}
      <div className={cn("flex items-center gap-3", hasShot && "mt-5")}>
        <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
        <span className="font-mono text-xs text-faint">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-accent">{project.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.solution}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => projects.filter((p) => filter === "all" || categoryOf(p) === filter),
    [filter],
  );

  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          index="03"
          kicker="Featured Work"
          title="Products I've"
          accent="shipped"
        />
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-surface-2/40 p-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm transition-colors",
                filter === f.key
                  ? "text-background"
                  : "text-faint hover:text-foreground",
              )}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="flex flex-col gap-6">
        <AnimatePresence mode="popLayout">
          {featured.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <FeaturedCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>

        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {rest.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <CompactCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {visible.length === 0 && (
          <div className="grid place-items-center gap-3 rounded-xl border border-dashed border-border py-20 text-faint">
            <Layers className="size-6" />
            <p className="text-sm">No projects in this category yet.</p>
          </div>
        )}
      </motion.div>
    </Section>
  );
}
