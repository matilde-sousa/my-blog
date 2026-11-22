# AGENTS.md — Project Guide & Conventions

## Project Overview

A personal build-in-public CS & engineering blog built with SvelteKit (Svelte 5), TypeScript, Tailwind CSS v4, and `mdsvex`, deployed on Cloudflare Workers.

## Package Manager & Commands

Always use `pnpm` (pinned to `pnpm@10.33.0`). Never use `npm` or `yarn`.

- `pnpm run dev` — Start local Vite dev server with Cloudflare Workers emulation
- `pnpm run check` — Run `wrangler types --check`, `svelte-kit sync`, and `svelte-check`
- `pnpm run lint` — Run Prettier check and ESLint
- `pnpm run format` — Auto-format all files with Prettier
- `pnpm run test:unit -- --run` — Run Vitest + Playwright browser unit tests
- `pnpm run build` — Verify Wrangler types and build production bundle

## Architecture & Deployment

- **Hosting:** Cloudflare Workers via `@sveltejs/adapter-cloudflare` and `wrangler.jsonc`.
- **Types:** `worker-configuration.d.ts` is generated via `pnpm run gen` (`wrangler types`) and ignored by ESLint. Re-run `pnpm run gen` if bindings in `wrangler.jsonc` change.
- **Content:** Markdown posts use `mdsvex` with plugins for code blocks, callouts, anchors, TOC, and Mermaid diagrams.

## Git Workflow

- `main` is the protected production branch (auto-deploys to live Cloudflare Workers).
- `develop` is the staging branch (auto-deploys to Cloudflare Workers preview URLs).
- Always create short-lived branches off `develop` (`feat/...`, `fix/...`, `post/...`, `chore/...`) and open Pull Requests into `develop`, then promote `develop` into `main`.

## Code & UI Standards

- Use Svelte 5 runes (`$state`, $derived`, `$props`, `$effect`) instead of legacy Svelte 4 syntax.
- Support both light and dark modes with accessible color contrast and semantic HTML.
- Keep components modular, small, and covered by Vitest unit/component tests where appropriate.
