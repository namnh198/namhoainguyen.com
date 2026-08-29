import type {
  Block,
  ExtendedRecordMap,
  Collection,
  CollectionView,
  NotionMapBox,
  Decoration,
  User,
} from "notion-types";

/**
 * Gets the IDs of all blocks contained on a page starting from a root block ID.
 */
export const getPageBlockIds = (
  recordMap: ExtendedRecordMap,
  blockId?: string,
): string[] => {
  const rootBlockId = blockId || Object.keys(recordMap.block)[0]!;
  const contentBlockIds = new Set<string>();

  function addContentBlocks(blockId: string) {
    if (contentBlockIds.has(blockId)) return;
    contentBlockIds.add(blockId);

    const block = getBlockValue(recordMap.block[blockId]);
    if (!block) return;

    const { content, type, properties, format } = block;
    if (properties) {
      // TODO: this needs some love, especially for resolving relation properties
      // see this collection_view_page for an example: 8a586d253f984b85b48254da84465d23
      for (const key of Object.keys(properties)) {
        const p = properties[key];
        if (!p) continue;

        for (const d of p) {
          const value = d?.[0]?.[1]?.[0];
          if (value?.[0] === "p" && value[1]) {
            addContentBlocks(value[1]);
          }
        }

        // [["‣", [["p", "841918aa-f2a3-4d4c-b5ad-64b0f57c47b8"]]]]
        const value = p?.[0]?.[1]?.[0];

        if (value?.[0] === "p" && value[1]) {
          addContentBlocks(value[1]);
        }
      }
    }

    if (format) {
      const referenceId = format.transclusion_reference_pointer?.id;
      if (referenceId) {
        addContentBlocks(referenceId);
      }

      const aliasId = (format as any).alias_pointer?.id;
      if (aliasId) {
        addContentBlocks(aliasId);
      }
    }

    if (!content || !Array.isArray(content)) {
      // no child content blocks to recurse on
      return;
    }

    if (blockId !== rootBlockId) {
      if (type === "page" || type === "collection_view_page") {
        // ignore the content of other pages and collections
        return;
      }
    }

    for (const blockId of content) {
      addContentBlocks(blockId);
    }
  }

  addContentBlocks(rootBlockId);
  return Array.from(contentBlockIds);
};

export function getBlockTitle(block: Block, recordMap: ExtendedRecordMap) {
  if (block.properties?.title) {
    return getTextContent(block.properties.title);
  }

  if (
    block.type === "collection_view_page" ||
    block.type === "collection_view"
  ) {
    const collectionId = getBlockCollectionId(block, recordMap);

    if (collectionId) {
      const collection = getBlockValue(recordMap.collection[collectionId]);

      if (collection) {
        return getTextContent(collection.name);
      }
    }
  }

  return "";
}

export function getBlockCollectionId(
  block: Block,
  recordMap: ExtendedRecordMap,
): string | null {
  const collectionId =
    (block as any).collection_id ||
    (block as any).format?.collection_pointer?.id;

  if (collectionId) {
    return collectionId;
  }

  const collectionViewId = (block as any)?.view_ids?.[0];
  if (collectionViewId) {
    const collectionView = getBlockValue(
      recordMap.collection_view?.[collectionViewId],
    );

    if (collectionView) {
      const collectionId = collectionView.format?.collection_pointer?.id;
      return collectionId;
    }
  }

  return null;
}

// This helper unboxes a block value in a generic way which became necessary
// after Notion changed their API for some blocks to be doubly-nested.
// https://github.com/NotionX/react-notion-x/issues/682

export function getBlockValue<
  T extends Block | Collection | CollectionView | User,
>(block: T | NotionMapBox<T> | undefined): T | undefined {
  if (!block) {
    return undefined;
  }

  if ((block as any).value) {
    return getBlockValue((block as any).value);
  }

  if (!(block as any).id) {
    return undefined;
  }

  return block as any as T;
}

export const getTextContent = (text?: Decoration[]): string => {
  if (!text) {
    return "";
  } else if (Array.isArray(text)) {
    return (
      text?.reduce(
        (prev, current) =>
          prev + (current[0] !== "⁍" && current[0] !== "‣" ? current[0] : ""),
        "",
      ) ?? ""
    );
  } else {
    return text;
  }
};
