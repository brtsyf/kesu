"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useProductMorphOptional } from "@/components/product/ProductMorphContext";

/** Forward morph: scroll + report detail hero as destination. */
export function ProductMorphTarget({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const morph = useProductMorphOptional();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const locked = useRef(false);
  const active = Boolean(morph?.active && morph.active.slug === slug);
  const isForwardDest = Boolean(
    active && morph?.active?.direction === "forward",
  );
  const hide = Boolean(morph?.shouldHideSlug(slug));

  useLayoutEffect(() => {
    if (!isForwardDest || !morph || reduced) {
      locked.current = false;
      return;
    }

    locked.current = false;

    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.scrollTop = 0;
    document.body.scrollTop = 0;
    html.style.scrollBehavior = prev;

    const measure = () => {
      if (locked.current) return;
      const el = ref.current;
      if (!el) return;
      const stage =
        el.querySelector<HTMLElement>(".kesu-product-stage") ?? el;
      const r = stage.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) return;
      locked.current = true;
      morph.setDestination({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      });
    };

    measure();
    const raf = window.requestAnimationFrame(measure);

    return () => window.cancelAnimationFrame(raf);
  }, [isForwardDest, morph, reduced]);

  return (
    <div
      ref={ref}
      className={hide ? "opacity-[0.01]" : undefined}
      aria-hidden={hide ? true : undefined}
      data-kesu-detail-hero=""
      data-kesu-product-slug={slug}
    >
      {children}
    </div>
  );
}
