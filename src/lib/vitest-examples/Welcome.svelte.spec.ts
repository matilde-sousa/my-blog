import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Welcome from './Welcome.svelte';

describe('Welcome.svelte', () => {
	it('should render h1', async () => {
		await render(Welcome);

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
	});
});
