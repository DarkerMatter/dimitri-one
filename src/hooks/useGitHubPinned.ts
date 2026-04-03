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

const PINNED_NAMES = ['EndReset', 'dimitri-one', 'scripts', 'xz4'];

const CUSTOM_BLURBS: Record<string, string> = {
  'EndReset': 'Minecraft Java plugin that resets Elytras in the End dimension and clears them from chests — keeping the late-game grind alive.',
  'dimitri-one': 'This site. React + TypeScript + Vite on Cloudflare Pages with a Cloudflare Workers visit counter backend.',
  'scripts': 'A lightweight UI for browsing and downloading my shell scripts. Static site, dead simple.',
  'xz4': 'HD2 utility mod.',
};

export function useGitHubPinned() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<GitHubRepo[]>('https://api.github.com/users/DarkerMatter/repos?per_page=100&sort=updated', {
        headers: { Accept: 'application/vnd.github.v3+json' },
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
      })
      .catch(() => setError('Failed to load repos'))
      .finally(() => setLoading(false));
  }, []);

  return { repos, loading, error };
}
