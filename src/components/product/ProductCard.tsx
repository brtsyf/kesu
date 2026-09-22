import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/lib/sanity/types";

type ProductCardProps = {
  product: Product;
  className?: string;
  large?: boolean;
};

export function ProductCard({ product, className, large }: ProductCardProps) {
  const src = getImageUrl(product.thumbnail ?? product.images?.[0], large ? 1400 : 900);

  return (
    <Link
      href={`/urunler/${product.slug}`}
      className={cn("group block", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-surface mb-5",
          "aspect-[4/5]",
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={getImageAlt(product.thumbnail, product.title)}
            fill
            sizes={
              large
                ? "(max-width: 768px) 100vw, 55vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className="object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
          />
        ) : null}
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
