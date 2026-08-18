// ============================================================================
// Notion ID and UUID Utilities
// ============================================================================

/**
 * Convert "7c2e54318e52416ca5769831454bf08d" or "7c2e5431-8e52-416c-a576-9831454bf08d"
 * to "7c2e5431-8e52-416c-a576-9831454bf08d"
 */
export function idToUuid(id: string): string | null {
  if (!id) {
    return null;
  }

  id = id.split("?")[0];
  const match = id.match(/\b([a-f0-9]{32})\b/);

  if (match) {
    return `${id.slice(0, 8)}-${id.slice(8, 4 + 8)}-${id.slice(12, 4 + 12)}-${id.slice(16, 4 + 16)}-${id.slice(20)}`;
  }

  const match2 = id.match(/\b([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\b/);
  if (match2) {
    return match2[1];
  }

  return null;
}
