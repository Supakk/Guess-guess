import Link from 'next/link';

/**
 * Case study card. Finished work shows its still cover and opens the case study; in-progress work
 * shows a placeholder face and links out to its repository instead.
 */
export default function WorkCard({ project, titleClass = 'text-xl', showSummary = true }) {
	const { data } = project;
	const inProgress = data.status === 'in-progress';
	const cover = data.cover ?? data.videos[0]?.poster;

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
			{inProgress && data.repo && (
				<p className="btn-arrow mt-4 text-sm text-[#f6f0e6]">
					<span className="ba-label link-sweep is-underlined">Case study soon — follow it on GitHub</span>
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
		return data.repo ? (
			<a href={data.repo} target="_blank" rel="noopener noreferrer" className="work-card group block" data-reveal>
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

/** Placeholder for unfinished work: a notch that plays along, and how far the build has got. */
function InProgressFace({ name, progress }) {
	return (
		<div className="card-face wip-face relative aspect-16/10" aria-hidden="true">
			<div className="notch">
				<div className="notch-row">
					<span className="notch-art" />
					<span className="notch-lines">
						<span />
						<span />
					</span>
					<span className="notch-eq">
						<span />
						<span />
						<span />
						<span />
					</span>
				</div>
				<p className="notch-lyric">♪ synced lyrics, coming soon</p>
			</div>

			<p className="card-title absolute inset-x-0 top-1/2 -translate-y-1/3 text-center text-4xl tracking-tight text-[#f6f0e6]/85 sm:text-5xl">
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
