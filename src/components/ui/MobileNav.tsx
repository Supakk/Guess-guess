'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navItems } from '@/lib/site';

/**
 * Below md the home route folds every page into one scrolling page (see page.tsx), so each menu entry
 * jumps to its section there. On the home page the entry for the section in view is marked.
 */
const sections = [
	{ id: 'services', label: 'Services' },
	{ id: 'work', label: 'Work' },
	{ id: 'about', label: 'About' },
	{ id: 'blog', label: 'Insights' },
];

// Keep the labels in step with the desktop nav so the two never drift apart.
const labels = Object.fromEntries(navItems.map((item) => [item.href.slice(1), item.label]));

export default function MobileNav({ pathname }: { pathname: string }) {
	const [open, setOpen] = useState(false);
	const [current, setCurrent] = useState<string | null>(null);
	const onHome = pathname === '/';

	// A new page always starts with the menu shut.
	useEffect(() => setOpen(false), [pathname]);

	// While the menu is open: page behind it stays put, and Escape closes it.
	useEffect(() => {
		if (!open) return;
		const root = document.documentElement;
		const previous = root.style.overflow;
		root.style.overflow = 'hidden';
		const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
		window.addEventListener('keydown', onKey);
		return () => {
			root.style.overflow = previous;
			window.removeEventListener('keydown', onKey);
		};
	}, [open]);

	// Mark the section that is crossing the middle of the screen.
	useEffect(() => {
		if (!onHome) {
			setCurrent(null);
			return;
		}
		const targets = [...sections, { id: 'contact', label: '' }]
			.map((section) => document.getElementById(section.id))
			.filter((element): element is HTMLElement => element !== null);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
			},
			{ rootMargin: '-45% 0px -50% 0px' },
		);
		targets.forEach((target) => observer.observe(target));
		return () => observer.disconnect();
	}, [onHome]);

	const close = () => setOpen(false);

	return (
		<div className="pointer-events-auto md:hidden">
			<div className="glass glass-nav flex items-center justify-between rounded-full py-1.5 pl-5 pr-1.5">
				<Link href="/" onClick={close} className="py-2 text-lg font-semibold tracking-tight" aria-label="Eunyu Studio home">
					eunyu<span className="text-[#c1734a]">.</span>
				</Link>
				<button
					type="button"
					onClick={() => setOpen((value) => !value)}
					aria-expanded={open}
					aria-controls="mobile-menu"
					className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-[#f6f0e6]/10 px-4 text-sm"
				>
					{open ? 'Close' : 'Menu'}
					<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
						{open ? <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /> : <path d="M2.5 5h11M2.5 11h11" />}
					</svg>
				</button>
			</div>

			{open && (
				<>
					<button
						type="button"
						aria-label="Close menu"
						tabIndex={-1}
						onClick={close}
						className="fixed inset-0 -z-10 bg-[#15120d]/70 backdrop-blur-sm"
					/>
					<nav id="mobile-menu" aria-label="Main navigation" className="menu-sheet glass mt-2 rounded-3xl p-2">
						{sections.map((section) => {
							const active = onHome && current === section.id;
							return (
								<Link
									key={section.id}
									href={`/#${section.id}`}
									onClick={close}
									aria-current={active ? 'location' : undefined}
									className={`flex min-h-14 items-center justify-between rounded-2xl px-4 text-xl transition-colors active:bg-[#f6f0e6]/10 ${
										active ? 'text-[#c1734a]' : ''
									}`}
								>
									{labels[section.id] ?? section.label}
									<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="opacity-60">
										<path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
									</svg>
								</Link>
							);
						})}
						<Link
							href="/#contact"
							onClick={close}
							className="press mt-1 flex min-h-14 items-center justify-center rounded-full bg-[#f6f0e6] text-base font-medium text-[#15120d]"
						>
							Start a project
						</Link>
					</nav>
				</>
			)}
		</div>
	);
}
