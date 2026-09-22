"use client";

import { LayoutGroup, MotionConfig } from "framer-motion";
import { premiumEase } from "@/lib/motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ ease: premiumEase, duration: 0.85 }}
    >
      <LayoutGroup id="kesu-site">{children}</LayoutGroup>
    </MotionConfig>
  );
}
