"use client";

import { LayoutGroup, MotionConfig } from "framer-motion";
import { premiumEase, SHARED_IMAGE_MS } from "@/lib/motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ ease: premiumEase, duration: SHARED_IMAGE_MS / 1000 }}
    >
      <LayoutGroup id="kesu-site">{children}</LayoutGroup>
    </MotionConfig>
  );
}
