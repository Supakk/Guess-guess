import { getPosts, getWork } from '@/lib/content';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export async function GET() {
	const [posts, projects] = await Promise.all([getPosts(), getWork()]);
	const now = new Date();

	const entries = [
		...['', '/services', '/work', '/about', '/blog', '/contact'].map((route) => ({ path: route, lastModified: now })),
		...projects.map((project) => ({ path: `/work/${project.slug}`, lastModified: now })),
		...posts.map((post) => ({ path: `/blog/${post.slug}`, lastModified: post.data.published })),
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map((entry) => `\t<url><loc>${site.url}${entry.path}</loc><lastmod>${entry.lastModified.toISOString()}</lastmod></url>`)
	.join('\n')}
</urlset>`;

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
