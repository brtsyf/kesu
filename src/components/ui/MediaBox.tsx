"use client";

import {
  useCallback,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { cn } from "@/lib/utils/cn";

type MediaBoxRender = {
  loaded: boolean;
  onLoad: () => void;
  onImgLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
  imgClassName: string;
};

type MediaBoxProps = {
  className?: string;
  /** Extra classes for the waiting panel */
  placeholderClassName?: string;
  children: (api: MediaBoxRender) => ReactNode;
};

/** Fixed-aspect image slot with a waiting box until the media paints. */
export function MediaBox({
  className,
  placeholderClassName,
  children,
}: MediaBoxProps) {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);

  const onImgLoad = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface ring-1 ring-border/70",
        className,
      )}
    >
      {!loaded ? (
        <div
          className={cn(
            "kesu-image-shimmer absolute inset-0 z-[1]",
            placeholderClassName,
          )}
          aria-hidden
          aria-busy="true"
        />
      ) : null}
      {children({
        loaded,
        onLoad,
        onImgLoad,
        imgClassName: cn(
          "transition-opacity duration-500 ease-[var(--ease-premium)]",
          loaded ? "opacity-100" : "opacity-0",
        ),
      })}
    </div>
  );
}
