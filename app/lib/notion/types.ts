import type { CollectionInstance as NotionCollectionInstance, ID, PageChunk, ExtendedRecordMap } from "notion-types";

type CollectionInstance = NotionCollectionInstance & {
  allBlockIds: ID[];
};

export type { CollectionInstance, PageChunk, ExtendedRecordMap };
