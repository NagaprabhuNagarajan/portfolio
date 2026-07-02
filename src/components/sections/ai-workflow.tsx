import {
  Bug,
  Compass,
  FileText,
  FlaskConical,
  GitPullRequest,
  Terminal,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { aiWorkflow } from "@/lib/data";

const icons = {
  compass: Compass,
  terminal: Terminal,
  bug: Bug,
  "git-pull-request": GitPullRequest,
  "file-text": FileText,
  "flask-conical": FlaskConical,
} as const;

export function AiWorkflow() {
  return (
    <Section id="ai">
      <SectionHeader
        index="05"
        kicker="AI-Assisted Development"
        title="AI in my"
        accent="engineering loop"
        description={aiWorkflow.lead}
      />

      <Reveal className="mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
        {aiWorkflow.body}
      </Reveal>

      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aiWorkflow.steps.map((step, i) => {
          const Icon = icons[step.icon as keyof typeof icons];
          return (
            <RevealItem
              key={step.title}
              className="glow-border card group relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="absolute right-5 top-4 font-mono text-xs text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent transition-colors group-hover:border-accent/40">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.desc}
              </p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
