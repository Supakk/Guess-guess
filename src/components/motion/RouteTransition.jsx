'use client';

import { usePathname } from 'next/navigation';

/** Fade + subtle translate on client navigation, replacing Astro View Transitions. */
export default function RouteTransition({ children }) {
	const pathname = usePathname();
	return (
		<main key={pathname} className="route-fade">
			{children}
		</main>
	);
}
