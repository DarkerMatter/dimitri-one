# CLAUDE.md — dimitri-one

Dimitri Shepherd's personal website. F1 racing-themed portfolio with React/TypeScript/Vite.

## Stack

- **React 18** + **TypeScript** + **Vite 5**
- **NextUI v2** — component library (Card, Button, Progress, Image, Divider)
- **Framer Motion** — page transitions and animations
- **Tailwind CSS v3** — with NextUI plugin and custom F1 theme tokens
- **React Router DOM v6** — client-side routing
- **Axios** — HTTP (visitor counter API)
- **Wrangler** — Cloudflare Workers tooling (used for backend/API deployment)

## Design System (F1 Theme)

Custom Tailwind color tokens:
- `f1-red`: `#FF1801` — primary accent
- `f1-dark`: `#15151E` — page background
- `f1-carbon`: `#1F1F1F` — nav/footer/card backgrounds
- `f1-silver`: `#A8A9AD` — muted text

Style rules: `font-black italic uppercase tracking-tight` is the brand voice. Mono font (`Fira Code`) for data/status displays.

## Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `HomeWrapper` → `Home.tsx` | Hero + visitor counter card |
| `/playlists` | `PlaylistsPage` → `Playlists.tsx` | Spotify playlist cards (mock data) |
| `*` | `NotFound` | Redirects to `https://dimitri.one` |

## Key Files

- `src/App.tsx` — Router, Layout (nav/footer), Preloader gate, route definitions
- `src/Home.tsx` — Hero section, stats card, visitor counter via API
- `src/Playlists.tsx` — Playlist grid (currently hardcoded mock data)
- `src/components/Preloader.tsx` — F1 race start lights sequence + car launch animation
- `tailwind.config.js` — Custom F1 color tokens and font families
- `vite.config.ts` — `@` alias points to `/src`

## External API

- `POST https://api.dimitri.one/v1/counter/increase` — increments + returns `{ success, newCount }`
- Called on every home page load (visit counter)

## CI/CD

- GitHub Actions: `.github/workflows/node.js.yml` — runs `npm ci && npm run build` on push/PR to `master`
- Node pinned to `20.10.0`

## Dev Commands

```bash
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # ESLint
npm run preview  # Vite preview of built output
```

## Notes

- `Playlists.tsx` uses hardcoded mock data with a simulated 1s delay — comment says "replace with actual API call if needed"
- `wrangler` is a prod dependency — backend likely lives in a separate Cloudflare Workers project
- GitHub username: `DarkerMatter`
