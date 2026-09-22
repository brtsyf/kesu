"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ProductVisual } from "@/components/product/ProductVisual";
import { ProductMorphTarget } from "@/components/product/ProductMorphTarget";
import { ProductDetailExitMorph } from "@/components/product/ProductDetailExitMorph";
import { useProductMorphOptional } from "@/components/product/ProductMorphContext";
import { MediaBox } from "@/components/ui/MediaBox";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

function GalleryThumb({
  src,
  alt,
  active,
  onSelect,
  label,
}: {
  src: string;
  alt: string;
  active: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <MediaBox
      className={
        active ? "aspect-square border border-foreground" : "aspect-square"
      }
    >
      {({ onLoad, imgClassName }) => (
        <button
          type="button"
          onClick={onSelect}
          className="absolute inset-0"
          aria-label={label}
          aria-pressed={active}
        >
          <Image
            src={src}
            alt={alt}
            fill
            quality={85}
            sizes="120px"
            className={`object-cover ${imgClassName}`}
            onLoad={onLoad}
            onError={onLoad}
          />
        </button>
      )}
    </MediaBox>
  );
}

export function ProductGallery({
  images,
  title,
  slug,
  bottle,
  backdrop,
}: {
  images: SanityImage[];
  title: string;
  slug: string;
  bottle?: SanityImage;
  backdrop?: SanityImage;
}) {
  const morph = useProductMorphOptional();
  const reduced = useReducedMotion();
  const gallery = images.length ? images : [];
  const [active, setActive] = useState(0);
  const hasLayers = Boolean(bottle && backdrop);
  const showLayered = hasLayers && active === 0;
  const current = gallery[active] ?? gallery[0];
  const morphing = Boolean(morph?.isActiveSlug(slug));

  const bottleSrc = getImageUrl(bottle ?? current, 1600);
  const backdropSrc = getImageUrl(backdrop, 1800);
  const imageSrc = getImageUrl(current, 1600);

  if (!gallery.length && !hasLayers) {
    return (
      <div className="aspect-[4/5] bg-surface ring-1 ring-border/70 flex items-center justify-center text-muted text-sm">
        Görsel yakında
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-28 space-y-4">
      <ProductDetailExitMorph
        slug={slug}
        alt={title}
        bottleSrc={bottleSrc || undefined}
        backdropSrc={backdropSrc || undefined}
        imageSrc={imageSrc || undefined}
      />
      <ProductMorphTarget slug={slug}>
        {showLayered ? (
          <ProductVisual
            bottle={bottle}
            backdrop={backdrop}
            alt={title}
            priority
            large
            animate={!morphing && !reduced}
          />
        ) : (
          <ProductVisual
            image={current}
            alt={title}
            priority
            large
            animate={false}
          />
        )}
      </ProductMorphTarget>
      {gallery.length > 1 ? (
        <div className="kesu-gallery-thumbs grid grid-cols-4 gap-3">
          {gallery.map((image, index) => {
            const thumb = getImageUrl(image, 300);
            if (!thumb) return null;
            return (
              <GalleryThumb
                key={`${thumb}-${index}`}
                src={thumb}
                alt={getImageAlt(image, `${title} ${index + 1}`)}
                active={active === index}
                onSelect={() => setActive(index)}
                label={`Görsel ${index + 1}`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
