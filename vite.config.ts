import { enhancedImages } from '@sveltejs/enhanced-img';
import { link_check } from '@mdsvex/plugin-link-check';
import { page_data } from '@mdsvex/plugin-page-data';
import { numbering } from '@mdsvex/plugin-numbering';
import { citations } from '@mdsvex/plugin-citations';
import { references } from '@mdsvex/plugin-references';
import { external_links } from '@mdsvex/plugin-external-links';
import { toc } from '@mdsvex/plugin-toc';
import { anchors } from '@mdsvex/plugin-anchors';
import { figures } from '@mdsvex/plugin-figures';
import { embeds } from '@mdsvex/plugin-embeds';
import { diagram } from '@mdsvex/plugin-diagram';
import { code_blocks } from '@mdsvex/plugin-code-blocks';
import { emoji } from '@mdsvex/plugin-emoji';
import { tabs } from '@mdsvex/plugin-tabs';
import { steps } from '@mdsvex/plugin-steps';
import { elements } from '@mdsvex/plugin-elements';
import { callouts } from '@mdsvex/plugin-callouts';
import { mdsvex } from 'mdsvex';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		mdsvex({
			heading_ids: true,
			unwrap_images: true,
			plugins: [
				callouts(),
				elements(),
				steps(),
				tabs(),
				emoji(),
				code_blocks(),
				diagram(),
				embeds(),
				figures(),
				anchors(),
				toc(),
				external_links(),
				references(),
				citations(),
				numbering(),
				page_data(),
				link_check()
			]
		}),
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
