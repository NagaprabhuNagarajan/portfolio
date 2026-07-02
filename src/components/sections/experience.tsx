import { Section, SectionHeader } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        index="04"
        kicker="Experience"
        title="Where I've"
        accent="built things"
      />

      <RevealGroup className="relative">
        {/* Timeline spine */}
        <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-border to-transparent" />

        <div className="flex flex-col gap-10">
          {experience.map((job) => (
            <RevealItem key={job.company} className="relative pl-10">
              <span className="absolute left-0 top-1.5 grid size-4 place-items-center rounded-full border border-accent/50 bg-background">
                <span className="size-1.5 rounded-full bg-accent" />
                {job.current && (
                  <span className="absolute inline-flex size-4 animate-ping rounded-full bg-accent/40" />
                )}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-semibold tracking-tight">
                  {job.company}
                </h3>
                {job.current && (
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-0.5 font-mono text-xs text-faint">
                {job.role} · {job.period}
              </p>
              {job.subtitle && (
                <p className="mt-2 text-sm font-medium text-accent">
                  {job.subtitle}
                </p>
              )}
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">
                {job.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </Section>
  );
}
