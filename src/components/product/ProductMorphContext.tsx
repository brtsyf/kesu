"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { SHARED_IMAGE_MS } from "@/lib/motion";

export type MorphRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type MorphDirection = "forward" | "reverse";

export type ProductMorphPayload = {
  slug: string;
  alt: string;
  bottleSrc?: string;
  backdropSrc?: string;
  imageSrc?: string;
  from: MorphRect;
  direction: MorphDirection;
};

export type MorphCache = {
  slug: string;
  alt: string;
  bottleSrc?: string;
  backdropSrc?: string;
  imageSrc?: string;
  cardRect: MorphRect;
  detailRect: MorphRect;
  /** List scrollY when the card was clicked — restore on reverse */
  listScrollY: number;
  ts: number;
};

type Ctx = {
  active: ProductMorphPayload | null;
  destination: MorphRect | null;
  /** Real page image revealed under overlay just before overlay unmounts */
  handoff: boolean;
  start: (
    payload: ProductMorphPayload,
    options?: { destination?: MorphRect },
  ) => void;
  setDestination: (rect: MorphRect) => void;
  complete: () => void;
  beginHandoff: () => void;
  isActiveSlug: (slug: string) => boolean;
  /** True while overlay should be the only visible product image */
  shouldHideSlug: (slug: string) => boolean;
};

const ProductMorphContext = createContext<Ctx | null>(null);

const REVERSE_KEY = "kesu-reverse-morph";

export function readMorphCache(): MorphCache | null {
  try {
    const raw = sessionStorage.getItem(REVERSE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MorphCache;
  } catch {
    return null;
  }
}

export function writeMorphCache(cache: MorphCache) {
  try {
    sessionStorage.setItem(REVERSE_KEY, JSON.stringify(cache));
  } catch {
    /* ignore */
  }
}

export function cacheForwardEntry(input: {
  slug: string;
  alt: string;
  bottleSrc?: string;
  backdropSrc?: string;
  imageSrc?: string;
  cardRect: MorphRect;
  listScrollY: number;
}) {
  writeMorphCache({
    ...input,
    detailRect: input.cardRect,
    ts: Date.now(),
  });
}

export function cacheDetailRect(slug: string, detailRect: MorphRect) {
  const prev = readMorphCache();
  if (!prev || prev.slug !== slug) return;
  writeMorphCache({ ...prev, detailRect, ts: Date.now() });
}

export function clearMorphCache() {
  try {
    sessionStorage.removeItem(REVERSE_KEY);
  } catch {
    /* ignore */
  }
}

function isProductPath(path: string) {
  return /^\/urunler\/[^/]+$/.test(path);
}

function isListPath(path: string) {
  return path === "/" || path === "/urunler";
}

function ProductMorphRouteSync() {
  const pathname = usePathname();
  const { active, start } = useProductMorph();
  const prevPath = useRef(pathname);

  useLayoutEffect(() => {
    const prev = prevPath.current;
    if (prev === pathname) return;
    prevPath.current = pathname;

    if (active) return;
    if (!isProductPath(prev) || !isListPath(pathname)) return;

    const cached = readMorphCache();
    if (!cached) return;
    if (Date.now() - cached.ts > 12000) {
      clearMorphCache();
      return;
    }

    start(
      {
        slug: cached.slug,
        alt: cached.alt,
        bottleSrc: cached.bottleSrc,
        backdropSrc: cached.backdropSrc,
        imageSrc: cached.imageSrc,
        from: cached.detailRect,
        direction: "reverse",
      },
      // Destination set by ProductCard after listScrollY is restored
    );
  }, [pathname, active, start]);

  return null;
}

export function ProductMorphProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ProductMorphPayload | null>(null);
  const [destination, setDestinationState] = useState<MorphRect | null>(null);
  const [handoff, setHandoff] = useState(false);

  const start = useCallback(
    (
      payload: ProductMorphPayload,
      options?: { destination?: MorphRect },
    ) => {
      setHandoff(false);
      setActive(payload);
      setDestinationState(options?.destination ?? null);
      document.body.setAttribute("data-kesu-morphing", "1");

      // Warm the exact URLs the destination page will paint
      [payload.bottleSrc, payload.backdropSrc, payload.imageSrc].forEach(
        (src) => {
          if (!src) return;
          const img = new window.Image();
          img.decoding = "async";
          img.src = src;
        },
      );
    },
    [],
  );

  // Lock after first destination — mid-flight updates restart Framer and cut the tween short
  const setDestination = useCallback((rect: MorphRect) => {
    setDestinationState((prev) => prev ?? rect);
  }, []);

  const complete = useCallback(() => {
    setActive((current) => {
      if (current?.direction === "reverse") clearMorphCache();
      return null;
    });
    setDestinationState(null);
    setHandoff(false);
    document.body.removeAttribute("data-kesu-morphing");
    document
      .querySelectorAll("[data-kesu-morph-hide]")
      .forEach((el) => el.removeAttribute("data-kesu-morph-hide"));
  }, []);

  const beginHandoff = useCallback(() => {
    setHandoff(true);
  }, []);

  const isActiveSlug = useCallback(
    (slug: string) => Boolean(active && active.slug === slug),
    [active],
  );

  const shouldHideSlug = useCallback(
    (slug: string) => Boolean(active && active.slug === slug && !handoff),
    [active, handoff],
  );

  const value = useMemo(
    () => ({
      active,
      destination,
      handoff,
      start,
      setDestination,
      complete,
      isActiveSlug,
      shouldHideSlug,
      beginHandoff,
    }),
    [
      active,
      destination,
      handoff,
      start,
      setDestination,
      complete,
      isActiveSlug,
      shouldHideSlug,
      beginHandoff,
    ],
  );

  return (
    <ProductMorphContext.Provider value={value}>
      {children}
      <ProductMorphRouteSync />
    </ProductMorphContext.Provider>
  );
}

export function useProductMorph() {
  const ctx = useContext(ProductMorphContext);
  if (!ctx) throw new Error("useProductMorph requires ProductMorphProvider");
  return ctx;
}

export function useProductMorphOptional() {
  return useContext(ProductMorphContext);
}

export { SHARED_IMAGE_MS };

export function hideOtherProductStages(except?: HTMLElement | null) {
  document.querySelectorAll<HTMLElement>(".kesu-product-stage").forEach((el) => {
    if (except && el === except) return;
    // Never hide the flying morph clone — reverse remount was zeroing it mid-flight
    if (el.hasAttribute("data-kesu-morph-overlay")) return;
    el.setAttribute("data-kesu-morph-hide", "");
  });
}
