#!/usr/bin/env node
/**
 * Sync a snapshot of GitHub profile data (top repos, top languages) to
 * content/github.json. Runs without a token but is rate-limited.
 *
 *   USERNAME=earya1999 node scripts/sync-github.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const username = process.env.USERNAME || process.env.GITHUB_USERNAME || "earya1999";
const token = process.env.GITHUB_TOKEN;

const headers = { "User-Agent": "portfolio-sync" };
if (token) headers.Authorization = `Bearer ${token}`;

async function j(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`${url} → ${r.status}`);
  return r.json();
}

async function main() {
  const user = await j(`https://api.github.com/users/${username}`);
  const repos = await j(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
  );

  const top = repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description || "",
      language: r.language || "Unknown",
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
    }));

  const langCounts = repos.reduce((acc, r) => {
    if (!r.language) return acc;
    acc[r.language] = (acc[r.language] || 0) + 1;
    return acc;
  }, {});
  const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      pct: Math.round((count / total) * 100),
    }));

  const out = {
    user: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      followers: user.followers,
      public_repos: user.public_repos,
      avatar_url: user.avatar_url,
      url: user.html_url,
    },
    pinned: top,
    languages,
    synced_at: new Date().toISOString(),
  };

  const filePath = path.join(root, "content", "github.json");
  fs.writeFileSync(filePath, JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote content/github.json (${top.length} repos)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
