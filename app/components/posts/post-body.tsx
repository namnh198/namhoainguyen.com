import type { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "../notion/renderer";
import { useMemo } from "react";
import { Link as ReactLink, type LinkProps } from "react-router";
import { LazyImage } from "../ui/lazy-image";
import type { BlockOptionContext } from "../notion/context";

export function PostBody({
  recordMap,
  blockOptions,
  className,
}: {
  recordMap: ExtendedRecordMap;
  className?: string;
  blockOptions?: BlockOptionContext;
}) {
  const components = useMemo(
    () => ({
      PageLink: Link,
      Link: Link,
      Image: LazyImage,
    }),
    [],
  );
  return (
    <article className={className}>
      <NotionRenderer recordMap={recordMap} components={components} level={0} blockOptions={blockOptions} />
    </article>
  );
}

const Link: React.FC<Omit<LinkProps, "to"> & { href: string }> = ({ href, ...props }) => {
  return <ReactLink to={href} {...props} />;
};
