import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		author: z.string(),
		category: z.string(),
		image: z.string().optional(),
	}),
});

const changelog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/changelog" }),
	schema: z.object({
		version: z.string(),
		pubDate: z.coerce.date(),
	}),
});

export const collections = { blog, changelog };
