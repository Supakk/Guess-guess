import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Mdx from '@/components/mdx/Mdx';
import AutoVideo from '@/components/ui/AutoVideo';
import ProjectOverview from '@/components/ui/ProjectOverview';
import { getCaseStudies, getEntry } from '@/lib/content';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
	return (await getCaseStudies()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { slug } = await params;
	const project = await getEntry('work', slug);
	if (!project || project.data.status !== 'live') return {};
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
	if (!project || project.data.status !== 'live') notFound();

	const gallery = project.data.videos;
	const arrow = (
		<span className="ba-icon" aria-hidden="true">
			<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
				<path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
			</svg>
		</span>
	);

	return (
		<article className="container py-20 md:py-32">
			<p className="eyebrow reveal">
				{project.data.client} / {project.data.year} / {project.data.tags.join(', ')}
			</p>
			<h1 className="reveal mt-8 max-w-5xl text-4xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl sm:leading-[0.92] sm:tracking-tighter md:text-8xl">
				{project.data.title}
			</h1>

			{(project.data.url || project.data.repo) && (
				<div className="reveal mt-10 flex flex-wrap gap-3">
					{project.data.url && (
						<a
							href={project.data.url}
							target="_blank"
							rel="noopener noreferrer"
							className="press btn-arrow rounded-full bg-[#f6f0e6] px-6 py-3 text-sm text-[#15120d] hover:bg-[#c1734a]"
						>
							<span className="ba-label">Visit live site</span>
							{arrow}
						</a>
					)}
					{project.data.repo && (
						<a
							href={project.data.repo}
							target="_blank"
							rel="noopener noreferrer"
							className="glass press btn-arrow rounded-full px-6 py-3 text-sm hover:bg-[#c1734a]/30"
						>
							<span className="ba-label">View code on GitHub</span>
							{arrow}
						</a>
					)}
				</div>
			)}

			<ProjectOverview project={project} />

			<div className="mt-12 max-w-2xl text-lg leading-8 text-[#a89a86] sm:mt-20" data-reveal>
				<Mdx source={project.body} />
			</div>

			{gallery.length > 0 && (
				<section className="mt-20 border-t border-[#332c22] pt-8 sm:mt-28">
					<p className="eyebrow">Inside the product</p>
					<div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
						{gallery.map((video) => (
							<figure key={video.src} data-reveal>
								<div className="overflow-hidden rounded-2xl border border-[#332c22] bg-[#f6f0e6]">
									<AutoVideo
										src={video.src}
										poster={video.poster}
										label={`${project.data.client} — ${video.title}`}
										className="block aspect-16/10 w-full object-cover"
									/>
								</div>
								<figcaption className="mt-4">
									<span className="text-lg">{video.title}</span>
									{video.caption && <p className="mt-1 text-sm leading-6 text-[#a89a86]">{video.caption}</p>}
								</figcaption>
							</figure>
						))}
					</div>
				</section>
			)}
		</article>
	);
}
