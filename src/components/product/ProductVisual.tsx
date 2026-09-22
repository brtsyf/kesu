"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import { sharedImageTransition } from "@/lib/motion";
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
  /** Idle float animation for the bottle (deferred until shared morph settles) */
  animate?: boolean;
  /** Shared-element id — same slug on card + detail */
  layoutId?: string;
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
  layoutId,
}: ProductVisualProps) {
  const reduced = useReducedMotion();
  const bottleSrc = getImageUrl(bottle ?? image, large ? 1600 : 1200);
  const backdropSrc = getImageUrl(backdrop, large ? 1800 : 1400);
  const layered = Boolean(bottleSrc && backdropSrc);
  const singleSrc = bottleSrc || getImageUrl(image, large ? 1600 : 1200);

  const [floatReady, setFloatReady] = useState(false);
  useEffect(() => {
    if (!animate || reduced) {
      setFloatReady(false);
      return;
    }
    // Let shared-element morph finish before idle float
    const delay = layoutId ? 950 : 0;
    const timer = window.setTimeout(() => setFloatReady(true), delay);
    return () => window.clearTimeout(timer);
  }, [animate, layoutId, reduced]);

  const shared = Boolean(layoutId) && !reduced;

  return (
    <motion.div
      layoutId={shared ? layoutId : undefined}
      transition={shared ? sharedImageTransition : undefined}
      className={cn(
        "kesu-product-stage relative overflow-hidden aspect-[4/5]",
        className,
      )}
      style={{ borderRadius: 0 }}
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
              draggable={false}
            />
          </div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center p-[8%] md:p-[10%]"
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
            <div className="relative h-full w-full drop-shadow-[0_20px_40px_rgba(24,32,27,0.18)]">
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
                draggable={false}
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
          draggable={false}
        />
      ) : null}
    </motion.div>
  );
}
