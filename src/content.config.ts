import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
	schema: z.object({
		date: z.date(),
		description: z.string(),
		lastModified: z.date(),
		tags: z.array(z.string()).min(1).max(5),
		title: z.string(),
		url: z.string().url()
	})
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
	schema: z.object({
		date: z.date(),
		description: z.string(),
		lastModified: z.date(),
		slug: z.string(),
		tags: z.array(z.string()).min(1).max(5),
		techStack: z.array(z.string()).min(1).max(5),
		title: z.string(),
		url: z.string().url()
	})
});

export const collections = { articles, projects };
