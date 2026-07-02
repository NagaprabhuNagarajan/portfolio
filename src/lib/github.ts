import { site } from "./data";

export type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
};

export type GithubStats = {
  user: {
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
    followers: number;
    public_repos: number;
    bio: string | null;
  };
  totalStars: number;
  languages: { name: string; count: number }[];
  topRepos: GithubRepo[];
};

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  // Optional: set GITHUB_TOKEN in the environment to raise the rate limit.
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

/**
 * Fetch and aggregate public GitHub stats. Cached with ISR (1h).
 * Returns null on any failure so the section can render a graceful fallback.
 */
export async function getGithubStats(): Promise<GithubStats | null> {
  const user = site.githubUser;
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`,
        { headers, next: { revalidate: 3600 } },
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const userData = await userRes.json();
    const repos: GithubRepo[] = await reposRes.json();
    if (!Array.isArray(repos)) return null;

    const owned = repos.filter(
      (r: GithubRepo & { fork?: boolean }) => !r.fork,
    );

    const totalStars = owned.reduce((sum, r) => sum + r.stargazers_count, 0);

    const langCount = new Map<string, number>();
    for (const r of owned) {
      if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
    }
    const languages = [...langCount.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const topRepos = [...owned]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4);

    return {
      user: {
        login: userData.login,
        name: userData.name,
        avatar_url: userData.avatar_url,
        html_url: userData.html_url,
        followers: userData.followers,
        public_repos: userData.public_repos,
        bio: userData.bio,
      },
      totalStars,
      languages,
      topRepos,
    };
  } catch {
    return null;
  }
}
