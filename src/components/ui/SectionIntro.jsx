export default function SectionIntro({ eyebrow, title, body }) {
	return (
		<div className="grid gap-5 md:grid-cols-[1fr_2fr]" data-reveal>
			<p className="eyebrow">{eyebrow}</p>
			<div>
				<h1 className="max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">{title}</h1>
				{body && <p className="mt-6 max-w-xl text-lg leading-8 text-[#a89a86]">{body}</p>}
			</div>
		</div>
	);
}
