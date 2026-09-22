"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { ProductVisual } from "@/components/product/ProductVisual";
import { productImageLayoutId } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/lib/sanity/types";

type ProductCardProps = {
  product: Product;
  className?: string;
  large?: boolean;
};

export function ProductCard({ product, className, large }: ProductCardProps) {
  const reduced = useReducedMotion();
  const layoutId = reduced
    ? undefined
    : productImageLayoutId(product.slug);

  return (
    <Link
      href={`/urunler/${product.slug}`}
      scroll
      className={cn("group block", className)}
      prefetch
    >
      <div className="mb-5">
        <ProductVisual
          bottle={product.bottle}
          backdrop={product.backdrop}
          image={product.thumbnail ?? product.images?.[0]}
          alt={product.title}
          large={large}
          animate={false}
          layoutId={layoutId}
          className="transition-[box-shadow] duration-700 ease-[var(--ease-premium)] group-hover:shadow-[0_24px_60px_rgba(24,32,27,0.18)]"
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
