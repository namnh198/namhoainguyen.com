import { type CollectionEntry, getCollection, render } from 'astro:content';
import type { Post, Tag } from '@/types';
import { cleanSlug, getLastSegment, randomColor } from './utils';
import { tags } from '../data/tags';

let _posts: Post[], _tags: Tag[];

export const recentTag: Tag = {
  name: 'Recent updated notes',
  slug: 'recent',
  color: 'mauve'
};

export const getPosts = async () => {
  if (_posts && _posts.length) {
    return _posts;
  }

  const posts = await getCollection('notes', ({ data }: CollectionEntry<'notes'>) => {
    return import.meta.env.MODE === 'production' ? data.published : true;
  });

  _posts = await Promise.all(posts.map(normalizedPost)).then(res => {
    return res.sort((a, b) => b.updateDate.valueOf() - a.updateDate.valueOf());
  });

  return _posts;
};

export const getTags = async () => {
  if (_tags) {
    return _tags;
  }

  const posts = await getPosts();

  const tags = {};

  if (posts && posts.length) {
    posts.forEach(post => {
      post?.tags?.forEach(tag => {
        tags[tag.slug] = tag;
      });
    });
  }

  _tags = Object.values(tags);

  return _tags;
};

const normalizedPost = async (post: CollectionEntry<'notes'>): Promise<Post> => {
  const { id, data } = post;
  const {
    title,
    published,
    tags: rawTags = [],
    createDate: rawCreateDate = new Date(),
    updateDate: rawUpdateDate,
    verified,
    draft,
    hideToc
  } = data;

  const slug = getLastSegment(id);
  const { Content, headings, remarkPluginFrontmatter } = await render(post);
  const tags = rawTags.map(normalizedTag);
  const createDate = new Date(rawCreateDate);
  const updateDate = new Date(rawUpdateDate || createDate);

  return {
    id,
    title,
    slug,
    tags,
    published,
    verified,
    hideToc,
    createDate,
    updateDate,
    draft,
    headings,
    Content,
    readingTime: remarkPluginFrontmatter?.readingTime,
    isNew: remarkPluginFrontmatter?.isNew,
    isUpdated: remarkPluginFrontmatter?.isUpdated,
    createLabel: remarkPluginFrontmatter?.createLabel,
    updateLabel: remarkPluginFrontmatter?.updateLabel
  };
};

const normalizedTag = (tag: string): Tag => {
  const postTag = tags.find(t => t.slug.toLowerCase() === tag.toLowerCase());
  if (postTag) {
    return postTag;
  }

  const slug = cleanSlug(tag).toLowerCase();
  const makeTitle = (slug: string): string => {
    const words = slug.split('-');

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(' ');
  };

  return {
    slug,
    name: makeTitle(tag),
    color: randomColor(),
    pinned: false
  };
};
