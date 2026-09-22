"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils/cn";
import type { SanityImage } from "@/lib/sanity/types";

type ProductVisualProps = {
  bottle?: SanityImage;
  backdrop?: SanityImage;
  image?: SanityImage;
  alt: string;
  className?: string;
  priority?: boolean;
  large?: boolean;
  animate?: boolean;
};

/**
 * Native <img> (not next/image) so morph overlay + page share the same cached URL.
 * next/image optimizer URLs caused a ~1s blank after the clone unmounted.
 */
export function ProductVisual({
  bottle,
  backdrop,
  image,
  alt,
  className,
  large,
  animate = true,
  priority = false,
}: ProductVisualProps) {
  const reduced = useReducedMotion();
  const bottleSrc = getImageUrl(bottle ?? image, 1600);
  const backdropSrc = getImageUrl(backdrop, 1800);
  const layered = Boolean(bottleSrc && backdropSrc);
  const singleSrc = bottleSrc || getImageUrl(image, 1600);

  const [floatReady, setFloatReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [layerReady, setLayerReady] = useState({
    bottle: false,
    backdrop: false,
  });

  useEffect(() => {
    setLoaded(false);
    setLayerReady({ bottle: false, backdrop: false });
  }, [bottleSrc, backdropSrc, singleSrc, layered]);

  useEffect(() => {
    if (!animate || reduced || !loaded) {
      setFloatReady(false);
      return;
    }
    const timer = window.setTimeout(() => setFloatReady(true), 80);
    return () => window.clearTimeout(timer);
  }, [animate, reduced, loaded]);

  useEffect(() => {
    if (!layered) return;
    if (layerReady.bottle && layerReady.backdrop) setLoaded(true);
  }, [layered, layerReady]);

  const markLayer = useCallback((key: "bottle" | "backdrop") => {
    setLayerReady((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }, []);

  return (
    <div
      className={cn(
        "kesu-product-stage relative overflow-hidden aspect-[4/5] bg-surface ring-1 ring-border/70",
        className,
      )}
      style={{ borderRadius: 0 }}
      aria-busy={!loaded}
    >
      {/* Waiting box — stays until media is ready */}
      {!loaded ? (
        <div className="kesu-image-shimmer absolute inset-0 z-[1]" aria-hidden />
      ) : null}

      {layered ? (
        <>
          <div className="absolute inset-0" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backdropSrc}
              alt=""
              className={cn(
                "absolute inset-0 h-full w-full object-cover scale-[1.08] transition-opacity duration-500 ease-[var(--ease-premium)]",
                loaded ? "opacity-100" : "opacity-0",
              )}
              draggable={false}
              decoding={priority ? "sync" : "async"}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "low"}
              onLoad={() => markLayer("backdrop")}
              onError={() => markLayer("backdrop")}
              ref={(node) => {
                if (node?.complete && node.naturalWidth > 0) {
                  markLayer("backdrop");
                }
              }}
            />
          </div>

          <motion.div
            className={cn(
              "absolute inset-0 flex items-center justify-center p-[8%] md:p-[10%] transition-opacity duration-500 ease-[var(--ease-premium)]",
              loaded ? "opacity-100" : "opacity-0",
            )}
            animate={
              floatReady
                ? { y: [0, -10, 0], rotate: [0, 0.6, 0] }
                : { y: 0, rotate: 0 }
            }
            transition={
              floatReady
                ? {
                    duration: 6.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.4 }
            }
            whileHover={
              floatReady && !reduced
                ? { y: -14, scale: 1.03, transition: { duration: 0.55 } }
                : undefined
            }
          >
            <div className="relative h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bottleSrc}
                alt={getImageAlt(bottle ?? image, alt)}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
                decoding={priority ? "sync" : "async"}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "low"}
                onLoad={() => markLayer("bottle")}
                onError={() => markLayer("bottle")}
                ref={(node) => {
                  if (node?.complete && node.naturalWidth > 0) {
                    markLayer("bottle");
                  }
                }}
              />
            </div>
          </motion.div>
        </>
      ) : singleSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={singleSrc}
          alt={getImageAlt(image ?? bottle, alt)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-[var(--ease-premium)]",
            loaded ? "opacity-100" : "opacity-0",
          )}
          draggable={false}
          decoding={priority ? "sync" : "async"}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          onLoad={(event) => {
            const img = event.currentTarget;
            if (img.complete && img.naturalWidth > 0) setLoaded(true);
          }}
          onError={() => setLoaded(true)}
          ref={(node) => {
            if (node?.complete && node.naturalWidth > 0) setLoaded(true);
          }}
        />
      ) : null}
    </div>
  );
}
