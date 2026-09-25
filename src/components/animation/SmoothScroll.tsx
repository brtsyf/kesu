"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        anchors: true,
        // autoToggle + stop()/start() leaves html { overflow: clip } forever:
        // stop() only sets the style, start() no-ops unless isStopped flipped via transitionend.
        autoToggle: false,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
