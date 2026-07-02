import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CopyEmail } from "@/components/ui/copy-email";
import { site } from "@/lib/data";

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "LinkedIn", value: "Connect", href: site.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", value: "Follow", href: site.github, icon: Github, external: true },
  { label: "Resume", value: "Download PDF", href: site.resume, icon: FileText, external: true },
];

export function Contact() {
  return (
    <Section id="contact" className="pb-16">
      <div className="glow-border card relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-24">
        <div className="bg-grid mask-radial absolute inset-0 opacity-40" />
        <div className="aurora absolute left-1/2 top-0 size-96 -translate-x-1/2 opacity-40" />

        <div className="relative mx-auto max-w-2xl">
          <Reveal className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
            06 — Contact
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              Let&apos;s build{" "}
              <span className="font-serif italic font-normal text-gradient">
                something
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-pretty text-lg text-muted">
              Open to frontend roles and interesting collaborations. The fastest
              way to reach me is email.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:shadow-[0_0_36px_-8px] hover:shadow-accent/60"
              >
                <Mail className="size-4" />
                Email me
              </a>
              <CopyEmail email={site.email} />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
              {links.map((l) => {
                const Icon = l.icon;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="group flex flex-col items-center gap-2 bg-surface px-4 py-6 transition-colors hover:bg-surface-2"
                  >
                    <Icon className="size-5 text-accent" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                      {l.label}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted group-hover:text-foreground">
                      {l.value}
                      {l.external && (
                        <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
