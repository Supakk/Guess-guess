import Link from 'next/link';

/** Case study card: the project's still cover when it has one, else a solid colour face. */
export default function WorkCard({ project, titleClass = 'text-xl', showSummary = true }) {
	const { data } = project;
	const cover = data.cover ?? data.videos[0]?.poster;

	return (
		<Link href={`/work/${project.slug}`} className="work-card group block" data-reveal>
			<div className="relative overflow-hidden rounded-2xl">
				{cover ? (
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
				)}
				<span className="glass-light absolute bottom-4 right-4 rounded-full px-3 py-1 text-sm text-[#15120d]">
					{data.year}
				</span>
			</div>
			<div className="mt-5 flex items-baseline justify-between gap-4">
				<p className="card-title text-sm text-[#c1734a]">{data.client}</p>
				<p className="text-sm text-[#a89a86]">{data.tags.join(' / ')}</p>
			</div>
			<h2 className={`mt-2 ${titleClass}`}>{data.problem}</h2>
			{showSummary && <p className="mt-2 text-[#a89a86]">{data.summary}</p>}
		</Link>
	);
}
