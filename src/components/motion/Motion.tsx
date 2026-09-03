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

			const desktopQuery = window.matchMedia('(min-width: 768px)');
			let lenis: import('lenis').default | undefined;
			let LenisCtor: typeof import('lenis').default | undefined;

			const startLenis = async () => {
				if (lenis) return;
				if (!LenisCtor) {
					({ default: LenisCtor } = await import('lenis'));
				}
				if (cancelled || lenis) return;
				lenis = new LenisCtor({ autoRaf: true });
				lenis.on('scroll', ScrollTrigger.update);
			};
			const stopLenis = () => {
				lenis?.destroy();
				lenis = undefined;
			};
			// Lenis is desktop-only, but the breakpoint can cross live (window
			// resize, DevTools device toolbar) without a full page reload — a
			// one-time matchMedia check at mount left Lenis running with stale
			// bounds on mobile, which made the page appear to stop scrolling
			// partway down. React to the breakpoint instead of just reading it once.
			const onBreakpointChange = (event: MediaQueryListEvent) => {
				if (event.matches) void startLenis();
				else stopLenis();
			};
			// ScrollTrigger measures each [data-reveal] element's position once,
			// when the context above is set up. Sections toggled by md:hidden /
			// md:block are a pure CSS media-query switch GSAP never hears about,
			// so an element that was display:none at that moment keeps a
			// zero-height, wrongly-placed trigger forever — it can scroll into
			// view but never fire "enter", leaving it stuck at opacity: 0.
			// Refreshing on resize recalculates every trigger against current
			// layout, debounced so a dragged DevTools resize doesn't thrash it.
			let refreshTimeout: ReturnType<typeof setTimeout> | undefined;
			const onResize = () => {
				lenis?.resize();
				clearTimeout(refreshTimeout);
				refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 150);
			};

			if (desktopQuery.matches) {
				await startLenis();
				if (cancelled) {
					context.revert();
					return;
				}
			}
			desktopQuery.addEventListener('change', onBreakpointChange);
			window.addEventListener('resize', onResize);

			cleanup = () => {
				desktopQuery.removeEventListener('change', onBreakpointChange);
				window.removeEventListener('resize', onResize);
				clearTimeout(refreshTimeout);
				stopLenis();
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
