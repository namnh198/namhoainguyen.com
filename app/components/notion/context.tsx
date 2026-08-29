import * as React from "react";
import type { Block, ExtendedRecordMap } from "notion-types";

import { defaultMapImageUrl } from "~/lib/notion/map-image-url";
import { defaultMapPageUrl } from "~/lib/notion/map-page-url";

export type ComponentOverrideFn = (_props: any, defaultValueFn: () => React.ReactNode) => any;

export type MapImageUrlFn = (_url: string, _block: Block) => string;

export type MapPageUrlFn = (_pagegId: string, _recordMap?: ExtendedRecordMap) => string | null;

export type BlockOptionContext = {
  notionDomain: string;
  slugKey: string;
};

export type NotionComponents = {
  Image: any;
  Link: any;
  PageLink: any;
  Code: any;
  Equation: any;
  Callout: any;
  Property: any;
  propertyTextValue: ComponentOverrideFn;
  propertySelectValue: ComponentOverrideFn;
  propertyRelationValue: ComponentOverrideFn;
  propertyFormulaValue: ComponentOverrideFn;
  propertyTitleValue: ComponentOverrideFn;
  propertyPersonValue: ComponentOverrideFn;
  propertyFileValue: ComponentOverrideFn;
  propertyCheckboxValue: ComponentOverrideFn;
  propertyUrlValue: ComponentOverrideFn;
  propertyEmailValue: ComponentOverrideFn;
  propertyPhoneNumberValue: ComponentOverrideFn;
  propertyNumberValue: ComponentOverrideFn;
  propertyLastEditedTimeValue: ComponentOverrideFn;
  propertyCreatedTimeValue: ComponentOverrideFn;
  propertyDateValue: ComponentOverrideFn;
  Pdf: any;
  Tweet: any;
  Modal: any;
  Embed: any;
  Header: any;
};

export type NotionContext = {
  recordMap: ExtendedRecordMap;
  components: Partial<NotionComponents>;
  mapImageUrl: MapImageUrlFn;
  mapPageUrl: MapPageUrlFn;
  rootPageId?: string;
  rootDomain?: string;
  blockOptions: BlockOptionContext;
};

export type PartialNotionContext = Partial<NotionContext>;

const DefaultLink: React.FC = (props) => <a target="_blank" rel="noopener noreferrer" {...props} />;
const DefaultLinkMemo = React.memo(DefaultLink);
const DefaultPageLink: React.FC = (props) => <a {...props} />;
const DefaultPageLinkMemo = React.memo(DefaultPageLink);

const dummyComponent = (name: string) => {
  console.warn(`Warning: using empty component "${name} (you should override this in NotionRenderer.components)`);
  return null;
};

const dummyOverrideFn: ComponentOverrideFn = (_: any, defaultValueFn: () => React.ReactNode) => defaultValueFn();

const defaultComponents: NotionComponents = {
  Image: null, // disable custom images by default
  Link: DefaultLinkMemo,
  PageLink: DefaultPageLinkMemo,
  Callout: null, // use the built-in callout rendering by default

  // Code: dummyComponent('Code'),
  Code: null,
  // Equation: dummyComponent('Equation'),
  Equation: null,

  // Collection: dummyComponent('Collection'),
  Property: null, // use the built-in property rendering by default

  propertyTextValue: dummyOverrideFn,
  propertySelectValue: dummyOverrideFn,
  propertyRelationValue: dummyOverrideFn,
  propertyFormulaValue: dummyOverrideFn,
  propertyTitleValue: dummyOverrideFn,
  propertyPersonValue: dummyOverrideFn,
  propertyFileValue: dummyOverrideFn,
  propertyCheckboxValue: dummyOverrideFn,
  propertyUrlValue: dummyOverrideFn,
  propertyEmailValue: dummyOverrideFn,
  propertyPhoneNumberValue: dummyOverrideFn,
  propertyNumberValue: dummyOverrideFn,
  propertyLastEditedTimeValue: dummyOverrideFn,
  propertyCreatedTimeValue: dummyOverrideFn,
  propertyDateValue: dummyOverrideFn,

  Pdf: dummyComponent("Pdf"),
  Tweet: dummyComponent("Tweet"),
  Modal: dummyComponent("Modal"),

  Header: null,
  Embed: null,
};

const defaultContext: NotionContext = {
  recordMap: {
    block: {},
    collection: {},
    collection_view: {},
    collection_query: {},
    notion_user: {},
    signed_urls: {},
  },
  components: defaultComponents,
  mapImageUrl: defaultMapImageUrl as MapImageUrlFn,
  mapPageUrl: defaultMapPageUrl(),
  blockOptions: {
    slugKey: "",
    notionDomain: "app.notion.so",
  },
};

const ctx = React.createContext<NotionContext>(defaultContext);

export const NotionContextProvider: React.FC<any> = ({
  components: themeComponents = {},
  children,
  mapPageUrl,
  mapImageUrl,
  rootPageId,
  ...rest
}) => {
  for (const key of Object.keys(rest)) {
    if (rest[key] === undefined) {
      delete rest[key];
    }
  }
  const wrappedThemeComponents = React.useMemo(() => ({ ...themeComponents }), [themeComponents]);
  // ensure the user can't override default components with falsy values
  // since it would result in very difficult-to-debug react errors
  for (const key of Object.keys(wrappedThemeComponents)) {
    if (!wrappedThemeComponents[key]) {
      delete wrappedThemeComponents[key];
    }
  }
  const value = React.useMemo(
    () => ({
      ...defaultContext,
      ...rest,
      rootPageId,
      mapPageUrl: mapPageUrl ?? defaultMapPageUrl(rootPageId),
      mapImageUrl: mapImageUrl ?? defaultMapImageUrl,
      components: { ...defaultComponents, ...wrappedThemeComponents },
    }),
    [mapImageUrl, mapPageUrl, wrappedThemeComponents, rootPageId, rest],
  );

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
};

export const NotionContextConsumer = ctx.Consumer;

export const useNotionContext = (): NotionContext => {
  return React.useContext(ctx);
};
