'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * GSAP reveals + Lenis smooth scroll, re-run on every client navigation.
 * Lenis is desktop-only and both are skipped under prefers-reduced-motion.
 */
export default function Motion() {
	const pathname = usePathname();

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let cleanup: (() => void) | undefined;
		let cancelled = false;

		(async () => {
			const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
				import('gsap'),
				import('gsap/ScrollTrigger'),
			]);
			if (cancelled) return;

			gsap.registerPlugin(ScrollTrigger);
			const context = gsap.context(() => {
				gsap.to('.reveal', { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' });

				ScrollTrigger.batch('[data-reveal]', {
					start: 'top 85%',
					onEnter: (elements) =>
						gsap.to(elements, {
							opacity: 1,
							y: 0,
							scale: 1,
							duration: 0.8,
							stagger: 0.12,
							ease: 'power3.out',
						}),
				});
			});

			let stopLenis: (() => void) | undefined;
			if (window.matchMedia('(min-width: 768px)').matches) {
				const { default: Lenis } = await import('lenis');
				if (cancelled) {
					context.revert();
					return;
				}
				const lenis = new Lenis({ autoRaf: true });
				lenis.on('scroll', ScrollTrigger.update);
				stopLenis = () => lenis.destroy();
			}

			cleanup = () => {
				stopLenis?.();
				context.revert();
			};
		})();

		return () => {
			cancelled = true;
			cleanup?.();
		};
	}, [pathname]);

	return null;
}
