"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { SHARED_IMAGE_MS, premiumEase } from "@/lib/motion";
import { getProductCutout } from "@/lib/product-media";
import { useProductMorph } from "@/components/product/ProductMorphContext";

function preload(urls: (string | undefined)[]) {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          if (!src) {
            resolve();
            return;
          }
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.decoding = "async";
          img.src = src;
          if (img.complete) resolve();
        }),
    ),
  );
}

export function ProductMorphOverlay() {
  const { active, destination, complete, beginHandoff, handoff } =
    useProductMorph();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const finishing = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!active) {
      finishing.current = false;
      return;
    }
    void preload([active.bottleSrc, active.backdropSrc, active.imageSrc]);
  }, [active]);

  // Drive finish from the real tween clock (destination → duration).
  // Do NOT trust onAnimationComplete alone — Framer fires it when animate
  // flips from `false` → rect, which aborted reverse after ~1 frame.
  useEffect(() => {
    if (!active || !destination) return;
    if (finishing.current) return;

    const urls = [active.bottleSrc, active.backdropSrc, active.imageSrc];
    let cancelled = false;

    const tHandoff = window.setTimeout(() => {
      if (cancelled || finishing.current) return;
      beginHandoff();
    }, Math.max(0, SHARED_IMAGE_MS - 80));

    const tDone = window.setTimeout(() => {
      if (cancelled || finishing.current) return;
      finishing.current = true;
      void preload(urls).finally(() => {
        if (!cancelled) complete();
      });
    }, SHARED_IMAGE_MS + 120);

    return () => {
      cancelled = true;
      window.clearTimeout(tHandoff);
      window.clearTimeout(tDone);
    };
  }, [active, destination, beginHandoff, complete]);

  useEffect(() => {
    if (!active) return;

    const missingCard = window.setTimeout(() => {
      if (active.direction !== "reverse") return;
      if (destination) return;
      const card = document.querySelector(
        `[data-kesu-product-slug="${active.slug}"]`,
      );
      if (!card) complete();
    }, 500);

    const failSafe = window.setTimeout(
      () => complete(),
      SHARED_IMAGE_MS + 4000,
    );

    return () => {
      window.clearTimeout(missingCard);
      window.clearTimeout(failSafe);
    };
  }, [active, destination, complete]);

  if (!mounted || reduced || !active) return null;

  const from = active.from;
  const cutout = Boolean(getProductCutout(active.slug));
  const bottleSrc = active.bottleSrc || active.imageSrc;
  const headerH =
    document.querySelector("header")?.getBoundingClientRect().height ?? 84;
  const belowNav = (rect: { top: number; left: number; width: number; height: number }) => ({
    top: rect.top - headerH,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  });

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 overflow-hidden"
      style={{ top: "var(--header-height)" }}
    >
    <motion.div
      key={`${active.direction}-${active.slug}`}
      className={
        cutout
          ? "pointer-events-none absolute overflow-visible"
          : "pointer-events-none absolute overflow-hidden"
      }
      data-kesu-morph-overlay=""
      initial={belowNav(from)}
      animate={destination ? belowNav(destination) : false}
      transition={{
        duration: SHARED_IMAGE_MS / 1000,
        ease: premiumEase,
      }}
      style={{
        // CSS opacity — keep out of Framer `animate` so handoff doesn't restart the tween
        opacity: handoff ? 0 : 1,
        transition: "opacity 0.14s linear",
        willChange: "top, left, width, height, opacity",
      }}
    >
      {cutout && bottleSrc ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={bottleSrc}
          alt={active.alt}
          className="h-full w-full object-contain object-center"
          draggable={false}
        />
      ) : active.backdropSrc && active.bottleSrc ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.backdropSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-[1.08]"
            draggable={false}
          />
          <div className="absolute inset-0 flex items-center justify-center p-[8%]">
            <div className="relative h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.bottleSrc}
                alt={active.alt}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
            </div>
          </div>
        </>
      ) : bottleSrc ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={bottleSrc}
          alt={active.alt}
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : null}
    </motion.div>
    </div>,
    document.body,
  );
}
