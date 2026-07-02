import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { about } from "@/lib/data";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 md:grid-cols-[1.4fr_1fr] md:gap-20">
        <div>
          <Reveal className="mb-4 flex items-center gap-3 font-mono text-xs tracking-widest text-accent">
            <span className="text-faint">01</span>
            <span className="h-px w-8 bg-border-strong" />
            <span className="uppercase">About</span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {about.lead}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              {about.body}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
          {about.stats.map((s) => (
            <RevealItem
              key={s.label}
              className="bg-surface px-5 py-7 transition-colors hover:bg-surface-2"
            >
              <div className="font-serif text-4xl text-gradient sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-faint">{s.label}</div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
