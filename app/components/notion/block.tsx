import type { Block, CodeBlock, EquationBlock, Block as NotionBlock, PageBlock, TableBlock } from "notion-types";

import { IconSquare, IconSquareCheck } from "@tabler/icons-react";

import { mapBlockColorClass } from "~/lib/helpers";
import { getPageTocs } from "~/lib/notion/get-page-tocs";
import { getListNumber } from "~/lib/notion/utils";
import { cn } from "~/lib/utils";

import { AssetWrapper } from "./asset-wrapper";
import { Bookmark } from "./bookmark";
import { Callout } from "./callout";
import { Code } from "./code";
import { useNotionContext } from "./context";
import { EOI } from "./eoi";
import { Equation } from "./equation";
import { Heading } from "./heading";
import { PageIcon } from "./page-icon";
import { PageTitle } from "./page-title";
import { Text } from "./text";
import { Tocs } from "./tocs";
import { Toggle } from "./toggle";
import { Video } from "./video";

export type BlockProps = {
  block: NotionBlock;
  level: number;
  hideBlockId?: boolean;
  disableHeader?: boolean;
  children?: React.ReactNode;
};

export function Block({ block, level, children }: BlockProps) {
  const ctx = useNotionContext();
  const { recordMap, components, mapPageUrl, blockOptions } = ctx;
  const blockId = `notion-block-${block.id}`;
  const blockColor = block.format?.block_color;

  switch (block.type) {
    case "collection_view_page":
    case "page":
      if (level < 1) {
        const tocs = getPageTocs(block as PageBlock, recordMap);
        return (
          <div className="relative flex flex-col gap-4 lg:flex-row">
            {tocs.length > 0 && <Tocs tocs={tocs} className="w-full lg:order-1 lg:w-75" />}
            <article className="notion-page-content w-full flex-1 shrink-0 lg:w-[calc(100%-308px)]">{children}</article>
          </div>
        );
      }
      return (
        <components.PageLink
          className={cn("notion-page-link", blockColor && `notion-${blockColor}`, blockId)}
          href={mapPageUrl(block.id)}
        >
          {/*<PageTitle block={block} />*/}
        </components.PageLink>
      );
    case "header":
    case "sub_header":
    case "sub_sub_header":
      if (!block.properties) return null;
      if (components.Header) {
        return <components.Header block={block}>{children}</components.Header>;
      }
      return <Heading block={block}>{children}</Heading>;
    case "divider":
      return <hr className={cn("bg-border notion-divider my-6 h-px w-full", [blockId])} />;
    case "text":
      if (!block.properties && !block.content?.length) {
        return <div className={cn("notion-blank", [blockId])}>&nbsp;</div>;
      }
      return (
        <div
          className={cn(
            "notion-text text-text-2 my-3.5 lg:my-5",
            // basicBlockGap,
            // blurBlockClassName,
            blockColor && `notion-${blockColor}`,
            blockId,
          )}
        >
          {/*{updatedBlock}*/}
          {block.properties?.title && <Text value={block.properties.title} block={block} />}

          {children && <div className="notion-text-children">{children}</div>}
        </div>
      );
    case "bulleted_list":
    case "numbered_list": {
      const wrapList = (content: React.ReactNode, start?: number) =>
        block.type === "bulleted_list" ? (
          <ul className={cn("notion-list notion-list-disc text-text-2 relative list-disc pl-6.5", blockId)}>
            {content}
          </ul>
        ) : (
          <ol
            start={start}
            className={cn("notion-list notion-list-numbered text-text-2 relative list-decimal pl-6.5", blockId)}
          >
            {content}
          </ol>
        );

      let output: React.ReactElement | null = null;

      if (block.content) {
        output = (
          <>
            {block.properties && (
              <li className={cn("my-2!")}>
                <Text value={block.properties.title} block={block} />
              </li>
            )}
            {wrapList(children)}
          </>
        );
      } else {
        output = block.properties ? (
          <li className={cn("")}>
            <Text value={block.properties.title} block={block} />
          </li>
        ) : null;
      }

      const isTopLevel = block.type !== (recordMap.block[block.parent_id]?.value as Block)?.type;
      const start = getListNumber(block.id, recordMap.block);

      return isTopLevel ? wrapList(output, start) : output;
    }
    case "embed":
      return <components.Embed blockId={blockId} block={block} />;
    case "tweet":
    case "maps":
    case "pdf":
    case "figma":
    case "typeform":
    case "codepen":
    case "excalidraw":
    case "image":
    case "gist":
      return <AssetWrapper blockId={blockId} block={block} />;
    case "video":
      return (
        <Video
          className={cn(blockId, "relative")}
          caption={<Text value={block.properties.caption!} block={block} />}
          videoUrl={block?.properties?.source?.[0]?.[0]}
        />
      );
    case "quote": {
      if (!block.properties) return null;

      const blockColor = block.format?.block_color;

      return (
        <blockquote
          className={cn(
            "notion-quote relative my-6 px-6 py-4",
            {
              [`notion-${blockColor}`]: blockColor,
              // "text-[115%]": get(block, "format.quote_size") === "large",
            },
            blockId,
          )}
        >
          <div className="quote-divider absolute inset-0 top-0 bottom-0 left-0 w-0.75 bg-linear-[180deg,var(--accent),var(--accent-2)]" />
          <div className={cn("quote-title")}>
            <Text value={block.properties.title} block={block} />
          </div>
          <div className="quote-children">{children}</div>
        </blockquote>
      );
    }
    case "to_do": {
      const isChecked = block.properties?.checked?.[0]?.[0] === "Yes";

      return (
        <div className={cn("notion-to-do relative", blockId)}>
          <div className={cn("flex items-start gap-2")}>
            <div className="mt-0.75 h-4 w-4">
              {isChecked && <IconSquareCheck className="text-slate-500 dark:text-slate-300" size={16} />}
              {!isChecked && <IconSquare className="mt-0.5" size={16} />}
            </div>
            <div>
              <Text value={block.properties?.title} block={block} />
            </div>
          </div>

          <div className="notion-to-do-children pl-6">{children}</div>
        </div>
      );
    }
    case "equation":
      if (components.Equation) {
        return <components.Equation block={block as EquationBlock} inline={false} className={cn(blockId)} />;
      }
      return <Equation block={block as EquationBlock} inline={false} className={cn(blockId)} />;
    case "column_list": {
      return (
        <div className={cn("block-column-list relative md:flex md:flex-nowrap md:gap-4", blockId)}>{children}</div>
      );
    }
    case "column": {
      const ratio = block.format?.column_ratio;
      const parent = recordMap.block[block.parent_id]?.value as Block;
      const nCols = parent?.content?.length || 1;
      let width = "100%";
      if (!ratio || ratio === 1 || nCols >= 5) {
        width = `${100 / nCols}%`;
      } else {
        width = `${ratio * 100}%`;
      }
      return (
        <div className={cn("min-w-full! md:min-w-0!")} style={{ width }}>
          {children}
        </div>
      );
    }
    case "callout":
      if (components.Callout) {
        return <components.Callout block={block} className={cn(blockId)} />;
      } else {
        return (
          <Callout
            className={cn(blockId)}
            icon={<PageIcon block={block} notionDomain={blockOptions.notionDomain} />}
            text={<Text value={block.properties?.title} block={block} />}
            color={block.format?.block_color}
          >
            {!!block.content && <>{children}</>}
          </Callout>
        );
      }
    case "bookmark": {
      return <Bookmark block={block} />;
    }
    case "code":
      if (components.Code) {
        return <components.Code block={block as CodeBlock} />;
      }
      return <Code block={block as CodeBlock} />;
    case "toggle":
      return (
        <Toggle
          className={cn("relative")}
          text={<Text value={block.properties?.title} block={block} />}
          color={block.format?.block_color}
        >
          {children}
        </Toggle>
      );
    case "table":
      return (
        <div className={cn("relative overflow-auto")}>
          <table className={cn("notion-simple-table my-0 table-auto", blockId)}>
            <tbody
              className={cn({
                table_block_column_header: block?.format?.table_block_column_header,
                table_block_row_header: block?.format.table_block_row_header,
              })}
            >
              {children}
            </tbody>
          </table>
        </div>
      );

    case "table_row": {
      const tableBlock = recordMap.block[block.parent_id]?.value as TableBlock;
      const order = tableBlock.format?.table_block_column_order;
      const formatMap = tableBlock.format?.table_block_column_format;
      const backgroundColor = block.format?.block_color;

      if (!tableBlock || !order) {
        return null;
      }

      return (
        <tr className={cn("notion-simple-table-row", backgroundColor && `notion-${backgroundColor}`, blockId)}>
          {order.map((column: any) => {
            const color = formatMap?.[column]?.color;
            return (
              <td key={column} className={cn("border p-2!", [mapBlockColorClass(color!)])}>
                <div className="notion-simple-table-cell">
                  <Text value={block.properties?.[column] || [["ㅤ"]]} block={block} />
                </div>
              </td>
            );
          })}
        </tr>
      );
    }

    case "alias": {
      const blockPointerId = block?.format?.alias_pointer?.id;
      const linkedBlock = recordMap.block[blockPointerId]?.value as Block;
      if (!linkedBlock) {
        console.log('"alias" missing block', blockPointerId);
        return null;
      }

      return (
        <components.PageLink className={cn("notion-page-link", blockPointerId)} href={mapPageUrl(blockPointerId)}>
          <PageTitle block={linkedBlock} />
        </components.PageLink>
      );
    }

    case "external_object_instance": {
      return <EOI block={block} className={cn(blockId)} />;
    }
  }
  return null;
}
