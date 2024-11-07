import { type CollectionEntry, getCollection } from 'astro:content';
import { getLastSegment } from '@/lib/utils.ts';

const getPostsInSearch = async () => {
  const posts = await getCollection('notes', ({ data }: CollectionEntry<'notes'>) => {
    return import.meta.env.MODE === 'production' ? data.published : true;
  });
  if (!posts.length) return [];

  return posts.map(post => ({
    slug: getLastSegment(post.slug),
    title: post.data.title,
    tags: post.data.tags,
    date: post.data.createDate
  }));
};

export async function GET({}) {
  return new Response(JSON.stringify(await getPostsInSearch()), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
