const services = ['Brand direction', 'Websites & digital products', 'Design systems'];

export default function HomePage() {
	return (
		<>
			<section className="container pb-28 pt-20 md:pb-40 md:pt-36">
				<p className="eyebrow reveal">Independent digital studio / Bangkok</p>
				<h1 className="display reveal mt-8 max-w-5xl">
					Useful things,
					<br />
					<em className="font-serif not-italic text-[#a15c34]">beautifully</em> made.
				</h1>
				<div className="mt-12 flex flex-col justify-between gap-8 border-t border-[#332c22] pt-5 md:flex-row">
					<p className="reveal max-w-sm text-lg leading-7 text-[#a89a86]">
						We help ambitious people turn complex ideas into clear, confident digital experiences.
					</p>
					<a
						className="glass reveal w-fit rounded-full px-5 py-3 text-sm transition-colors hover:bg-[#c1734a]/30"
						href="/work"
					>
						See selected work <span aria-hidden="true">↗</span>
					</a>
				</div>
			</section>

			<section className="bg-[#f6f0e6] py-20 text-[#15120d] md:py-28">
				<div className="container">
					<p className="eyebrow text-[#7d7364]">What we do</p>
					<div className="mt-10 grid gap-4 md:grid-cols-3">
						{services.map((service, index) => (
							<div key={service} className="border-t border-[#e3dbcb] pt-5" data-reveal>
								<span className="text-sm text-[#a15c34]">0{index + 1}</span>
								<h2 className="mt-16 text-2xl">{service}</h2>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="container py-24 md:py-32">
				<p className="eyebrow">A small practice, thoughtfully run</p>
				<div className="mt-8 flex flex-col justify-between gap-8 md:flex-row">
					<h2 className="max-w-2xl text-4xl font-medium leading-tight tracking-[-0.04em] md:text-6xl">
						Good work starts with a good question.
					</h2>
					<a href="/about" className="h-fit text-sm underline underline-offset-8">
						More about us ↗
					</a>
				</div>
			</section>
		</>
	);
}
