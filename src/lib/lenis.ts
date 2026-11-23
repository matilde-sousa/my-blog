import type Lenis from 'lenis';

type LenisTarget = Parameters<Lenis['scrollTo']>[0];
type LenisScrollToOptions = NonNullable<Parameters<Lenis['scrollTo']>[1]>;

let activeLenis: Lenis | null = null;

/** Called by the root layout when the browser-only Lenis instance is created. */
export function registerLenis(lenis: Lenis | null): void {
	activeLenis = lenis;
}

/** Access the active Lenis instance, or `null` during SSR and reduced motion. */
export function getLenis(): Lenis | null {
	return activeLenis;
}

/** Pause smooth scrolling while a modal, menu, or embedded game is open. */
export function stopScroll(): void {
	activeLenis?.stop();
}

/** Resume smooth scrolling after a modal, menu, or embedded game closes. */
export function startScroll(): void {
	activeLenis?.start();
}

/** Scroll to a number, selector, or element without prop drilling. */
export function scrollTo(target: LenisTarget, options?: LenisScrollToOptions): void {
	activeLenis?.scrollTo(target, options);
}
