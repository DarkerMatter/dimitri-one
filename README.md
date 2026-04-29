# dimitri.one

My personal site. F1-themed portfolio with a preloader you can't skip (sorry), a tech-stack keyboard, GitHub projects pulled live, and some Spotify playlists.

Built with React + TypeScript on Vite, deployed to Cloudflare Pages. There's a separate Cloudflare Workers backend at `api.dimitri.one` handling the visitor counter.

## Stack

- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS** + **NextUI** (yes, I know it's HeroUI now — migration is on the list)
- **Framer Motion** for the preloader and page transitions
- **GSAP** + ScrollTrigger for the pinned scroll sections (tech stack keyboard, project cards)
- **React Router** for `/` and a `/playlists` redirect
- **Axios** for the GitHub and counter API calls
- **Cloudflare Pages** for hosting, **Cloudflare Workers** for the backend API

## Running it

Requires Node 20.10.0 (pinned in `package.json`).

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — type-check with `tsc -b` then build for production
- `npm run preview` / `npm start` — preview the production build locally

## Project layout

```
src/
  components/      Preloader, NavBar, KeyCap, CircuitDots
  sections/        Hero, TechStack, Projects, Playlists, PitLane, Footer
  hooks/           useScrollSpy, useIntersectionObserver, useGitHubPinned
  data/            keyboard.ts (keycap definitions)
  pages/Home.tsx
  App.tsx
```

The `Hero` section hits `https://api.dimitri.one/v1/counter/increase` once per session (cached in `sessionStorage`) to bump the visitor count. The `Projects` section pulls pinned repos from the GitHub public API, also session-cached for 15 minutes to stay under the unauthenticated rate limit.

## Deployment

Pushed to Cloudflare Pages. Build command is `npm run build`, output directory is `dist`. Security headers live in `public/_headers` — CSP is locked down to `self` + the specific CDNs the site actually uses (Spotify image CDN for playlist art, GitHub API, my own API).

## Notes

- `/playlists` redirects to `/#playlists` for old links.
- 404s redirect to the root domain.

## Contact

GitHub: [DarkerMatter](https://github.com/DarkerMatter) · Instagram: [@one.dimitri](https://instagram.com/one.dimitri)
