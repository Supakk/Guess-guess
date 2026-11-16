import type { Metadata } from 'next';
import WorkCard from '@/components/ui/WorkCard';
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
			<p className="eyebrow reveal">Case studies</p>
			<h1 className="reveal mt-8 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl sm:leading-[0.92] sm:tracking-tighter md:text-8xl">
				Problems we&apos;ve solved.
			</h1>
			<div className="mt-16 grid gap-x-8 gap-y-16 sm:mt-24 md:grid-cols-2">
				{projects.map((project) => (
					<WorkCard key={project.slug} project={project} />
				))}
			</div>
		</section>
	);
}
