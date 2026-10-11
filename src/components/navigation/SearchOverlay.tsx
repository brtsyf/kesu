"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { MediaBox } from "@/components/ui/MediaBox";
import type { Dictionary } from "@/lib/i18n/types";
import { assetAlt } from "@/lib/i18n/asset-alt";
import { getImageUrl } from "@/lib/sanity/image";
import type { Product } from "@/lib/sanity/types";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
  labels: Dictionary["search"];
};

export function SearchOverlay({ open, onClose, labels }: SearchOverlayProps) {
  const { locale, href } = useI18n();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&lang=${locale}`,
          {
          signal: controller.signal,
        });
        const data = (await res.json()) as { products: Product[] };
        setResults(data.products ?? []);
      } catch {
        /* aborted or network */
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query, open, locale]);

  const emptyMessage = useMemo(() => {
    if (!query.trim()) return labels.hint;
    if (loading) return labels.loading;
    if (!results.length) return labels.empty;
    return null;
  }, [query, loading, results.length, labels]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-dark/40 px-4 pt-[12vh] backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={labels.label}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-background shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4 md:px-8 md:py-6">
          <Search className="size-5 text-muted shrink-0" strokeWidth={1.5} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.placeholder}
            className="w-full bg-transparent text-xl md:text-3xl tracking-tight outline-none placeholder:text-muted/60"
            aria-label={labels.label}
          />
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-muted hover:text-foreground"
            aria-label={labels.close}
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto px-5 py-4 md:px-8 md:py-6">
          {emptyMessage ? (
            <p className="text-muted text-sm py-6">{emptyMessage}</p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((product) => {
                const src = getImageUrl(product.thumbnail, 200);
                return (
                  <li key={product._id}>
                    <Link
                      href={href(`/urunler/${product.slug}`)}
                      onClick={onClose}
                      className="flex items-center gap-4 py-4 group"
                    >
                      <MediaBox className="size-16 shrink-0">
                        {({ onLoad, imgClassName }) =>
                          src ? (
                            <Image
                              src={src}
                              alt={assetAlt(product.thumbnail?.alt, product.title, locale)}
                              fill
                              className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${imgClassName}`}
                              sizes="64px"
                              onLoad={onLoad}
                              onError={onLoad}
                            />
                          ) : null
                        }
                      </MediaBox>
                      <div className="min-w-0 flex-1">
                        <p className="tracking-tight truncate">
                          {product.category?.title ?? product.title}
                        </p>
                        <p className="text-sm text-muted truncate">
                          {product.shortDescription}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="pt-2 pb-1 text-[0.7rem] tracking-[0.12em] uppercase text-muted">
            {labels.esc}
          </p>
        </div>
      </div>
    </div>
  );
}
