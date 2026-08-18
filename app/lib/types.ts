export type Tag = {
  name: string;
  slug: string;
  icon?: string;
  pinned?: boolean;
  tooltip?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  icon?: string;
  tags: Tag[];
  published?: boolean;
  pinned?: boolean;
  verified?: boolean;
  discrete?: boolean;
  hide?: boolean;
  language?: "en" | "vi";
  notionUrl?: string;
};
