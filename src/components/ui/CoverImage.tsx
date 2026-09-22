"use client";

import Image from "next/image";
import { MediaBox } from "@/components/ui/MediaBox";
import { cn } from "@/lib/utils/cn";

type CoverImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Aspect-preserving image slot with a waiting box until load. */
export function CoverImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority,
}: CoverImageProps) {
  return (
    <MediaBox className={cn(className)}>
      {({ onLoad, imgClassName }) => (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imgClassName)}
          onLoad={onLoad}
          onError={onLoad}
        />
      )}
    </MediaBox>
  );
}
