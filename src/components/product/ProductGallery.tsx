"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductVisual } from "@/components/product/ProductVisual";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils/cn";
import type { SanityImage } from "@/lib/sanity/types";

export function ProductGallery({
  images,
  title,
  bottle,
  backdrop,
}: {
  images: SanityImage[];
  title: string;
  bottle?: SanityImage;
  backdrop?: SanityImage;
}) {
  const gallery = images.length ? images : [];
  const [active, setActive] = useState(0);
  const hasLayers = Boolean(bottle && backdrop);
  const showLayered = hasLayers && active === 0;
  const current = gallery[active] ?? gallery[0];
  const src = getImageUrl(current, 1600);

  if (!gallery.length && !hasLayers) {
    return (
      <div className="aspect-[4/5] bg-surface flex items-center justify-center text-muted text-sm">
        Görsel yakında
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-28 space-y-4">
      {showLayered ? (
        <ProductVisual
          bottle={bottle}
          backdrop={backdrop}
          alt={title}
          priority
          large
        />
      ) : (
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          {src ? (
            <Image
              src={src}
              alt={getImageAlt(current, title)}
              fill
              priority
              quality={92}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : null}
        </div>
      )}
      {gallery.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {gallery.map((image, index) => {
            const thumb = getImageUrl(image, 300);
            return (
              <button
                key={`${thumb}-${index}`}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "relative aspect-square overflow-hidden bg-surface border transition-colors",
                  active === index ? "border-foreground" : "border-transparent",
                )}
                aria-label={`Görsel ${index + 1}`}
                aria-pressed={active === index}
              >
                {thumb ? (
                  <Image
                    src={thumb}
                    alt={getImageAlt(image, `${title} ${index + 1}`)}
                    fill
                    quality={85}
                    sizes="120px"
                    className="object-cover"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
