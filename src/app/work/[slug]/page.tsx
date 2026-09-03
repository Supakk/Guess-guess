import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Mdx from '@/components/mdx/Mdx';
import { getEntry, getWork } from '@/lib/content';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
	return (await getWork()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { slug } = await params;
	const project = await getEntry('work', slug);
	if (!project) return {};
	return {
		title: project.data.title,
		description: project.data.summary,
		alternates: { canonical: `/work/${slug}` },
		openGraph: { type: 'article', title: project.data.title, description: project.data.summary },
	};
}

export default async function WorkDetailPage({ params }: Params) {
	const { slug } = await params;
	const project = await getEntry('work', slug);
	if (!project) notFound();

	return (
		<article className="container py-20 md:py-32">
			<p className="eyebrow">
				{project.data.client} / {project.data.year}
			</p>
			<h1 className="mt-8 max-w-4xl text-6xl font-medium leading-[0.92] tracking-[-0.05em] md:text-8xl">
				{project.data.title}
			</h1>
			<div className="mt-20 max-w-2xl text-lg leading-8 text-[#a89a86]">
				<Mdx source={project.body} />
			</div>
		</article>
	);
}
