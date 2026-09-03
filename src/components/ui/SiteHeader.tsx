'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navItems } from '@/lib/site';

/**
 * Glass pill nav that collapses to just the logo on scroll and reopens on
 * click. Any subsequent scroll re-collapses it, even if opened manually.
 */
export default function SiteHeader() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [manuallyOpen, setManuallyOpen] = useState(false);

	useEffect(() => {
		setScrolled(false);
		setManuallyOpen(false);
	}, [pathname]);

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 24);
			setManuallyOpen(false);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const expanded = !scrolled || manuallyOpen;

	return (
		<div className="container sticky top-4 z-50 pt-4">
			<header className="glass glass-nav flex items-center rounded-full px-6 py-3">
				{expanded ? (
					<Link href="/" className="text-lg font-semibold tracking-tight" aria-label="Morrow Studio home">
						morrow<span className="text-[#c1734a]">.</span>
					</Link>
				) : (
					<button
						type="button"
						onClick={() => setManuallyOpen(true)}
						className="text-lg font-semibold tracking-tight"
						aria-label="Expand navigation"
						aria-expanded={false}
					>
						morrow<span className="text-[#c1734a]">.</span>
					</button>
				)}

				<div
					className={`flex items-center gap-7 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
						expanded ? 'ml-8 max-w-[480px] opacity-100' : 'ml-0 max-w-0 opacity-0'
					}`}
				>
					<nav className="hidden gap-7 whitespace-nowrap text-sm md:flex" aria-label="Main navigation">
						{navItems.map((item) => (
							<Link key={item.href} href={item.href} className="transition-colors hover:text-[#c1734a]">
								{item.label}
							</Link>
						))}
					</nav>
					<Link
						href="/contact"
						className="whitespace-nowrap rounded-full bg-[#f6f0e6] px-4 py-2 text-sm text-[#15120d] transition-transform hover:-translate-y-0.5"
					>
						Start a project <span aria-hidden="true">↗</span>
					</Link>
				</div>
			</header>
		</div>
	);
}
