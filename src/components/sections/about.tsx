import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { about } from "@/lib/data";

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-12 md:grid-cols-[300px_1fr] md:gap-16">
        {/* Avatar */}
        <Reveal className="relative mx-auto w-full max-w-[300px]">
          <div className="aurora absolute inset-0 -z-10 scale-90 opacity-50" />
          <Image
            src="/logo.png"
            alt="Nagaprabhu N — Frontend Engineer"
            width={600}
            height={600}
            sizes="(max-width: 768px) 300px, 300px"
            className="relative h-auto w-full drop-shadow-[0_20px_60px_rgba(246,185,59,0.15)]"
          />
        </Reveal>

        {/* Content */}
        <div>
          <Reveal className="mb-4 flex items-center gap-3 font-mono text-xs tracking-widest text-accent">
            <span className="text-faint">01</span>
            <span className="h-px w-8 bg-border-strong" />
            <span className="uppercase">About</span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
              {about.lead}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              {about.body}
            </p>
          </Reveal>

          <RevealGroup className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {about.stats.map((s) => (
              <RevealItem
                key={s.label}
                className="bg-surface px-5 py-6 transition-colors hover:bg-surface-2"
              >
                <div className="font-serif text-3xl text-gradient sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs text-faint">{s.label}</div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
