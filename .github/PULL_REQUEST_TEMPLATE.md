## What & Why

<!-- 2–4 sentences: what changed, why, and anything worth calling out. -->

Closes #<!-- issue number --> · [Report a bug](https://github.com/matilde-sousa/my-blog/issues/new?template=bug_report.yml) / [Feature or post idea](https://github.com/matilde-sousa/my-blog/issues/new?template=feature_idea.yml)

> Target: `main`. Create a short-lived branch off `main` (`feat/...`, `fix/...`, `post/...`, `chore/...`) and open this PR into `main`.

## Change Type

- [ ] Blog post / content
- [ ] UI/UX
- [ ] Feature / component
- [ ] Bug fix
- [ ] CI / infra / chore

## Evidence

<!-- UI or post changes only. Drag in screenshots and paste the preview URL. Delete this section otherwise. -->

- **Preview:** <!-- Cloudflare Workers preview URL, or rendered post path -->
- **Light mode:** <!-- screenshot -->
- **Dark mode:** <!-- screenshot -->

## Definition of Done

### Verification

- [ ] `pnpm run check` passes (Svelte/TypeScript + Wrangler types)
- [ ] `pnpm run lint` passes (Prettier + ESLint)
- [ ] `pnpm test` passes (Vitest unit + Playwright browser)
- [ ] `pnpm run build` produces the Cloudflare Worker bundle
- [ ] Cloudflare Workers preview verified for this PR
- [ ] CI is green (check, lint, test, build)
- [ ] No secrets, `.dev.vars`, or local build output committed

### UI/UX _(if applicable)_

- [ ] Matches Figma tokens, spacing, and typography
- [ ] Responsive at mobile (~375px), tablet, and desktop
- [ ] Light and dark modes verified with WCAG AA contrast and visible focus states

### Content _(if applicable)_

- [ ] Frontmatter is complete and accurate
- [ ] Mermaid, code blocks, callouts, TOC, anchors, and links render correctly in preview

### Infra _(if applicable)_

- [ ] Wrangler config or bindings changes include a fresh `worker-configuration.d.ts` (`pnpm run gen`)
- [ ] Secrets and environment-specific values are configured in Cloudflare, not in the repo

## Notes

<!-- Optional: follow-ups, tradeoffs, or anything future-you should remember. -->
