/**
 * One card that sums a project up: the product as it looks today, the scope at a glance, the few
 * highlights that matter most, and its numbers.
 */
export default function ProjectOverview({ project }) {
	const { client, cover, year, tags, stack, highlights, facts, summary } = project.data;

	const meta = [
		{ label: 'Year', value: String(year) },
		{ label: 'Scope', value: tags.join(', ') },
		stack.length > 0 && { label: 'Stack', value: stack.join(', ') },
	].filter(Boolean);

	return (
		<section aria-label={`${client} overview`} className="reveal mt-14 overflow-hidden rounded-3xl border border-[#332c22] bg-[#1b1712] sm:mt-20">
			{cover && (
				<div className="group relative aspect-16/10 overflow-hidden border-b border-[#332c22] bg-[#f6f0e6]">
					<img
						src={cover}
						alt={`${client} website, home page`}
						decoding="async"
						className="absolute inset-0 size-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
					/>
				</div>
			)}

			<div className="grid gap-10 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-14 md:p-12">
				<div>
					<p className="eyebrow">Overview</p>
					<p className="mt-4 text-2xl leading-tight tracking-[-0.02em] text-[#f6f0e6] md:text-3xl">{summary}</p>
					<dl className="mt-8 space-y-4 border-t border-[#332c22] pt-6 text-sm">
						{meta.map((item) => (
							<div key={item.label} className="grid grid-cols-[4.5rem_1fr] gap-3">
								<dt className="text-[#a89a86]">{item.label}</dt>
								<dd className="text-[#f6f0e6]">{item.value}</dd>
							</div>
						))}
					</dl>
				</div>

				{highlights.length > 0 && (
					<div>
						<p className="eyebrow">Highlights</p>
						<ol className="mt-4 grid gap-x-10 gap-y-8 sm:grid-cols-2">
							{highlights.map((item, index) => (
								<li key={item.title} className="border-t border-[#332c22] pt-5">
									<span className="text-sm text-[#c1734a]">0{index + 1}</span>
									<p className="mt-3 text-lg text-[#f6f0e6]">{item.title}</p>
									<p className="mt-1.5 text-sm leading-6 text-[#a89a86]">{item.body}</p>
								</li>
							))}
						</ol>
					</div>
				)}
			</div>

			{facts.length > 0 && (
				<dl className="grid grid-cols-2 border-t border-[#332c22] md:grid-cols-4">
					{facts.map((fact, index) => (
						<div
							key={fact.label}
							className={`flex flex-col-reverse px-6 py-6 sm:px-8 md:px-12 ${index % 2 ? 'border-l' : ''} ${
								index >= 2 ? 'border-t md:border-t-0' : ''
							} ${index > 0 ? 'md:border-l' : ''} border-[#332c22]`}
						>
							<dt className="mt-1 text-sm text-[#a89a86]">{fact.label}</dt>
							<dd className="text-3xl tracking-tight text-[#f6f0e6] md:text-4xl">{fact.value}</dd>
						</div>
					))}
				</dl>
			)}
		</section>
	);
}
