"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/animation/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import type { Category, Product } from "@/lib/sanity/types";
import { cn } from "@/lib/utils/cn";

type ProductCatalogProps = {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
};

export function ProductCatalog({
  products,
  categories,
  initialCategory = "all",
}: ProductCatalogProps) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category?.slug === category;
      const matchesQuery =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
        <div
          className="flex flex-wrap gap-x-6 gap-y-3"
          role="tablist"
          aria-label="Kategori filtresi"
        >
          <FilterChip
            active={category === "all"}
            onClick={() => setCategory("all")}
            label="Tümü"
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat._id}
              active={category === cat.slug}
              onClick={() => setCategory(cat.slug)}
              label={cat.title}
            />
          ))}
        </div>
        <label className="relative block w-full md:max-w-xs">
          <span className="sr-only">Ürün ara</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ara…"
            className="w-full border-b border-border bg-transparent py-3 text-sm outline-none placeholder:text-muted focus:border-foreground transition-colors"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-muted text-center">
          Bu kriterlere uygun ürün bulunamadı.
        </p>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => (
            <Reveal key={product._id} delay={Math.min(index, 5) * 0.04} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "text-[0.75rem] tracking-[0.14em] uppercase pb-1 border-b transition-colors duration-500",
        active
          ? "border-foreground text-foreground"
          : "border-transparent text-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
