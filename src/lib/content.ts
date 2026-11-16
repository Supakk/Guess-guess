import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

const workSchema = z.object({
	title: z.string(),
	client: z.string(),
	year: z.number(),
	summary: z.string(),
	problem: z.string(),
	tags: z.array(z.string()),
	/** `in-progress` work gets a placeholder card that links to `repo`, and no case study page yet. */
	status: z.enum(['live', 'in-progress']).default('live'),
	/** Where an in-progress project is, e.g. { step: 1, of: 5, label: 'Notch window and playback' }. */
	progress: z.object({ step: z.number(), of: z.number(), label: z.string() }).optional(),
	/** Live site and source code, shown as links on the case study. */
	url: z.url().optional(),
	repo: z.url().optional(),
	/** Still image for the work card and the case study overview. */
	cover: z.string().optional(),
	/** Tools the project was built with, listed in the overview card. */
	stack: z.array(z.string()).default([]),
	/** The few things that matter most about the project, listed in the overview card. */
	highlights: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
	/** Short numbers shown under the highlights, e.g. { value: '26', label: 'house styles' }. */
	facts: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
	/** Screen recordings under /public, shown in the "Inside the product" gallery. */
	videos: z
		.array(
			z.object({
				src: z.string(),
				poster: z.string(),
				title: z.string(),
				caption: z.string().optional(),
			}),
		)
		.default([]),
});

const blogSchema = z.object({
	title: z.string(),
	published: z.coerce.date(),
	summary: z.string(),
	tags: z.array(z.string()),
});

const schemas = { work: workSchema, blog: blogSchema };

export type Collection = keyof typeof schemas;
export type WorkEntry = Entry<'work'>;
export type BlogEntry = Entry<'blog'>;
export type Entry<C extends Collection> = {
	slug: string;
	data: z.infer<(typeof schemas)[C]>;
	body: string;
};

async function readCollection<C extends Collection>(collection: C): Promise<Entry<C>[]> {
	const dir = path.join(CONTENT_ROOT, collection);
	const files = (await fs.readdir(dir)).filter((file) => /\.mdx?$/.test(file));

	const entries = await Promise.all(
		files.map(async (file) => {
			const raw = await fs.readFile(path.join(dir, file), 'utf8');
			const { data, content } = matter(raw);
			const parsed = schemas[collection].safeParse(data);
			if (!parsed.success) {
				throw new Error(`Invalid frontmatter in ${collection}/${file}:\n${z.prettifyError(parsed.error)}`);
			}
			return {
				slug: file.replace(/\.mdx?$/, ''),
				data: parsed.data as z.infer<(typeof schemas)[C]>,
				body: content,
			};
		}),
	);

	return entries;
}

export async function getWork(): Promise<WorkEntry[]> {
	const entries = await readCollection('work');
	// Finished work first, then newest first.
	return entries.sort(
		(a, b) => Number(a.data.status === 'in-progress') - Number(b.data.status === 'in-progress') || b.data.year - a.data.year,
	);
}

/** Work that has a case study page (everything except in-progress placeholders). */
export async function getCaseStudies(): Promise<WorkEntry[]> {
	return (await getWork()).filter((entry) => entry.data.status === 'live');
}

export async function getPosts(): Promise<BlogEntry[]> {
	const entries = await readCollection('blog');
	return entries.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export async function getEntry<C extends Collection>(collection: C, slug: string): Promise<Entry<C> | undefined> {
	const entries = await readCollection(collection);
	return entries.find((entry) => entry.slug === slug);
}
