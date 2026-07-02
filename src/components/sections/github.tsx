import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { Github as GithubIcon } from "@/components/ui/brand-icons";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { getGithubStats } from "@/lib/github";
import { site } from "@/lib/data";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Dart: "#00b4ab",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572a5",
  Java: "#b07219",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  Shell: "#89e051",
};
const colorFor = (lang: string) => LANG_COLORS[lang] ?? "#818cf8";

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="bg-surface px-5 py-6 text-center transition-colors hover:bg-surface-2">
      <div className="font-serif text-4xl text-gradient sm:text-5xl">{value}</div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-faint">
        {label}
      </div>
    </div>
  );
}

export async function GithubSection() {
  const stats = await getGithubStats();

  return (
    <Section id="github">
      <SectionHeader
        index="07"
        kicker="Open Source"
        title="Live from"
        accent="GitHub"
        description="Public activity, pulled straight from the GitHub API."
      />

      {!stats ? (
        <Reveal className="glow-border card flex flex-col items-center gap-4 px-6 py-16 text-center">
          <GithubIcon className="size-8 text-muted" />
          <p className="max-w-md text-pretty text-muted">
            Live stats will appear here once the GitHub username is set in{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-foreground">
              src/lib/data.ts
            </code>
            . Meanwhile, visit the profile directly.
          </p>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-border-strong"
          >
            <GithubIcon className="size-4" /> Open GitHub
          </a>
        </Reveal>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Stat tiles */}
          <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            <RevealItem>
              <Stat value={stats.user.public_repos} label="Repositories" />
            </RevealItem>
            <RevealItem>
              <Stat value={stats.totalStars} label="Stars earned" />
            </RevealItem>
            <RevealItem>
              <Stat value={stats.user.followers} label="Followers" />
            </RevealItem>
            <RevealItem>
              <Stat value={stats.languages.length} label="Languages" />
            </RevealItem>
          </RevealGroup>

          {/* Language distribution */}
          {stats.languages.length > 0 && (
            <Reveal className="card p-6">
              <div className="mb-4 font-mono text-xs uppercase tracking-wider text-faint">
                Most used languages
              </div>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full">
                {stats.languages.map((l) => {
                  const total = stats.languages.reduce((s, x) => s + x.count, 0);
                  return (
                    <span
                      key={l.name}
                      title={`${l.name} · ${l.count} repos`}
                      style={{
                        width: `${(l.count / total) * 100}%`,
                        background: colorFor(l.name),
                      }}
                    />
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {stats.languages.map((l) => (
                  <span key={l.name} className="flex items-center gap-2 text-sm text-muted">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: colorFor(l.name) }}
                    />
                    {l.name}
                  </span>
                ))}
              </div>
            </Reveal>
          )}

          {/* Top repos */}
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {stats.topRepos.map((repo) => (
              <RevealItem key={repo.name}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-border card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium">
                      <GithubIcon className="size-4 text-faint" />
                      {repo.name}
                    </span>
                    <ArrowUpRight className="size-4 text-faint opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">
                    {repo.description ?? "No description provided."}
                  </p>
                  <div className="mt-4 flex items-center gap-4 font-mono text-xs text-faint">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="size-2.5 rounded-full"
                          style={{ background: colorFor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="size-3.5" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="size-3.5" /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="flex justify-center">
            <a
              href={stats.user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              <GithubIcon className="size-4" /> View full profile
              <ArrowUpRight className="size-3.5" />
            </a>
          </Reveal>
        </div>
      )}
    </Section>
  );
}
