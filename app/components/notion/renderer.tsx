import { Block, type BlockProps } from "./block";
import { NotionContextProvider, useNotionContext, type PartialNotionContext } from "./context";

type NotionBlockRendererProps = Omit<BlockProps, "block"> & {
  blockId?: string;
};

export function NotionRenderer({
  blockId,
  hideBlockId,
  disableHeader,
  level = 0,
  ...props
}: PartialNotionContext & NotionBlockRendererProps) {
  return (
    <NotionContextProvider {...props}>
      <NotionBlockRenderer blockId={blockId} hideBlockId={hideBlockId} disableHeader={disableHeader} level={level} />
    </NotionContextProvider>
  );
}

export function NotionBlockRenderer({ level = 0, blockId, ...props }: NotionBlockRendererProps) {
  const { recordMap } = useNotionContext();
  const id = blockId || Object.keys(recordMap.block)[0];
  const block = recordMap.block[id]?.value as BlockProps["block"];

  if (!block) {
    if (import.meta.env.DEV) {
      console.warn(`missing block`, blockId);
    }
    return null;
  }

  return (
    <Block key={id} level={level} block={block} {...props}>
      {block?.content?.map((contentBlockId) => (
        <NotionBlockRenderer key={contentBlockId} blockId={contentBlockId} level={level + 1} {...props} />
      ))}
    </Block>
  );
}
