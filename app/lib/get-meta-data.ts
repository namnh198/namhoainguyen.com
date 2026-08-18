import type { MetaDescriptor } from "react-router";

export function getMetaData({
  title,
  desc,
  img,
  prefix = true,
}: {
  title: string;
  desc?: string;
  img?: any[];
  prefix?: boolean;
}): MetaDescriptor[] {
  const metaData: MetaDescriptor[] = [
    {
      title: `${title}${prefix ? " | Nam Hoai Nguyen" : ""}`,
    },
  ];

  if (desc) {
    metaData.push({
      name: "description",
      content: desc,
    });
  }

  return metaData;
}
