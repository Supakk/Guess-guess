'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navItems } from '@/lib/site';

/** Roughly where the floating pill sits, in viewport px from the top. */
const NAV_PROBE_Y = 40;

/**
 * Glass pill nav that collapses to just the logo on scroll and reopens on
 * click. Any subsequent scroll re-collapses it, even if opened manually.
 *
 * Below md there is nothing to navigate to — the home route folds every
 * other page into one scrolling mobile experience (see page.tsx) — so the
 * nav links and CTA stay md-only and mobile only ever shows the wordmark.
 *
 * The wordmark's contrast is decided by probing whatever section currently
 * sits behind the pill (via [data-nav-theme] markers), not mix-blend-mode —
 * blend modes don't reliably composite against a backdrop-filter blur
 * across browsers, so the "invert against what's behind" effect silently
 * failed. Explicit detection is slightly more code but actually works.
 */
export default function SiteHeader() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [manuallyOpen, setManuallyOpen] = useState(false);
	const [onLight, setOnLight] = useState(false);

	useEffect(() => {
		const updateTheme = () => {
			let isLight = false;
			document.querySelectorAll<HTMLElement>('[data-nav-theme]').forEach((section) => {
				const rect = section.getBoundingClientRect();
				if (rect.top <= NAV_PROBE_Y && rect.bottom >= NAV_PROBE_Y) {
					isLight = section.dataset.navTheme === 'light';
				}
			});
			setOnLight(isLight);
		};

		setScrolled(false);
		setManuallyOpen(false);
		updateTheme();

		const onScroll = () => {
			setScrolled(window.scrollY > 24);
			setManuallyOpen(false);
			updateTheme();
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [pathname]);

	const expanded = !scrolled || manuallyOpen;
	const wordmark = (
		<span className={`transition-colors duration-300 ${onLight ? 'text-[#15120d]' : 'text-[#f6f0e6]'}`}>eunyu</span>
	);

	return (
		<div className="container sticky top-4 z-50 pt-4">
			<header className="glass glass-nav flex w-fit max-w-full items-center rounded-full px-5 py-3 md:px-6">
				{expanded ? (
					<Link href="/" className="text-lg font-semibold tracking-tight" aria-label="Eunyu Studio home">
						{wordmark}
						<span className="text-[#c1734a]">.</span>
					</Link>
				) : (
					<button
						type="button"
						onClick={() => setManuallyOpen(true)}
						className="text-lg font-semibold tracking-tight"
						aria-label="Expand navigation"
						aria-expanded={false}
					>
						{wordmark}
						<span className="text-[#c1734a]">.</span>
					</button>
				)}

				<div
					className={`hidden items-center gap-7 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex ${
						expanded ? 'ml-14 max-w-140 opacity-100' : 'ml-0 max-w-0 opacity-0'
					}`}
				>
					<nav className="flex gap-7 whitespace-nowrap text-sm" aria-label="Main navigation">
						{navItems.map((item) => (
							<Link key={item.href} href={item.href} className="transition-colors hover:text-[#c1734a]">
								{item.label}
							</Link>
						))}
					</nav>
					<Link
						href="/contact"
						className="whitespace-nowrap text-sm underline underline-offset-8 transition-colors hover:text-[#c1734a]"
					>
						Start a project <span aria-hidden="true">↗</span>
					</Link>
				</div>
			</header>
		</div>
	);
}
