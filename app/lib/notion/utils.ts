import type { Block, BlockMap } from "notion-types";

const groupBlockContent = (blockMap: BlockMap): string[][] => {
  const output: string[][] = [];

  let lastType: string | undefined = undefined;
  let index = -1;

  Object.keys(blockMap).forEach((id) => {
    const blockValue = blockMap[id]?.value as Block;

    if (blockValue) {
      blockValue.content?.forEach((blockId) => {
        const blockType = (blockMap[blockId]?.value as Block)?.type;

        if (blockType && blockType !== lastType) {
          index++;
          lastType = blockType;
          output[index] = [];
        }

        if (index > -1) {
          output[index].push(blockId);
        }
      });
    }

    lastType = undefined;
  });

  return output;
};

export const getListNumber = (blockId: string, blockMap: BlockMap) => {
  const groups = groupBlockContent(blockMap);
  const group = groups.find((g) => g.includes(blockId));

  if (!group) {
    return;
  }

  return group.indexOf(blockId) + 1;
};
export const getYoutubeId = (url: string): string | null => {
  try {
    const youtubeDomains = new Set([
      "youtu.be",
      "youtube.com",
      "www.youtube.com",
      "youtube-nocookie.com",
      "www.youtube-nocookie.com",
    ]);

    const { hostname } = new URL(url);
    if (!youtubeDomains.has(hostname)) {
      return null;
    }
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;

    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
  } catch {
    // ignore invalid urls
  }

  return null;
};
