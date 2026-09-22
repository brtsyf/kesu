"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
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
  const reduced = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const refined = useRef(false);
  const href = `/urunler/${product.slug}`;
  const hiding = shouldHideSlug(product.slug);
  const isReverseDest = Boolean(
    active?.direction === "reverse" && active.slug === product.slug,
  );

  const bottleSrc = getImageUrl(
    product.bottle ?? product.thumbnail ?? product.images?.[0],
    1600,
  );
  const backdropSrc = getImageUrl(product.backdrop, 1800);
  const imageSrc = getImageUrl(
    product.thumbnail ?? product.images?.[0],
    1600,
  );

  // Reverse: restore list scroll, lock it, measure once — then overlay runs full tween
  useLayoutEffect(() => {
    if (!isReverseDest || reduced) {
      refined.current = false;
      return;
    }

    const stage =
      visualRef.current?.querySelector<HTMLElement>(".kesu-product-stage") ??
      visualRef.current;
    if (!stage) return;

    const cached = readMorphCache();
    const scrollY =
      cached?.slug === product.slug && typeof cached.listScrollY === "number"
        ? cached.listScrollY
        : window.scrollY;

    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    const prevRestoration = window.history.scrollRestoration;
    html.style.scrollBehavior = "auto";
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* ignore */
    }

    const restoreScroll = () => {
      window.scrollTo(0, scrollY);
      html.scrollTop = scrollY;
      document.body.scrollTop = scrollY;
    };

    restoreScroll();

    if (!refined.current) {
      hideOtherProductStages(stage);
      const r = stage.getBoundingClientRect();
      if (r.width >= 8 && r.height >= 8) {
        refined.current = true;
        setDestination({
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
        });
      }
    }

    // Keep scroll pinned so the measured card rect stays valid for the whole morph
    const onScroll = () => restoreScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      html.style.scrollBehavior = prevBehavior;
      try {
        window.history.scrollRestoration = prevRestoration;
      } catch {
        /* ignore */
      }
    };
  }, [isReverseDest, product.slug, reduced, setDestination]);

  return (
    <Link
      href={href}
      scroll={false}
      className={cn("group block", className)}
      prefetch
      data-kesu-product-slug={product.slug}
      onClick={(event) => {
        if (reduced) return;

        const stage = event.currentTarget.querySelector<HTMLElement>(
          ".kesu-product-stage",
        );
        if (!stage) return;

        event.preventDefault();

        const rect = stage.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8) return;

        hideOtherProductStages(stage);

        const from = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };

        cacheForwardEntry({
          slug: product.slug,
          alt: product.title,
          bottleSrc: bottleSrc || undefined,
          backdropSrc: backdropSrc || undefined,
          imageSrc: imageSrc || undefined,
          cardRect: from,
          listScrollY: window.scrollY,
        });

        flushSync(() => {
          start({
            slug: product.slug,
            alt: product.title,
            bottleSrc: bottleSrc || undefined,
            backdropSrc: backdropSrc || undefined,
            imageSrc: imageSrc || undefined,
            direction: "forward",
            from,
          });
        });

        router.push(href, { scroll: false });
      }}
    >
      <div
        ref={visualRef}
        className={cn("mb-5", hiding && "opacity-[0.01]")}
        aria-hidden={hiding || undefined}
      >
        <ProductVisual
          bottle={product.bottle}
          backdrop={product.backdrop}
          image={product.thumbnail ?? product.images?.[0]}
          alt={product.title}
          large={large}
          animate={false}
          priority={isReverseDest || hiding}
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          {product.category ? (
            <p className="eyebrow mb-2">{product.category.title}</p>
          ) : null}
          <h3
            className={cn(
              "tracking-tight transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-1",
              large ? "text-2xl md:text-3xl" : "text-lg md:text-xl",
            )}
          >
            {product.title}
          </h3>
          <p className="mt-2 text-sm text-muted line-clamp-2 max-w-sm">
            {product.shortDescription}
          </p>
        </div>
        <ArrowUpRight
          className="size-5 mt-1 shrink-0 text-muted transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
          strokeWidth={1.5}
          aria-hidden
        />
      </div>
    </Link>
  );
}
