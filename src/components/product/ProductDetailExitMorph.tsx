"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import { useReducedMotion } from "framer-motion";
import {
  cacheDetailRect,
  hideOtherProductStages,
  useProductMorph,
} from "@/components/product/ProductMorphContext";

type ExitProps = {
  slug: string;
  alt: string;
  bottleSrc?: string;
  backdropSrc?: string;
  imageSrc?: string;
};

function measureHero() {
  const stage = document.querySelector<HTMLElement>(
    "[data-kesu-detail-hero] .kesu-product-stage",
  );
  if (!stage) return null;
  const r = stage.getBoundingClientRect();
  if (r.width < 8 || r.height < 8) return null;
  return {
    stage,
    from: {
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
    },
  };
}

/** Caches detail hero + intercepts home/catalog links for reverse morph. */
export function ProductDetailExitMorph({
  slug,
  alt,
  bottleSrc,
  backdropSrc,
  imageSrc,
}: ExitProps) {
  const { active, start } = useProductMorph();
  const router = useRouter();
  const reduced = useReducedMotion();

  // Keep detailRect fresh; never overwrite cardRect
  useEffect(() => {
    if (reduced) return;

    const save = () => {
      const measured = measureHero();
      if (!measured) return;
      cacheDetailRect(slug, measured.from);
    };

    save();
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("resize", save);
    const id = window.setInterval(save, 600);
    return () => {
      window.removeEventListener("scroll", save);
      window.removeEventListener("resize", save);
      window.clearInterval(id);
    };
  }, [slug, reduced]);

  useEffect(() => {
    if (reduced) return;

    const onClick = (event: MouseEvent) => {
      if (active) return;
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;

      const hrefAttr = anchor.getAttribute("href");
      if (!hrefAttr || hrefAttr.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(hrefAttr, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const path = url.pathname;
      if (path === `/urunler/${slug}`) return;
      if (path.startsWith("/urunler/") && path !== "/urunler") return;

      const isListReturn = path === "/" || path === "/urunler";
      if (!isListReturn) return;

      const measured = measureHero();
      if (!measured) return;

      event.preventDefault();
      event.stopPropagation();

      hideOtherProductStages(measured.stage);
      cacheDetailRect(slug, measured.from);

      flushSync(() => {
        start({
          slug,
          alt,
          bottleSrc,
          backdropSrc,
          imageSrc,
          direction: "reverse",
          from: measured.from,
        });
      });

      router.push(`${path}${url.search}`, { scroll: false });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [
    active,
    alt,
    backdropSrc,
    bottleSrc,
    imageSrc,
    reduced,
    router,
    slug,
    start,
  ]);

  return null;
}
