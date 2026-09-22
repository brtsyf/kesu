"use client";

import { useLayoutEffect } from "react";
import { useProductMorphOptional } from "@/components/product/ProductMorphContext";

/** Direct visits / non-morph navigations still land at top. */
export function ProductTransitionScroll() {
  const morph = useProductMorphOptional();
  const morphing = Boolean(morph?.active);

  useLayoutEffect(() => {
    if (morphing) return;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, [morphing]);

  return null;
}
