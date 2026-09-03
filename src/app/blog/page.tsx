import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/content';

export const metadata: Metadata = {
	title: 'Insights',
	description: 'Notes from the practice — process, design, and the work behind the work.',
	alternates: { canonical: '/blog' },
};

export default async function BlogIndexPage() {
	const posts = await getPosts();

	return (
		<section className="container py-20 md:py-32">
			<p className="eyebrow">Insights</p>
			<h1 className="mt-8 max-w-3xl text-6xl font-medium leading-[0.92] tracking-[-0.05em] md:text-8xl">
				Notes from the practice.
			</h1>
			<div className="mt-24 max-w-3xl">
				{posts.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="flex flex-col justify-between gap-4 border-t border-[#332c22] py-6 md:flex-row"
						data-reveal
					>
						<div>
							<h2 className="text-2xl">{post.data.title}</h2>
							<p className="mt-2 text-[#a89a86]">{post.data.summary}</p>
						</div>
						<time className="text-sm text-[#a89a86]" dateTime={post.data.published.toISOString()}>
							{post.data.published.toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}
						</time>
					</Link>
				))}
			</div>
		</section>
	);
}
