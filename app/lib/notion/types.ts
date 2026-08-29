import type { ExtendedRecordMap, ID, CollectionInstance as NotionCollectionInstance, PageChunk } from "notion-types";

type CollectionInstance = NotionCollectionInstance & {
  allBlockIds: ID[];
};

export type { CollectionInstance, PageChunk, ExtendedRecordMap };

export type SearchResult = {
  id: string;
  title: string;
  slug: string;
  titleHighlighted: string;
  textHighlighted: string;
  published: boolean;
};
