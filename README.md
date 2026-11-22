# my-blog

[![CI Check](https://github.com/matilde-sousa/my-blog/actions/workflows/ci.yml/badge.svg)](https://github.com/matilde-sousa/my-blog/actions/workflows/ci.yml)

A planned personal blog and living corner of the internet, inspired by early-2000s personal sites: chronological life updates, photo logs, CS and hardware notes, and small playable projects. It is intentionally not a sterile developer portfolio — it will be a long-running record of what I am building, learning, and tinkering with.

> **Status: pre-build.** This repository is currently a SvelteKit scaffold. The homepage still shows the default welcome screen; the visual design, content routes, and first posts have not been built yet.

The visual direction will be an intentional early-2000s personal web aesthetic — tactile borders, retro and nostalgic elements, photo frames, expressive typography, and playful widgets — with modern responsiveness, light/dark mode support, and WCAG accessibility.

## What's Planned

- **A 2000s personal blog revival.** Chronological updates, photo logs, CS and hardware tinkering, and playable experiments. The retro styling is deliberate: tactile borders, photo frames, expressive type, and small widgets, all responsive and accessible in light and dark mode.
- **Project #1 — This blog (in progress).** Designed from scratch in Figma and being built with SvelteKit (Svelte 5), TypeScript, Tailwind CSS v4, `mdsvex`, and Cloudflare Workers. This site is the first project in the series.
- **Project #2 — 2024 Mini-Game Remaster (planned).** A playable browser game originally built in 2024, planned for a TypeScript/Svelte rewrite with a cleaner architecture, major gameplay and UX improvements, and an embedded home on this site.

## Stack

| Area      | Tech                                                                    |
| --------- | ----------------------------------------------------------------------- |
| Framework | SvelteKit + Svelte 5, TypeScript                                        |
| Styling   | Tailwind CSS v4 + `@tailwindcss/typography`                             |
| Content   | `mdsvex` with plugins for code blocks, callouts, Mermaid, TOC, and more |
| Testing   | Vitest + Playwright browser tests                                       |
| Platform  | Cloudflare Workers via `@sveltejs/adapter-cloudflare`                   |
| Tooling   | pnpm@10.33.0, Vite 8, ESLint, Prettier, Wrangler                        |

SvelteKit, mdsvex, Tailwind, and Vitest are configured together in `vite.config.ts`; there is no separate `svelte.config.js`.

## Local development

Requires Node.js 22 and pnpm@10.33.0. The pnpm version is pinned via `packageManager`.

```sh
pnpm install
pnpm run dev
```

The dev server runs with Cloudflare Workers emulation through Wrangler.

For browser tests, install the Playwright Chromium binary once:

```sh
pnpm exec playwright install --with-deps chromium
```

## Scripts

| Command                    | What it does                                                    |
| -------------------------- | --------------------------------------------------------------- |
| `pnpm run dev`             | Start the local dev server                                      |
| `pnpm run check`           | Verify Wrangler types, sync SvelteKit, and run `svelte-check`   |
| `pnpm run lint`            | Check formatting with Prettier and lint with ESLint             |
| `pnpm run format`          | Format all files with Prettier                                  |
| `pnpm run test:unit --run` | Run Vitest unit and Playwright browser tests once               |
| `pnpm run build`           | Verify Wrangler types and build the production Worker bundle    |
| `pnpm run preview`         | Serve the built Worker locally with Wrangler on port 4173       |
| `pnpm run gen`             | Regenerate `worker-configuration.d.ts` after binding changes    |
| `pnpm run verify`          | Format, lint, type-check, and run the test suite in one command |

## Project structure

```text
src/
├── lib/              Shared components, utilities, and assets
├── routes/           SvelteKit routes and the global Tailwind stylesheet
└── app.html          HTML shell
static/               Public assets such as robots.txt
wrangler.jsonc        Cloudflare Worker configuration
vite.config.ts        SvelteKit, mdsvex, Tailwind, and Vitest configuration
```

## Content

Posts will be written in Markdown or MDX and processed by `mdsvex` with plugins for callouts, code blocks, Mermaid diagrams, figures, anchors, table of contents, citations, tabs, steps, and link checking. The current app is still the starter scaffold — only the app shell and default home page exist. The chronological blog, photo-log, and game routes are not built yet.

## Deployment

- `develop` deploys to Cloudflare Workers preview URLs.
- `main` is the protected production branch and deploys to the live Worker.
- Work happens on short-lived branches off `develop` (`feat/…`, `fix/…`, `post/…`, `chore/…`), merged into `develop` via PR and promoted to `main` via a separate PR.
- GitHub Actions runs type checks, linting, unit/browser tests, and the production build on pushes and PRs to both branches.

If bindings in `wrangler.jsonc` change, run `pnpm run gen` and commit the updated `worker-configuration.d.ts`.
