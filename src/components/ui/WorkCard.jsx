import Link from 'next/link';

/**
 * Case study card. Finished work shows its still cover and opens the case study; in-progress work
 * shows a placeholder face and links out to its repository instead.
 */
export default function WorkCard({ project, titleClass = 'text-xl', showSummary = true }) {
	const { data } = project;
	const inProgress = data.status === 'in-progress';
	const cover = data.cover ?? data.videos[0]?.poster;
	// Unfinished work has no case study to open, so the card goes to its site, or failing that its code.
	const href = data.url ?? data.repo;

	const face = inProgress ? (
		<InProgressFace name={data.client} progress={data.progress} />
	) : cover ? (
		<div className="card-face relative aspect-16/10 bg-[#f6f0e6]">
			<img
				src={cover}
				alt={`${data.client} website`}
				loading="lazy"
				decoding="async"
				className="absolute inset-0 size-full object-cover"
			/>
		</div>
	) : (
		<div className="card-face relative flex aspect-16/10 items-end bg-[#c1734a] p-6 text-[#15120d]">
			<span className="card-title text-4xl tracking-tight">{data.client}</span>
		</div>
	);

	const body = (
		<>
			<div className="relative overflow-hidden rounded-2xl">
				{face}
				<span
					className={`absolute bottom-4 right-4 rounded-full px-3 py-1 text-sm ${
						inProgress
							? 'border border-[#f6f0e6]/15 bg-[#f6f0e6]/10 text-[#f6f0e6] backdrop-blur-md'
							: 'glass-light text-[#15120d]'
					}`}
				>
					{inProgress ? 'In progress' : data.year}
				</span>
			</div>
			<div className="mt-5 flex items-baseline justify-between gap-4">
				<p className="card-title text-sm text-[#c1734a]">{data.client}</p>
				<p className="text-sm text-[#a89a86]">{data.tags.join(' / ')}</p>
			</div>
			<h2 className={`mt-2 ${titleClass}`}>{data.problem}</h2>
			{showSummary && <p className="mt-2 text-[#a89a86]">{data.summary}</p>}
			{!inProgress && (
				<p className="btn-arrow mt-4 text-sm text-[#c1734a]">
					<span className="ba-label link-sweep is-underlined">Read the case study</span>
					<span className="ba-icon" aria-hidden="true">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
							<path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
						</svg>
					</span>
				</p>
			)}
			{inProgress && href && (
				<p className="btn-arrow mt-4 text-sm text-[#f6f0e6]">
					<span className="ba-label link-sweep is-underlined">
						{data.url ? 'Case study soon — visit the site' : 'Case study soon — follow it on GitHub'}
					</span>
					<span className="ba-icon" aria-hidden="true">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
							<path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
						</svg>
					</span>
				</p>
			)}
		</>
	);

	if (inProgress) {
		return href ? (
			<a href={href} target="_blank" rel="noopener noreferrer" className="work-card group block" data-reveal>
				{body}
			</a>
		) : (
			<div className="work-card group" data-reveal>
				{body}
			</div>
		);
	}

	return (
		<Link href={`/work/${project.slug}`} className="work-card group block" data-reveal>
			{body}
		</Link>
	);
}

/** SF-Symbol-style glyphs the app's player uses, drawn at the size the app gives them (in points). */
const TRIANGLES = 'M1.8 7.1c0-1 1.1-1.6 1.9-1l7.7 5.1c.7.5.7 1.5 0 2l-7.7 5.1c-.8.5-1.9 0-1.9-1zM12 7.1c0-1 1.1-1.6 1.9-1l7.7 5.1c.7.5.7 1.5 0 2l-7.7 5.1c-.8.5-1.9 0-1.9-1z';
const glyphs = {
	shuffle: <path d="M3 7.5h2.6c1.7 0 2.7.7 3.6 2l3.6 5c.9 1.3 1.9 2 3.6 2H20M3 16.5h2.6c1.7 0 2.7-.7 3.6-2M13.2 9.5c.9-1.3 1.9-2 3.6-2H20M17.2 4.7 20 7.5l-2.8 2.8M17.2 13.7l2.8 2.8-2.8 2.8" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />,
	back: <path d={TRIANGLES} transform="matrix(-1 0 0 1 24 0)" fill="currentColor" />,
	pause: <><rect x="5.5" y="4" width="4.6" height="16" rx="1.4" fill="currentColor" /><rect x="13.9" y="4" width="4.6" height="16" rx="1.4" fill="currentColor" /></>,
	forward: <path d={TRIANGLES} fill="currentColor" />,
	speaker: <><path d="M3 9.6v4.8c0 .7.5 1.2 1.2 1.2h2.9l4.2 3.7c.7.6 1.7.1 1.7-.8V5.5c0-.9-1-1.4-1.7-.8L7.1 8.4H4.2C3.5 8.4 3 8.9 3 9.6z" fill="currentColor" /><path d="M15.8 9a4.3 4.3 0 0 1 0 6M18.6 6.4a8.2 8.2 0 0 1 0 11.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
};
const controls = [['shuffle', 13], ['back', 16], ['pause', 15], ['forward', 16], ['speaker', 13]];

/**
 * Placeholder for unfinished work: the Notchu notch, drawn like the app draws it (see .notch in
 * global.css), and how far the build has got. It opens into the player on hover.
 */
function InProgressFace({ name, progress }) {
	return (
		<div className="card-face wip-face relative aspect-16/10" aria-hidden="true">
			<div className="notch">
				<div className="notch-clip">
					<span className="notch-art" />
					<span className="notch-wave">
						<i />
						<i />
						<i />
						<i />
					</span>
					<div className="notch-player">
						<p className="np-meta">
							<b>Late Light Through the Window</b>
							<em>Studio Demo - Evening</em>
						</p>
						<p className="np-time">
							<small>1:12</small>
							<span className="np-bar">
								<span />
							</span>
							<small>3:34</small>
						</p>
						<p className="np-controls">
							{controls.map(([glyph, points]) => (
								<span key={glyph}>
									<svg viewBox="0 0 24 24" style={{ width: `calc(${points * 1.5} * var(--u))`, height: `calc(${points * 1.5} * var(--u))` }}>
										{glyphs[glyph]}
									</svg>
								</span>
							))}
						</p>
					</div>
				</div>
			</div>

			<p className="wip-name card-title absolute inset-x-0 top-1/2 -translate-y-1/3 text-center text-4xl tracking-tight text-[#f6f0e6]/85 sm:text-5xl">
				{name}
			</p>

			{progress && (
				<div className="absolute bottom-4 left-5 right-36 sm:left-6">
					<p className="text-xs text-[#a89a86]">
						Phase {progress.step} of {progress.of} · {progress.label}
					</p>
					<div className="mt-2 flex gap-1.5">
						{Array.from({ length: progress.of }, (_, index) => (
							<span
								key={index}
								className={`h-1 flex-1 rounded-full ${index < progress.step ? 'bg-[#c1734a]' : 'bg-[#f6f0e6]/12'}`}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
