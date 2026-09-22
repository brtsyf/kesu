"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils/cn";
import type { SanityImage } from "@/lib/sanity/types";

type ProductVisualProps = {
  bottle?: SanityImage;
  backdrop?: SanityImage;
  /** Fallback single image when layers missing */
  image?: SanityImage;
  alt: string;
  className?: string;
  priority?: boolean;
  large?: boolean;
  /** Idle float animation for the bottle */
  animate?: boolean;
};

export function ProductVisual({
  bottle,
  backdrop,
  image,
  alt,
  className,
  priority,
  large,
  animate = true,
}: ProductVisualProps) {
  const reduced = useReducedMotion();
  const bottleSrc = getImageUrl(bottle ?? image, large ? 1600 : 1200);
  const backdropSrc = getImageUrl(backdrop, large ? 1800 : 1400);
  const layered = Boolean(bottleSrc && backdropSrc);
  const singleSrc = bottleSrc || getImageUrl(image, large ? 1600 : 1200);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-dark aspect-[4/5]",
        className,
      )}
    >
      {layered ? (
        <>
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={backdropSrc}
              alt=""
              fill
              priority={priority}
              quality={92}
              sizes={
                large
                  ? "(max-width: 768px) 100vw, 55vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className="object-cover scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />
          </div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center p-[8%] md:p-[10%]"
            animate={
              animate && !reduced
                ? { y: [0, -10, 0], rotate: [0, 0.6, 0] }
                : undefined
            }
            transition={
              animate && !reduced
                ? {
                    duration: 6.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : undefined
            }
            whileHover={
              reduced
                ? undefined
                : { y: -14, scale: 1.03, transition: { duration: 0.55 } }
            }
          >
            <div className="relative h-full w-full drop-shadow-[0_28px_50px_rgba(0,0,0,0.55)]">
              <Image
                src={bottleSrc}
                alt={getImageAlt(bottle ?? image, alt)}
                fill
                priority={priority}
                quality={95}
                sizes={
                  large
                    ? "(max-width: 768px) 80vw, 40vw"
                    : "(max-width: 768px) 70vw, 28vw"
                }
                className="object-contain"
              />
            </div>
          </motion.div>
        </>
      ) : singleSrc ? (
        <Image
          src={singleSrc}
          alt={getImageAlt(image ?? bottle, alt)}
          fill
          priority={priority}
          quality={92}
          sizes={
            large
              ? "(max-width: 768px) 100vw, 55vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
