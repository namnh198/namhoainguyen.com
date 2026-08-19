import type { Block, Decoration, ExtendedRecordMap } from "notion-types";

import { getBlockValue } from "./get-block-value";

export function getBlockTitle(block: Block, recordMap: ExtendedRecordMap) {
  if (block.properties?.title) {
    return getTextContent(block.properties.title);
  }

  if (block.type === "collection_view_page" || block.type === "collection_view") {
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

export const getTextContent = (text?: Decoration[]): string => {
  if (!text) {
    return "";
  } else if (Array.isArray(text)) {
    return (
      text?.reduce((prev, current) => prev + (current[0] !== "⁍" && current[0] !== "‣" ? current[0] : ""), "") ?? ""
    );
  } else {
    return text;
  }
};

export function getBlockCollectionId(block: Block, recordMap: ExtendedRecordMap): string | null {
  const collectionId = (block as any).collection_id || (block as any).format?.collection_pointer?.id;

  if (collectionId) {
    return collectionId;
  }

  const collectionViewId = (block as any)?.view_ids?.[0];
  if (collectionViewId) {
    const collectionView = getBlockValue(recordMap.collection_view?.[collectionViewId]);

    if (collectionView) {
      const collectionId = collectionView.format?.collection_pointer?.id;
      return collectionId;
    }
  }

  return null;
}
