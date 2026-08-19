import { cn } from "~/lib/utils";
import { LazyImage } from "../ui/lazy-image";
import type { ReactNode } from "react";
import type { Block } from "notion-types";

export function PageIcon({
  block,
  inputIcon,
  defaultIcon,
  notionDomain,
  className,
}: {
  block?: Block;
  inputIcon?: ReactNode | string;
  defaultIcon?: ReactNode | string;
  notionDomain: string;
  className?: string;
}) {
  const icon = inputIcon ?? (block?.format?.page_icon || defaultIcon);
  if (!icon) {
    return defaultIcon;
  }

  if (typeof icon !== "string") {
    return <span className={cn(className, "notion-page-icon icon-emoji")}>{icon}</span>;
  }

  let imageUrl = icon;

  if (imageUrl.startsWith("/icons/")) {
    imageUrl = `https://${notionDomain}${icon}?mode=dark`;
  } else if (icon.startsWith("attachment:")) {
    const [attachmentId, attachmentName] = icon.replace("attachment:", "").split(":");
    imageUrl = `https://${notionDomain}/image/attachment%3A${attachmentId}%3A${attachmentName}?id=3a964a0b-a9d5-8091-965d-f18de16adc0e&table=block&spaceId=3d064a0b-a9d5-81eb-a8c3-0003624d36ab&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl`;
  }

  if (imageUrl.startsWith("http")) {
    return (
      <LazyImage
        src={imageUrl}
        alt=""
        showLoader
        className={cn("size-6", [className])}
        width={24}
        height={24}
        layout="constrained"
      />
    );
  }

  return <span className={cn(className, "text-xl leading-none notion-page-icon icon-emoji")}>{icon}</span>;
}
