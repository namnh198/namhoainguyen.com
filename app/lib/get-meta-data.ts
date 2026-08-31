import type { MetaDescriptor } from "react-router";

import { ME } from "~/data/me";

export function getMetaData({
  title,
  desc = ME.quote,
  img,
  prefix = true,
}: {
  title: string;
  desc?: string;
  url?: string;
  img?: any[];
  prefix?: boolean;
}): MetaDescriptor[] {
  const ogImage = img || `/api/og-image?title=${encodeURI(title)}&desc=${encodeURI(desc)}`;

  return [
    {
      title: `${title}${prefix ? " | Nam Hoai Nguyen" : ""}`,
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "description",
      content: desc,
    },
    {
      name: "og:description",
      content: desc,
    },
    {
      name: "twitter:description",
      content: desc,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "og:image",
      content: ogImage,
    },
    {
      name: "twitter:image",
      content: ogImage,
    },
  ];
}
