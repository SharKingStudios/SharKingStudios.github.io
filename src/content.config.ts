import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/features/blog/content',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.object({
        url: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()).optional(),
      relatedPosts: z.array(reference('blog')),
      readingTimeMinutes: z.number().optional(), // Added by remark plugin
      isDraft: z.boolean(),
      lang: z.enum(['fr', 'en']).optional().default('fr'),
    }),
});

const tipsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/features/tips/content',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      isDraft: z.boolean().default(false),
      heroImage: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      lang: z.enum(['fr', 'en']).optional().default('fr'),
      relatedTips: z.array(reference('tips')).optional(),
      featured: z.boolean().optional(),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    }),
});

export const collections = {
  blog: blogCollection,
  tips: tipsCollection,
};
