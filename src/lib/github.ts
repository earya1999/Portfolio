import projectsConfig from "../../content/projects.json";

export type GithubProject = {
  id: number;
  name: string;
  displayName: string;
  fullName: string;
  description: string;
  outcome: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  pushedAt: string;
  /** Optional cover from content/projects.json → images */
  image: string | null;
};

type GithubApiRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
};

type ProjectOverride = {
  title?: string;
  summary?: string;
  outcome?: string;
};

const REVALIDATE_SECONDS = 600; // 10 minutes

export async function getGithubProjects(): Promise<{
  projects: GithubProject[];
  error?: string;
}> {
  const username =
    process.env.GITHUB_USERNAME || projectsConfig.username || "earya1999";
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "eshaanarya-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=${projectsConfig.sortBy || "updated"}&type=owner`,
      {
        headers,
        next: { revalidate: REVALIDATE_SECONDS, tags: ["github-projects"] },
      }
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("GitHub API error:", res.status, body);
      return {
        projects: [],
        error:
          res.status === 403
            ? "GitHub rate limit reached. Try again shortly."
            : "Could not load projects from GitHub.",
      };
    }

    const repos = (await res.json()) as GithubApiRepo[];
    const exclude = new Set(
      (projectsConfig.exclude || []).map((n) => n.toLowerCase())
    );
    const requireTopic = projectsConfig.requireTopic;
    const images = (projectsConfig.images || {}) as Record<string, string>;
    const overrides = (projectsConfig.overrides || {}) as Record<
      string,
      ProjectOverride
    >;
    const featured = (projectsConfig.featured || []) as string[];
    const featuredIndex = new Map(featured.map((name, i) => [name, i]));

    const projects = repos
      .filter((r) => {
        if (r.private) return false;
        if (projectsConfig.excludeForks && r.fork) return false;
        if (projectsConfig.excludeArchived && r.archived) return false;
        if (exclude.has(r.name.toLowerCase())) return false;
        if (requireTopic && !(r.topics || []).includes(requireTopic)) {
          return false;
        }
        return true;
      })
      .map((r): GithubProject => {
        const override = overrides[r.name] || {};
        return {
          id: r.id,
          name: r.name,
          displayName: override.title || r.name,
          fullName: r.full_name,
          description:
            override.summary || r.description || "No description yet.",
          outcome: override.outcome || null,
          url: r.html_url,
          homepage: r.homepage || null,
          language: r.language,
          topics: r.topics || [],
          stars: r.stargazers_count,
          forks: r.forks_count,
          updatedAt: r.updated_at,
          pushedAt: r.pushed_at,
          image: images[r.name] ?? null,
        };
      })
      .sort((a, b) => {
        const ai = featuredIndex.has(a.name)
          ? featuredIndex.get(a.name)!
          : Number.MAX_SAFE_INTEGER;
        const bi = featuredIndex.has(b.name)
          ? featuredIndex.get(b.name)!
          : Number.MAX_SAFE_INTEGER;
        if (ai !== bi) return ai - bi;
        return (
          new Date(b.pushedAt || b.updatedAt).getTime() -
          new Date(a.pushedAt || a.updatedAt).getTime()
        );
      })
      .slice(0, projectsConfig.maxRepos || 12);

    return { projects };
  } catch (e) {
    console.error("GitHub fetch failed:", e);
    return { projects: [], error: "Could not load projects from GitHub." };
  }
}

/** Language accent colors used in project cards. */
export const languageColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Jupyter: "#DA5B0B",
};
