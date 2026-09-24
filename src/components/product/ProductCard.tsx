"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { ProductVisual } from "@/components/product/ProductVisual";
import {
  cacheForwardEntry,
  hideOtherProductStages,
  readMorphCache,
  useProductMorph,
} from "@/components/product/ProductMorphContext";
import { getImageUrl } from "@/lib/sanity/image";
import {
  getProductCutout,
  getProductTint,
  measureProductVisual,
} from "@/lib/product-media";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/lib/sanity/types";

type ProductCardProps = {
  product: Product;
  className?: string;
  large?: boolean;
};

export function ProductCard({ product, className, large }: ProductCardProps) {
  const router = useRouter();
  const { active, start, setDestination, shouldHideSlug } = useProductMorph();
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const refined = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [snap, setSnap] = useState(false);
  const href = `/urunler/${product.slug}`;
  const hiding = shouldHideSlug(product.slug);
  const isReverseDest = Boolean(
    active?.direction === "reverse" && active.slug === product.slug,
  );

  const cutout = getProductCutout(product.slug);
  const cardBottle = cutout
    ? { url: cutout, alt: product.title }
    : undefined;
  const bottleSrc = cutout || getImageUrl(product.bottle, 1600);
  const imageSrc = bottleSrc;

  // Reverse: restore list scroll, lock it, measure once — then overlay runs full tween
  useLayoutEffect(() => {
    if (!isReverseDest || reduced) {
      refined.current = false;
      return;
    }

    const cached = readMorphCache();
    const sameList =
      cached?.slug === product.slug &&
      cached.listPath === window.location.pathname &&
      typeof cached.listScrollY === "number";

    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    const prevRestoration = window.history.scrollRestoration;
    html.style.scrollBehavior = "auto";
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* ignore */
    }

    const snapScroll = (y?: number) => {
      if (typeof y === "number") {
        lenis?.scrollTo(y, { immediate: true });
        window.scrollTo(0, y);
        html.scrollTop = y;
        document.body.scrollTop = y;
        return;
      }
      visualRef.current?.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
    };

    if (sameList) snapScroll(cached.listScrollY);
    else snapScroll();

    const pinY = sameList ? cached.listScrollY : window.scrollY;
    const restoreScroll = () => snapScroll(pinY);

    const publish = () => {
      if (refined.current) return;
      snapScroll(pinY);
      const measured = measureProductVisual(visualRef.current);
      const keep = measured?.stage ?? visualRef.current;
      if (!keep) return;
      hideOtherProductStages(keep);
      const r = measured?.rect ?? keep.getBoundingClientRect();
      if (r.width >= 8 && r.height >= 8 && r.top > -8) {
        refined.current = true;
        setDestination({
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
        });
      }
    };

    // Wait 2 frames so Reveal/Lenis settle at the real card position
    const raf1 = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(publish);
    });

    const onScroll = () => restoreScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf1);
      window.removeEventListener("scroll", onScroll);
      html.style.scrollBehavior = prevBehavior;
      try {
        window.history.scrollRestoration = prevRestoration;
      } catch {
        /* ignore */
      }
    };
  }, [isReverseDest, lenis, product.slug, reduced, setDestination]);

  return (
    <Link
      href={href}
      scroll={false}
      className={cn("group block", className)}
      prefetch
      data-kesu-product-slug={product.slug}
      onClick={(event) => {
        if (reduced) return;

        event.preventDefault();

        flushSync(() => {
          setHovered(false);
          setSnap(true);
        });

        const measured = measureProductVisual(event.currentTarget);
        if (!measured) {
          router.push(href, { scroll: false });
          return;
        }

        hideOtherProductStages(measured.stage);

        cacheForwardEntry({
          slug: product.slug,
          alt: product.title,
          bottleSrc: bottleSrc || undefined,
          backdropSrc: undefined,
          imageSrc: imageSrc || undefined,
          cardRect: measured.rect,
          listScrollY: window.scrollY,
          listPath: window.location.pathname,
        });

        flushSync(() => {
          start({
            slug: product.slug,
            alt: product.title,
            bottleSrc: bottleSrc || undefined,
            backdropSrc: undefined,
            imageSrc: imageSrc || undefined,
            direction: "forward",
            from: measured.rect,
          });
        });

        router.push(href, { scroll: false });
      }}
    >
      <div
        className="overflow-visible rounded-[1.75rem] px-7 pb-8 pt-12"
        style={{
          backgroundColor:
            product.cardTint ??
            getProductTint(product.slug, product.category?.slug),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          if (!snap) setHovered(false);
        }}
      >
        <div
          ref={visualRef}
          className={cn(
            "mx-auto flex h-[23.5rem] w-full items-center justify-center overflow-visible pt-5",
            hiding && "opacity-[0.01]",
          )}
          aria-hidden={hiding || undefined}
        >
          <ProductVisual
            bottle={cardBottle}
            alt={product.title}
            large={large}
            animate={false}
            hovered={hovered}
            snap={snap}
            priority={isReverseDest || hiding}
            variant="card"
          />
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-[1.25rem] font-medium tracking-[-0.03em] text-[#141414]">
              {product.category?.title ?? product.title}
            </h3>
            <p className="mt-1 text-[0.88rem] text-[#8a867c]">
              {product.volume ?? "5 × 10 ml"}
            </p>
          </div>
          <span
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[#d5d0c6] text-[#141414] transition-colors duration-400 ease-[var(--ease-premium)] group-hover:border-[#141414] group-hover:bg-[#141414] group-hover:text-white"
            aria-hidden
          >
            <ArrowUpRight className="size-3.5" strokeWidth={1.6} />
          </span>
        </div>

        {product.tagline ? (
          <p className="mt-4 text-[0.9rem] text-[#8a867c]">{product.tagline}</p>
        ) : null}

        <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#d5d0c6]/80 px-4 py-[0.55rem] text-[0.8rem] text-[#141414] transition-colors duration-400 group-hover:border-[#141414]/35">
          {product.category?.title ?? "Ürün"} ürününü keşfet
          <ArrowUpRight className="size-3.5" strokeWidth={1.6} />
        </span>
      </div>
    </Link>
  );
}
