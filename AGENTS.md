# AGENTS.md — Project Guide & Conventions

## Project Overview

A personal blog and living corner of the internet inspired by early-2000s personal sites: chronological life updates, photo logs, CS and hardware notes, and small playable browser projects. It is intentionally not a generic minimalist SaaS or developer-portfolio template.

The design language is an intentional early-2000s personal web aesthetic — tactile borders, retro and nostalgic elements, photo frames, expressive typography, and playful widgets — implemented with modern responsiveness, light/dark mode support, and WCAG accessibility.

### Roadmap

1. **Project #1 — This blog:** designed from scratch in Figma; built with SvelteKit (Svelte 5), TypeScript, Tailwind CSS v4, `mdsvex`, and Cloudflare Workers.
2. **Project #2 — 2024 Mini-Game Remaster:** a playable browser game originally built in 2024, to be rewritten with TypeScript/Svelte, a cleaner architecture, major gameplay and UX improvements, and embedded directly in the site.

## Package Manager & Commands

Always use `pnpm` (pinned to `pnpm@10.33.0`). Never use `npm` or `yarn`.

- `pnpm run dev` — Start local Vite dev server with Cloudflare Workers emulation
- `pnpm run check` — Run `wrangler types --check`, `svelte-kit sync`, and `svelte-check`
- `pnpm run lint` — Run Prettier check and ESLint
- `pnpm run format` — Auto-format all files with Prettier
- `pnpm run test:unit --run` — Run Vitest + Playwright browser unit tests once
- `pnpm run build` — Verify Wrangler types and build production bundle

## Architecture & Deployment

- **Hosting:** Cloudflare Workers via `@sveltejs/adapter-cloudflare` and `wrangler.jsonc`.
- **Configuration:** SvelteKit, mdsvex, Tailwind, and Vitest are configured together in `vite.config.ts`; there is no separate `svelte.config.js`.
- **Types:** `worker-configuration.d.ts` is generated via `pnpm run gen` (`wrangler types`) and ignored by ESLint. Re-run `pnpm run gen` if bindings in `wrangler.jsonc` change.
- **Content:** Markdown and MDX use `mdsvex` with plugins for code blocks, callouts, anchors, TOC, and Mermaid diagrams. Photo logs and embedded browser games are first-class content goals.
- **Motion:** Lenis and GSAP `ScrollTrigger` initialize once in `src/routes/+layout.svelte` inside `onMount`; users who prefer reduced motion skip Lenis. Child components should use `getLenis`, `stopScroll`, `startScroll`, or `scrollTo` from `src/lib/lenis.ts` instead of creating another instance, and add `data-lenis-prevent` to nested scroll areas such as modals and games.

## Git Workflow

- `main` is the only permanent branch and represents production (auto-deploys to live Cloudflare Workers).
- Always create short-lived branches off `main` (`feat/...`, `fix/...`, `post/...`, `chore/...`) and open Pull Requests into `main`.
- Never recreate or target `develop`; it has been permanently removed.
- Test changes through the PR preview deployment or a local build before merging.

## Code & UI Standards

- Use Svelte 5 runes (`$state`, `$derived`, `$props`, `$effect`) instead of legacy Svelte 4 syntax.
- Use Tailwind CSS v4 and keep styling consistent with the project's design direction.
- **Preserve the intentional early-2000s personal web aesthetic.** Tactile borders, photo frames, expressive typography, retro/nostalgic details, and playful widgets are product requirements, not decoration to be sanded off. Do not flatten the UI into a generic minimalist SaaS or portfolio template.
- Support both light and dark modes with accessible WCAG contrast, semantic HTML, and visible focus states.
- Keep components modular, small, and covered by Vitest unit/component tests where appropriate.
