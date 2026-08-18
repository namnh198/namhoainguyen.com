import { cn } from "~/lib/utils";
import { LazyImage } from "../ui/lazy-image";
import type { ReactNode } from "react";

export function PageIcon({
  icon,
  notionDomain,
  className,
}: {
  icon?: ReactNode | string;
  notionDomain: string;
  className?: string;
}) {
  if (!icon) {
    return null;
  }

  if (typeof icon !== "string") {
    return <span className={cn(className, "notion-page-icon icon-emoji")}>{icon}</span>;
  }

  if (icon.startsWith("/icons/")) {
    const url = `https://${notionDomain}${icon}?mode=dark`;
    return (
      <LazyImage
        src={url}
        alt=""
        showLoader
        className={cn("size-6", [className])}
        width={24}
        height={24}
        layout="constrained"
      />
    );
  }

  if (icon.startsWith("attachment:")) {
    const [attachmentId, attachmentName] = icon.replace("attachment:", "").split(":");
    const url = `https://${notionDomain}/image/attachment%3A${attachmentId}%3A${attachmentName}?id=3a964a0b-a9d5-8091-965d-f18de16adc0e&table=block&spaceId=3d064a0b-a9d5-81eb-a8c3-0003624d36ab&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl`;
    return (
      <LazyImage
        src={url}
        alt=""
        showLoader
        className={cn("size-6", [className])}
        width={20}
        height={20}
        layout="constrained"
      />
    );
  }

  return <span className={cn(className, "text-xl leading-none notion-page-icon icon-emoji")}>{icon}</span>;
}
