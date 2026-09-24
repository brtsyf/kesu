import type { Product, SanityImage } from "@/lib/sanity/types";

/** Transparent cutouts used on cards + morph. */
export const PRODUCT_CUTOUTS: Record<string, string> = {
  "kesu-six-lift": "/images/products/six-lift.png",
  "kesu-anti-aging": "/images/products/anti-aging.png",
  "kesu-white-effect": "/images/products/white-effect.png",
  "kesu-eyes": "/images/products/eyes.png",
  "kesu-hair": "/images/products/hair.png",
};

export const PRODUCT_CARD_TINTS: Record<string, string> = {
  "kesu-six-lift": "#eef1ec",
  lifting: "#eef1ec",
  "anti-aging": "#f6eeed",
  "kesu-anti-aging": "#f6eeed",
  whitening: "#f5f2e8",
  "kesu-white-effect": "#f5f2e8",
  eyes: "#f1f0f5",
  "kesu-eyes": "#f1f0f5",
  hair: "#f3eee8",
  "kesu-hair": "#f3eee8",
};

export function getProductCutout(slug: string): string | undefined {
  return PRODUCT_CUTOUTS[slug];
}

export function getProductStillLife(
  slug: string,
  images: SanityImage[] = [],
): SanityImage | undefined {
  const cutout = getProductCutout(slug);
  return images.find((image) => image.url && image.url !== cutout);
}

export function getProductTint(slug: string, categorySlug?: string): string {
  return (
    PRODUCT_CARD_TINTS[slug] ??
    (categorySlug ? PRODUCT_CARD_TINTS[categorySlug] : undefined) ??
    "#f4f2ee"
  );
}

function cutoutImage(slug: string, alt: string): SanityImage | undefined {
  const url = getProductCutout(slug);
  if (!url) return undefined;
  return { url, alt };
}

/** Prefer the transparent cutout as the only product photo. */
export function applyProductCutout<T extends Product>(product: T): T {
  const image = cutoutImage(product.slug, product.title);
  if (!image) return product;
  const extras = (product.images ?? []).filter((item) => item.url !== image.url);
  return {
    ...product,
    thumbnail: image,
    bottle: image,
    backdrop: undefined,
    images: [image, ...extras],
  };
}

export function measureProductVisual(root?: ParentNode | null) {
  const scope = root ?? document;
  const cutout = scope.querySelector<HTMLElement>(".kesu-product-cutout");
  const stage = scope.querySelector<HTMLElement>(".kesu-product-stage");
  const el = cutout ?? stage;
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width < 8 || r.height < 8) return null;
  return {
    el,
    stage: stage ?? el,
    kind: cutout ? ("cutout" as const) : ("stage" as const),
    rect: {
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
    },
  };
}
