/**
 * convert notion id to uuid format
 */
export const idToUuid = (id = "") =>
  `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;

/**
 * parse and convert notion page ID to desired format
 */
export const parsePageId = (
  id: string | undefined | null = "",
  { uuid = true }: { uuid?: boolean } = {},
): string | undefined => {
  if (!id) return;

  id = id.split("?")[0]!;
  if (!id) return;

  const pageIdRe = /\b([\da-f]{32})\b/;
  const pageId2Re = /\b([\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12})\b/;

  const match = id.match(pageIdRe);

  if (match) {
    return uuid ? idToUuid(match[1]) : match[1];
  }

  const match2 = id.match(pageId2Re);
  if (match2) {
    return uuid ? match2[1] : match2[1]!.replaceAll("-", "");
  }

  return;
};
