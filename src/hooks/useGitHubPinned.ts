// src/hooks/useGitHubPinned.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
}

const PINNED_NAMES = ['EndReset', 'dimitri-one', 'scripts', 'fts-gg'];

const CUSTOM_BLURBS: Record<string, string> = {
  'EndReset': 'Minecraft Java plugin that resets Elytras in the End dimension and clears them from chests — keeping the late-game grind alive.',
  'dimitri-one': 'This site. React + TypeScript + Vite on Cloudflare Pages with a Cloudflare Workers visit counter backend.',
  'scripts': 'A lightweight UI for browsing and downloading my shell scripts. Static site, dead simple.',
  'xz4': 'HD2 utility mod.',
};

const CACHE_KEY = 'gh_pinned_repos';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

export function useGitHubPinned() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          setRepos(data);
          setLoading(false);
          return;
        }
      }
    } catch { /* ignore corrupt cache */ }

    axios
      .get<GitHubRepo[]>('https://api.github.com/users/DarkerMatter/repos?per_page=100&sort=updated', {
        headers: { Accept: 'application/vnd.github+json' },
      })
      .then(({ data }) => {
        const pinned = PINNED_NAMES
          .map((name) => data.find((r) => r.name === name))
          .filter((r): r is GitHubRepo => r !== undefined)
          .map((r) => ({
            ...r,
            description: CUSTOM_BLURBS[r.name] ?? r.description,
          }));
        setRepos(pinned);
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: pinned, ts: Date.now() })); } catch { /* quota */ }
      })
      .catch(() => setError('Failed to load repos'))
      .finally(() => setLoading(false));
  }, []);

  return { repos, loading, error };
}
