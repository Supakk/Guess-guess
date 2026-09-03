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
	tags: z.array(z.string()),
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
	return entries.sort((a, b) => b.data.year - a.data.year);
}

export async function getPosts(): Promise<BlogEntry[]> {
	const entries = await readCollection('blog');
	return entries.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export async function getEntry<C extends Collection>(collection: C, slug: string): Promise<Entry<C> | undefined> {
	const entries = await readCollection(collection);
	return entries.find((entry) => entry.slug === slug);
}
