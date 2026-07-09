import { z } from 'zod';

import { SITE_NAME } from '@/lib/seo';

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'date deve ser uma data ISO 8601 válida',
  }),
  slug: z.string().min(1),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  author: z.string().default(SITE_NAME),
  draft: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
