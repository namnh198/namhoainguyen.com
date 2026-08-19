"use client";

import React from "react";

import { YoutubeEmbed } from "./youtube-embed";
import { cn } from "~/lib/utils";
import { getYoutubeId } from "~/lib/notion/utils";

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
      <YoutubeEmbed id={videoId} title={"Youtube video"} className="bg-bg border rounded-xl" />
      {caption && <div className="text-sm italic text-text-2 mt-2">{caption}</div>}
    </div>
  );
}
