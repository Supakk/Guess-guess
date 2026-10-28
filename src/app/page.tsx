import Link from 'next/link';
import ContactForm from '@/components/ui/ContactForm';
import { getPosts, getWork } from '@/lib/content';
import { principles, serviceDetails } from '@/lib/site';

export default async function HomePage() {
	const [projects, posts] = await Promise.all([getWork(), getPosts()]);

	return (
		<>
			<section className="container pb-28 pt-20 md:pb-40 md:pt-36">
				<p className="eyebrow reveal">UX/UI design & frontend development / Bangkok</p>
				<h1 className="display reveal mt-8 max-w-5xl">
					We solve
					<br />
					<em className="font-pixel not-italic text-[#a15c34]">problems</em>, not pages.
				</h1>
				<div className="mt-12 flex flex-col justify-between gap-8 border-t border-[#332c22] pt-5 md:flex-row">
					<p className="reveal max-w-sm text-lg leading-7 text-[#a89a86]">
						We find what is actually broken in your product experience — then design and build the fix.
					</p>
					<a
						className="glass reveal w-fit rounded-full px-5 py-4 text-sm transition-colors hover:bg-[#c1734a]/30"
						href="/work"
					>
						See problems we've solved
					</a>
				</div>
			</section>

			{/* Desktop teaser — mobile gets the full sections below instead, so this would be redundant there. */}
			<section className="hidden bg-[#f6f0e6] py-20 text-[#15120d] md:block md:py-28" data-nav-theme="light">
				<div className="container">
					<p className="eyebrow text-[#7d7364]">Problems we fix</p>
					<div className="mt-10 grid gap-4 md:grid-cols-3">
						{serviceDetails.map((service, index) => (
							<div key={service.title} className="border-t border-[#e3dbcb] pt-5" data-reveal>
								<span className="text-sm text-[#a15c34]">0{index + 1}</span>
								<h2 className="mt-16 text-2xl">{service.problem}</h2>
									<p className="mt-3 text-sm text-[#7d7364]">{service.title}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="container hidden py-24 md:block md:py-32">
				<p className="eyebrow">How we work</p>
				<div className="mt-8 flex flex-col justify-between gap-8 md:flex-row">
					<h2 className="max-w-2xl text-4xl font-medium leading-tight tracking-[-0.04em] md:text-6xl">
						Good work starts with naming the real problem.
					</h2>
					<a href="/about" className="h-fit text-sm underline underline-offset-8">
						More about us
					</a>
				</div>
			</section>

			<section id="services" className="container border-t border-[#332c22] py-16 md:hidden">
				<p className="eyebrow">Services</p>
				<h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-[-0.03em]">
					Tell us what&apos;s broken. We&apos;ll fix it.
				</h2>
				<div className="mt-10 grid gap-10">
					{serviceDetails.map((service, index) => (
						<article key={service.title} data-reveal>
							<span className="text-sm text-[#a15c34]">0{index + 1}</span>
							<h3 className="mt-3 text-xl">{service.problem}</h3>
								<p className="mt-1 text-sm text-[#a15c34]">{service.title}</p>
							<p className="mt-2 leading-7 text-[#a89a86]">{service.body}</p>
						</article>
					))}
				</div>
			</section>

			<section id="work" className="container border-t border-[#332c22] py-16 md:hidden">
				<p className="eyebrow">Case studies</p>
				<h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-[-0.03em]">Problems we&apos;ve solved.</h2>
				<div className="mt-10 grid gap-10">
					{projects.map((project) => (
						<Link key={project.slug} href={`/work/${project.slug}`} className="work-card group" data-reveal>
							<div className="relative aspect-4/3 bg-[#c1734a] p-6 text-[#15120d]">
								<span className="glass-light absolute left-6 top-6 rounded-full px-3 py-1 text-sm">
									{project.data.year}
								</span>
								<div className="flex h-full items-end">
									<span className="text-3xl tracking-tight">{project.data.client}</span>
								</div>
							</div>
							<h3 className="mt-4 text-lg">{project.data.problem}</h3>
							<p className="mt-1 text-sm text-[#a89a86]">{project.data.tags.join(' / ')}</p>
						</Link>
					))}
				</div>
			</section>

			<section id="about" className="container border-t border-[#332c22] py-16 md:hidden">
				<p className="eyebrow">About</p>
				<h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-[-0.03em]">
					We solve problems, then make them look good.
				</h2>
				<p className="mt-4 text-[#a89a86]">
					Eunyu is an independent practice that solves product experience problems. We diagnose what is broken,
					then design and build the fix — in Figma and in code.
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
