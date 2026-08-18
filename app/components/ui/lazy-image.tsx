import { useState, useEffect } from "react";
import { type ImageProps as UnpicImageProps, Image as UnpicImage } from "@unpic/react";
import { cn } from "~/lib/utils";
import { IconLoader3 } from "@tabler/icons-react";

export type ImageProps = UnpicImageProps & {
  showLoader?: boolean;
};

export function LazyImage({ showLoader = true, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (props.src) {
      const img = new Image();
      img.src = props.src;
      img.onload = () => {
        setLoaded(true);
      };
    }
  }, [props.src]);

  if (showLoader && !loaded) {
    return (
      <span
        className={cn("inline-flex items-center justify-center animate-spin", props.className)}
        style={{ width: props.width || "auto", height: props.height || "auto" }}
      >
        <IconLoader3 stroke={2} />
      </span>
    );
  }

  return <UnpicImage {...props} />;
}
