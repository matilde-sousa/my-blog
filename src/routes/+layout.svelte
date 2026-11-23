<script lang="ts">
	import 'lenis/dist/lenis.css';
	import './layout.css';
	import { afterNavigate } from '$app/navigation';
	import favicon from '#lib/assets/favicon.svg';
	import { registerLenis } from '../lib/lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Lenis from 'lenis';
	import { onMount } from 'svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	let lenis: Lenis | null = null;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		const instance = new Lenis({
			autoRaf: false,
			anchors: true
		});

		lenis = instance;
		registerLenis(instance);

		instance.on('scroll', () => ScrollTrigger.update());

		const update = (time: number) => instance.raf(time * 1000);

		gsap.ticker.add(update);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(update);
			instance.destroy();
			lenis = null;
			registerLenis(null);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});

	afterNavigate(() => {
		lenis?.scrollTo(0, { immediate: true });
		ScrollTrigger.refresh();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
