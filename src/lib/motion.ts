// Spring physics as a GSAP ease. GSAP has no spring of its own, so each preset is solved once
// (a damped harmonic oscillator, starting at rest) into an ease function plus the time it takes
// to settle. The presets mirror the ones used on the ClovedBuild site: lively for things
// arriving on screen, calmer for lists and UI.

export type SpringEase = { ease: (p: number) => number; duration: number };

/** Solve a spring (mass 1) into a normalized 0→1 ease and its settle duration in seconds. */
export function spring(stiffness: number, damping: number, mass = 1): SpringEase {
	const w0 = Math.sqrt(stiffness / mass);
	const zeta = damping / (2 * Math.sqrt(stiffness * mass));

	const at = (t: number) => {
		if (zeta < 1) {
			const wd = w0 * Math.sqrt(1 - zeta * zeta);
			return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
		}
		return 1 - Math.exp(-w0 * t) * (1 + w0 * t); // critically damped (or over): no overshoot
	};

	// Settled once it stays within 0.1% of the target for the rest of the run.
	const step = 1 / 240;
	let duration = 0;
	for (let t = 0; t < 4; t += step) if (Math.abs(1 - at(t)) > 0.001) duration = t + step;
	duration = Math.max(0.3, duration);

	return { ease: (p) => (p >= 1 ? 1 : at(p * duration)), duration };
}

/** Something arriving on screen: a little overshoot, settles fast. */
export const ENTER = spring(150, 14);
/** Lists and cards: soft, practically no wobble. */
export const SOFT = spring(150, 20);
/** Panels and controls: calm. */
export const UI = spring(160, 18);

/** The long, soft ease-out used for opacity and blur (they must not overshoot). */
export const EASE_OUT = 'expo.out';

export const prefersReducedMotion = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
