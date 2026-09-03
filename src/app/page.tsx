import Link from 'next/link';
import ContactForm from '@/components/ui/ContactForm';
import { getPosts, getWork } from '@/lib/content';
import { principles, serviceDetails } from '@/lib/site';

const services = ['UX/UI design', 'Design-to-code (Figma & images)', 'Frontend redesign & development'];

export default async function HomePage() {
	const [projects, posts] = await Promise.all([getWork(), getPosts()]);

	return (
		<>
			<section className="container pb-28 pt-20 md:pb-40 md:pt-36">
				<p className="eyebrow reveal">UX/UI design & frontend development / Bangkok</p>
				<h1 className="display reveal mt-8 max-w-5xl">
					Useful things,
					<br />
					<em className="font-serif not-italic text-[#a15c34]">beautifully</em> made.
				</h1>
				<div className="mt-12 flex flex-col justify-between gap-8 border-t border-[#332c22] pt-5 md:flex-row">
					<p className="reveal max-w-sm text-lg leading-7 text-[#a89a86]">
						We turn Figma files and reference designs into fast, faithful, production-ready frontends.
					</p>
					<a
						className="glass reveal w-fit rounded-full px-5 py-3 text-sm transition-colors hover:bg-[#c1734a]/30"
						href="/work"
					>
						See selected work <span aria-hidden="true">↗</span>
					</a>
				</div>
			</section>

			{/* Desktop teaser — mobile gets the full sections below instead, so this would be redundant there. */}
			<section className="hidden bg-[#f6f0e6] py-20 text-[#15120d] md:block md:py-28" data-nav-theme="light">
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

			<section className="container hidden py-24 md:block md:py-32">
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

			{/*
			 * Mobile one-pager — below md the nav loses its links entirely (see
			 * SiteHeader), so every other page's content is folded into the home
			 * route instead. Desktop keeps the separate routes and full nav.
			 */}
			<section id="services" className="container border-t border-[#332c22] py-16 md:hidden">
				<p className="eyebrow">Services</p>
				<h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-[-0.03em]">
					From first question to final pixel.
				</h2>
				<div className="mt-10 grid gap-10">
					{serviceDetails.map((service, index) => (
						<article key={service.title} data-reveal>
							<span className="text-sm text-[#a15c34]">0{index + 1}</span>
							<h3 className="mt-3 text-xl">{service.title}</h3>
							<p className="mt-2 leading-7 text-[#a89a86]">{service.body}</p>
						</article>
					))}
				</div>
			</section>

			<section id="work" className="container border-t border-[#332c22] py-16 md:hidden">
				<p className="eyebrow">Selected work</p>
				<h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-[-0.03em]">Ideas made tangible.</h2>
				<div className="mt-10 grid gap-10">
					{projects.map((project) => (
						<Link key={project.slug} href={`/work/${project.slug}`} className="work-card group" data-reveal>
							<div className="relative aspect-[4/3] bg-[#c1734a] p-6 text-[#15120d]">
								<span className="glass-light absolute left-6 top-6 rounded-full px-3 py-1 text-sm">
									{project.data.year}
								</span>
								<div className="flex h-full items-end">
									<span className="text-3xl tracking-tight">{project.data.client} ↗</span>
								</div>
							</div>
							<h3 className="mt-4 text-lg">{project.data.title}</h3>
							<p className="mt-1 text-sm text-[#a89a86]">{project.data.tags.join(' / ')}</p>
						</Link>
					))}
				</div>
			</section>

			<section id="about" className="container border-t border-[#332c22] py-16 md:hidden">
				<p className="eyebrow">About</p>
				<h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-[-0.03em]">
					Small by design. Serious about outcomes.
				</h2>
				<p className="mt-4 text-[#a89a86]">
					Eunyu is an independent practice for UX/UI design and frontend development. We turn Figma files and
					reference designs into fast, faithful, production-ready interfaces.
				</p>
				<div className="mt-8 space-y-5 text-xl leading-tight">
					{principles.map((principle) => (
						<p key={principle} data-reveal>
							{principle}
						</p>
					))}
				</div>
			</section>

			<section id="blog" className="container border-t border-[#332c22] py-16 md:hidden">
				<p className="eyebrow">Insights</p>
				<h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-[-0.03em]">
					Notes from the practice.
				</h2>
				<div className="mt-10">
					{posts.map((post) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className="flex flex-col gap-2 border-t border-[#332c22] py-6 first:border-t-0"
							data-reveal
						>
							<h3 className="text-xl">{post.data.title}</h3>
							<p className="text-[#a89a86]">{post.data.summary}</p>
							<time className="text-sm text-[#a89a86]" dateTime={post.data.published.toISOString()}>
								{post.data.published.toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}
							</time>
						</Link>
					))}
				</div>
			</section>

			<section id="contact" className="container border-t border-[#332c22] py-16 md:hidden">
				<p className="eyebrow">Start a project</p>
				<h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-[-0.03em]">
					Tell us what you&apos;re thinking.
				</h2>
				<ContactForm className="mt-8" />
			</section>
		</>
	);
}
