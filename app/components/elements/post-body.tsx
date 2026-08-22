import type { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "../notion/renderer";
import { useMemo } from "react";
import { Link as ReactLink, type LinkProps } from "react-router";
import { LazyImage } from "../ui/lazy-image";
import type { BlockOptionContext } from "../notion/context";
import type { Post } from "~/lib/types";
import { DiscreteHeading } from "../notion/discrete-heading";
import { Heading } from "../notion/heading";

export function PostBody({
  post,
  recordMap,
  blockOptions,
  className,
}: {
  post: Post;
  recordMap: ExtendedRecordMap;
  className?: string;
  blockOptions?: BlockOptionContext;
}) {
  const components = useMemo(
    () => ({
      PageLink: Link,
      Link: Link,
      Image: LazyImage,
      Header: post.discrete ? DiscreteHeading : Heading,
    }),
    [],
  );
  return (
    <section className={className}>
      <NotionRenderer recordMap={recordMap} components={components} level={0} blockOptions={blockOptions} />
    </section>
  );
}

const Link: React.FC<Omit<LinkProps, "to"> & { href: string }> = ({ href, ...props }) => {
  return <ReactLink to={href} {...props} />;
};
