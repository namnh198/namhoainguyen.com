import type { AstroComponentFactory } from 'astro/runtime/server';
import type { MarkdownHeading } from 'astro';
import type { Icon } from 'virtual:astro-icon';

export type Colors =
  | 'text'
  | 'rosewater'
  | 'flamingo'
  | 'pink'
  | 'mauve'
  | 'red'
  | 'maroon'
  | 'peach'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'sky'
  | 'lavender'
  | 'sapphire'
  | 'blue'
  | 'overlay0';

export type NavMenuProps = {
  title: string;
  href: string;
  external?: boolean;
  icon?: Icon;
  iconColor?: Colors;
  className?: string;
};

export type FooterProps = {
  title: string;
  menu: NavMenuProps[];
  className?: string;
};

export type MetaTag = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  openGraph?: {
    url?: string;
    siteName?: string;
    images?: {
      url?: string;
      width?: number;
      height?: number;
    };
  };
};

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  tags?: Tag[];
  createDate: Date;
  updateDate: Date;
  draft?: boolean;
  published?: boolean;
  verified?: boolean;
  hideToc?: boolean;
  headings?: MarkdownHeading[];
  Content?: AstroComponentFactory;
  readingTime?: number;
  isNew?: boolean;
  isUpdated?: boolean;
  createLabel?: boolean;
  updateLabel?: string;
  meta?: MetaTag;
}

export interface Tag {
  slug: string;
  name: string;
  color?: string;
  pinned?: boolean | null;
  icon?: string;
  excerpt?: string;
  posts?: Post[];
}

export interface BookmarkItem {
  name: string;
  url: string;
  image?: string;
  excerpt?: string;
  invertDark?: boolean;
  pinned?: boolean;
}

export interface Bookmark {
  title: string;
  list: Array<BookmarkItem>;
}

type Project = {
  name: string;
  url: string;
  type: string;
  color: string;
};

export type Toc = {
  depth: number;
  slug: string;
  text: string;
  subheadings: Array<Toc>;
};
