import { LayoutGrid, Server, Smartphone, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { skillGroups, type SkillGroup } from "@/lib/data";
import { cn } from "@/lib/utils";

const icons = {
  layout: LayoutGrid,
  smartphone: Smartphone,
  sparkles: Sparkles,
  server: Server,
} as const;

function Meter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Proficiency ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-5 rounded-full transition-colors",
            i < level ? "bg-gradient-to-r from-accent to-violet" : "bg-border-strong",
          )}
        />
      ))}
    </div>
  );
}

function Card({ group }: { group: SkillGroup }) {
  const Icon = icons[group.icon];
  return (
    <RevealItem className="glow-border card group h-full p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent transition-colors group-hover:border-accent/40">
          <Icon className="size-5" />
        </div>
        <Meter level={group.level} />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{group.title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </RevealItem>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        index="02"
        kicker="Skills"
        title="A stack built for"
        accent="speed & scale"
        description="Deep in the React and Flutter ecosystems, with AI woven through the workflow."
      />
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g) => (
          <Card key={g.title} group={g} />
        ))}
      </RevealGroup>
    </Section>
  );
}
