"use client";

import React from "react";

import { getYoutubeId } from "~/lib/notion/utils";
import { cn } from "~/lib/utils";

import { YoutubeEmbed } from "./youtube-embed";

type BlockVideoProps = {
  caption: React.ReactNode;
  videoUrl: string;
  className?: string;
  updatedBlock?: React.ReactElement;
};

export function Video({ videoUrl, caption, className }: BlockVideoProps) {
  const videoId = getYoutubeId(videoUrl);
  if (!videoId) return null;
  return (
    <div className={cn(className, "flex flex-col items-center justify-center gap-2")}>
      <YoutubeEmbed id={videoId} title={"Youtube video"} className="bg-bg rounded-xl border" />
      {caption && <div className="text-text-2 mt-2 text-sm italic">{caption}</div>}
    </div>
  );
}
