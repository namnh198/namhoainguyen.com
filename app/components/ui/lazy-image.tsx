import { useEffect, useState } from "react";
import type { ImageProps as UnpicImageProps } from "@unpic/react";

import { IconLoader3 } from "@tabler/icons-react";
import { Image as UnpicImage } from "@unpic/react";

import { cn } from "~/lib/utils";

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
        className={cn("inline-flex animate-spin items-center justify-center", props.className)}
        style={{ width: props.width || "auto", height: props.height || "auto" }}
      >
        <IconLoader3 stroke={2} width={props.width || 16} height={props.height || 16} />
      </span>
    );
  }

  return <UnpicImage {...props} />;
}
