import slugify from 'slugify';
import { type AstroSeoProps } from '@astrolib/seo';
import type { Colors } from '@/types';

export const trim = (str = '', char?: string) => {
  let start = 0,
    end = str.length || 0;
  while (start < end && str[start] === char) ++start;
  while (end > start && str[end - 1] === char) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

export const trimSlash = (str: string) => trim(trim(str, '/'));

export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map(slug => slugify(slug))
    .join('/');

export const randomColor = (): Colors => {
  const colors = ['red', 'blue', 'green', 'yellow', 'maroon', 'sky'];
  return <Colors>colors[Math.floor(Math.random() * colors.length)];
};

export const getLastSegment = (slug: string) => {
  return slug.substring(slug.lastIndexOf('/') + 1);
};

export const getMetaData = ({
  title,
  description,
  image
}: {
  title?: string;
  description?: string;
  image?: string;
}): AstroSeoProps => {
  return {
    title: title || "Hi! I'm Nam",
    titleTemplate: '%s',
    description: description,
    openGraph: {
      images: [
        {
          url: image || '/assets/namnh-cover.jpg',
          alt: title,
          width: 1280
        }
      ]
    }
  };
};
