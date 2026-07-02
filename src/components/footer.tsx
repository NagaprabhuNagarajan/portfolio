import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { navSections, site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_auto]">
        <div>
          <a href="#top" className="font-mono text-sm">
            <span className="text-accent">~/</span>
            {site.shortName.toLowerCase()}
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-faint">
            {site.role}
            {" — building scalable web & mobile applications with React, Next.js and Flutter."}
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-1 sm:grid-flow-col sm:grid-rows-4">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-faint transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-start gap-2">
          {[
            { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
            { href: site.github, icon: Github, label: "GitHub", ext: true },
            { href: site.linkedin, icon: Linkedin, label: "LinkedIn", ext: true },
          ].map((l) => {
            const Icon = l.icon;
            return (
              <a
                key={l.label}
                href={l.href}
                aria-label={l.label}
                target={l.ext ? "_blank" : undefined}
                rel={l.ext ? "noopener noreferrer" : undefined}
                className="grid size-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border px-5 py-5 font-mono text-xs text-faint sm:flex-row sm:px-8">
        <span>
          © {site.name}. Built with Next.js, Tailwind &amp; Motion.
        </span>
        <a
          href="#top"
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          Back to top
          <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
