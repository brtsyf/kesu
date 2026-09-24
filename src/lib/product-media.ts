import type { Product, SanityImage } from "@/lib/sanity/types";

/** File stem in /public/images/products — cutout `{stem}.png`, studio `{stem}-loci.png`. */
export const PRODUCT_STEMS: Record<string, string> = {
  "kesu-six-lift": "six-lift",
  "kesu-anti-aging": "anti-aging",
  "kesu-white-effect": "white-effect",
  "kesu-eyes": "eyes",
  "kesu-hair": "hair",
  "kesu-acnera": "acnera",
  "kesu-bioca": "bioca",
  "kesu-genishine": "genishine",
  "kesu-salmon": "salmon",
};

/** Transparent cutouts used on cards + morph. */
export const PRODUCT_CUTOUTS: Record<string, string> = Object.fromEntries(
  Object.entries(PRODUCT_STEMS).map(([slug, stem]) => [
    slug,
    `/images/products/${stem}.png`,
  ]),
);

/** Studio still-life photos used on every product detail page. */
export const PRODUCT_STILL_LIFES: Record<string, string> = Object.fromEntries(
  Object.entries(PRODUCT_STEMS).map(([slug, stem]) => [
    slug,
    `/images/products/${stem}-loci.png`,
  ]),
);

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
  acnera: "#e8f0ef",
  "kesu-acnera": "#e8f0ef",
  bioca: "#f6f1e6",
  "kesu-bioca": "#f6f1e6",
  genishine: "#f5efed",
  "kesu-genishine": "#f5efed",
  salmon: "#f6eee6",
  "kesu-salmon": "#f6eee6",
};

export function getProductCutout(slug: string): string | undefined {
  return PRODUCT_CUTOUTS[slug];
}

function isRemoteUrl(url?: string): boolean {
  return Boolean(url && !url.startsWith("/"));
}

export function getRemoteProductImage(
  ...images: (SanityImage | undefined)[]
): SanityImage | undefined {
  return images.find((image) => isRemoteUrl(image?.url));
}

/** Sanity cutout first; local `/images/products` only if CMS has no photo. */
export function resolveBottleImage(
  slug: string,
  title: string,
  ...images: (SanityImage | undefined)[]
): SanityImage | undefined {
  return getRemoteProductImage(...images) ?? cutoutImage(slug, title);
}

export function getProductStillLife(
  slug: string,
  images: SanityImage[] = [],
  alt?: string,
): SanityImage | undefined {
  const cutout = getProductCutout(slug);
  const remotes = images.filter((image) => isRemoteUrl(image.url));
  const remoteStudio =
    remotes.find((image) => image.url?.includes("-loci")) ??
    (remotes.length > 1 ? remotes[1] : undefined);
  if (remoteStudio) {
    return { ...remoteStudio, alt: remoteStudio.alt || alt || "" };
  }
  const local = PRODUCT_STILL_LIFES[slug];
  if (local) {
    return (
      images.find((image) => image.url === local) ?? {
        url: local,
        alt: alt ?? "",
      }
    );
  }
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

/** Prefer Sanity photos; local cutouts are only a fallback. */
export function applyProductCutout<T extends Product>(product: T): T {
  const remote =
    (isRemoteUrl(product.thumbnail?.url) ? product.thumbnail : undefined) ??
    (isRemoteUrl(product.bottle?.url) ? product.bottle : undefined);
  const image = remote ?? cutoutImage(product.slug, product.title);
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
