"use client";

import { useLayoutEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Keep scroll stable for shared-element morph:
 * Next.js default scroll-to-top runs before Framer measures the leaving card,
 * so on mobile the image appears to fly in from above the viewport.
 * Cards navigate with scroll={false}; we jump to top in layout before paint.
 */
export function ProductTransitionScroll() {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) {
      window.scrollTo(0, 0);
      return;
    }
    // Instant jump so destination layoutId is measured at the correct place
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [reduced]);

  return null;
}
