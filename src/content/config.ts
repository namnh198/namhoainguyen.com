import { defineCollection, z } from 'astro:content';

const metaDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      canonical: z.string().url().optional(),
      robots: z
        .object({
          index: z.boolean().default(true),
          follow: z.boolean().default(true)
        })
        .optional(),
      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string().optional(),
                width: z.number().optional(),
                height: z.number().optional()
              })
            )
            .optional()
        })
        .optional()
    })
    .optional();

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false).optional(),
    published: z.boolean().default(false).optional(),
    createDate: z.date().optional(),
    updateDate: z.date().optional(),
    verified: z.boolean().default(false).optional(),
    hideToc: z.boolean().default(false).optional(),
    metadata: metaDefinition()
  })
});

export const collections = { notes };
