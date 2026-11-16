'use client';

import { useEffect, useRef } from 'react';

/**
 * Muted, looping screen recording that plays only while it is on screen (saving bandwidth and
 * battery) and stays on its poster under prefers-reduced-motion.
 */
export default function AutoVideo({ src, poster, label, className = '', eager = false }) {
	const ref = useRef(null);

	useEffect(() => {
		const video = ref.current;
		if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) video.play().catch(() => {});
				else video.pause();
			},
			{ threshold: 0.1 },
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, []);

	return (
		<video
			ref={ref}
			className={className}
			src={src}
			poster={poster}
			aria-label={label}
			muted
			loop
			playsInline
			preload={eager ? 'auto' : 'none'}
		/>
	);
}
