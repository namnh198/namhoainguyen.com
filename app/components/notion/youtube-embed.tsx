import { cn } from "~/lib/utils";

type BlockYoutubeEmbedProps = {
  id: string;
  width?: number;
  height?: number;
  title?: string;
  className?: string;
};

export function YoutubeEmbed({ id, className, width, height, title }: BlockYoutubeEmbedProps) {
  return (
    <div className={cn("relative aspect-video size-full overflow-hidden", className)}>
      <iframe
        width={width || 853}
        height={height || 480}
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title || "A video from YouTube"}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
