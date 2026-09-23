"use client";

import { MotionConfig } from "framer-motion";
import { ProductMorphProvider } from "@/components/product/ProductMorphContext";
import { ProductMorphOverlay } from "@/components/product/ProductMorphOverlay";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { premiumEase, SHARED_IMAGE_MS } from "@/lib/motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ ease: premiumEase, duration: SHARED_IMAGE_MS / 1000 }}
    >
      <SmoothScroll>
        <ProductMorphProvider>
          {children}
          <ProductMorphOverlay />
        </ProductMorphProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}
