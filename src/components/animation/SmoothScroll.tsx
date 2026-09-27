"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import type { ReactNode } from "react";
import { restorePageScroll } from "@/lib/scroll-lock";

function ScrollRestore() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      restorePageScroll(lenis);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, lenis]);

  return null;
}

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
      <ScrollRestore />
      {children}
    </ReactLenis>
  );
}
