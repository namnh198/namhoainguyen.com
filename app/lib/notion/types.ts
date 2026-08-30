import type { ExtendedRecordMap, ID, CollectionInstance as NotionCollectionInstance, PageChunk } from "notion-types";

type CollectionInstance = NotionCollectionInstance & {
  allBlockIds: ID[];
};

export interface NotionDateTime {
  type: "datetime";
  start_date: string;
  start_time?: string;
  time_zone?: string;
}

export type SearchResult = {
  id: string;
  title: string;
  slug: string;
  titleHighlighted: string;
  textHighlighted: string;
  published: boolean;
};

export type { CollectionInstance, PageChunk, ExtendedRecordMap };
