import type { Metadata } from 'next';
import Link from 'next/link';
import { getWork } from '@/lib/content';

export const metadata: Metadata = {
	title: 'Work',
	description: 'Case studies — the problem, how we diagnosed it, and what got better.',
	alternates: { canonical: '/work' },
};

export default async function WorkIndexPage() {
	const projects = await getWork();

	return (
		<section className="container py-20 md:py-32">
			<p className="eyebrow">Case studies</p>
			<h1 className="mt-8 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl sm:leading-[0.92] sm:tracking-tighter md:text-8xl">
				Problems we&apos;ve solved.
			</h1>
			<div className="mt-16 grid gap-x-8 gap-y-16 sm:mt-24 md:grid-cols-2">
				{projects.map((project) => (
					<Link key={project.slug} href={`/work/${project.slug}`} className="work-card group" data-reveal>
						<div className="relative aspect-4/3 bg-[#c1734a] p-6 text-[#15120d]">
							<span className="glass-light absolute left-6 top-6 rounded-full px-3 py-1 text-sm">
								{project.data.year}
							</span>
							<div className="flex h-full items-end">
								<span className="text-4xl tracking-tight transition-transform group-hover:translate-x-2">
									{project.data.client}
								</span>
							</div>
						</div>
						<h2 className="mt-4 text-xl">{project.data.problem}</h2>
						<p className="mt-1 text-[#a89a86]">{project.data.summary}</p>
						<p className="mt-2 text-sm text-[#a89a86]">{project.data.tags.join(' / ')}</p>
					</Link>
				))}
			</div>
		</section>
	);
}
