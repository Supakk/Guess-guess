export default function SectionIntro({ eyebrow, title, body, media = '' }) {
	return (
		<div className="grid gap-5 md:grid-cols-[1fr_2fr]" data-reveal>
			<div>
				<p className="eyebrow">{eyebrow}</p>
				{media && (
					<img
						src={media}
						alt=""
						aria-hidden="true"
						className="mt-6 hidden w-full max-w-[220px] md:block"
					/>
				)}
			</div>
			<div>
				<h1 className="max-w-3xl text-5xl font-medium leading-[0.95] tracking-tighter md:text-7xl">{title}</h1>
				{body && <p className="mt-6 max-w-xl text-lg leading-8 text-[#a89a86]">{body}</p>}
			</div>
		</div>
	);
}
