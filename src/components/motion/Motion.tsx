'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { EASE_OUT, ENTER, SOFT, prefersReducedMotion, type SpringEase } from '@/lib/motion';

/**
 * Spring reveals (GSAP) + Lenis smooth scroll, re-run on every client navigation.
 * Lenis is desktop-only and both are skipped under prefers-reduced-motion.
 *
 * Elements marked `.reveal` (above the fold) spring in on load; `[data-reveal]` ones spring in as
 * they scroll into view. Each rises on a spring while fading in and coming into focus (un-blur),
 * then hands itself back to its stylesheet so hover transforms keep working.
 */
export default function Motion() {
	const pathname = usePathname();

	useEffect(() => {
		if (prefersReducedMotion()) return;

		let cleanup: (() => void) | undefined;
		let cancelled = false;

		(async () => {
			const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
				import('gsap'),
				import('gsap/ScrollTrigger'),
			]);
			if (cancelled) return;

			gsap.registerPlugin(ScrollTrigger);

			/** Rise on a spring, fade + un-blur on a long ease-out, then clear the inline styles. */
			const arrive = (
				targets: Element[],
				{ preset = ENTER, lift = 28, scale = 1, stagger = 0.08, delay = 0 }: {
					preset?: SpringEase;
					lift?: number;
					scale?: number;
					stagger?: number;
					delay?: number;
				} = {},
			) => {
				if (!targets.length) return;
				// .is-in lifts the CSS "hidden until revealed" rule; fromTo renders its start values
				// synchronously, so the element never paints in its final state first.
				targets.forEach((el) => el.classList.add('is-in'));
				gsap.fromTo(
					targets,
					{ y: lift, scale },
					{ y: 0, scale: 1, duration: preset.duration, ease: preset.ease, stagger, delay, clearProps: 'transform' },
				);
				gsap.fromTo(
					targets,
					{ opacity: 0, filter: 'blur(8px)' },
					{ opacity: 1, filter: 'blur(0px)', duration: 1, ease: EASE_OUT, stagger, delay, clearProps: 'opacity,filter' },
				);
			};

			const context = gsap.context(() => {
				const intro = gsap.utils.toArray<HTMLElement>('.reveal');
				arrive(intro, { preset: ENTER, lift: 32, stagger: 0.09, delay: 0.05 });

				ScrollTrigger.batch('[data-reveal]', {
					start: 'top 88%',
					once: true,
					// Anything already on screen waits for the intro to get going first.
					onEnter: (elements) =>
						arrive(elements, {
							preset: SOFT,
							lift: 36,
							scale: 0.97,
							stagger: 0.07,
							delay: intro.length && ScrollTrigger.isInViewport(elements[0]) ? 0.25 : 0,
						}),
				});
			});

			const desktopQuery = window.matchMedia('(min-width: 768px)');
			let lenis: import('lenis').default | undefined;
			let LenisCtor: typeof import('lenis').default | undefined;
			// Drive Lenis from GSAP's ticker so scroll position and ScrollTrigger update on the very
			// same frame — two separate rAF loops drift and read as micro-stutter.
			const tick = (time: number) => lenis?.raf(time * 1000);

			const startLenis = async () => {
				if (lenis) return;
				if (!LenisCtor) {
					({ default: LenisCtor } = await import('lenis'));
				}
				if (cancelled || lenis) return;
				lenis = new LenisCtor({
					lerp: 0.085, // a touch more glide than the 0.1 default
					wheelMultiplier: 1,
					anchors: { offset: -96 }, // in-page links glide too, landing below the floating nav
				});
				lenis.on('scroll', ScrollTrigger.update);
				gsap.ticker.add(tick);
				gsap.ticker.lagSmoothing(0);
			};
			const stopLenis = () => {
				gsap.ticker.remove(tick);
				gsap.ticker.lagSmoothing(500, 33);
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
					stopLenis();
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
