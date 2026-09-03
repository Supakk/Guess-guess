import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Mdx from '@/components/mdx/Mdx';
import { getEntry, getPosts } from '@/lib/content';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
	return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { slug } = await params;
	const post = await getEntry('blog', slug);
	if (!post) return {};
	return {
		title: post.data.title,
		description: post.data.summary,
		alternates: { canonical: `/blog/${slug}` },
		openGraph: { type: 'article', title: post.data.title, description: post.data.summary },
	};
}

export default async function BlogPostPage({ params }: Params) {
	const { slug } = await params;
	const post = await getEntry('blog', slug);
	if (!post) notFound();

	return (
		<article className="container py-20 md:py-32">
			<p className="eyebrow">
				{post.data.published.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
			</p>
			<h1 className="mt-8 max-w-4xl text-6xl font-medium leading-[0.92] tracking-[-0.05em] md:text-8xl">
				{post.data.title}
			</h1>
			<div className="mt-20 max-w-2xl text-lg leading-8 text-[#a89a86]">
				<Mdx source={post.body} />
			</div>
		</article>
	);
}
