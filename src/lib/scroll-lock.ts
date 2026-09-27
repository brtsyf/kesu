"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

type ScrollController = {
  stop: () => void;
  start: () => void;
} | null | undefined;

let lockCount = 0;

function syncScrollLock(lenis?: ScrollController) {
  const html = document.documentElement;
  const body = document.body;

  if (lockCount > 0) {
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    html.style.overscrollBehavior = "none";
    lenis?.stop();
    return;
  }

  body.style.removeProperty("overflow");
  body.style.removeProperty("overscroll-behavior");
  html.style.removeProperty("overflow");
  html.style.removeProperty("overscroll-behavior");
  html.classList.remove("lenis-stopped");
  lenis?.start();
}

export function acquireScrollLock(lenis?: ScrollController) {
  lockCount += 1;
  syncScrollLock(lenis);
}

export function releaseScrollLock(lenis?: ScrollController) {
  lockCount = Math.max(0, lockCount - 1);
  syncScrollLock(lenis);
}

/** Re-apply current lock state. Heals leftover overflow/clip after route changes. */
export function restorePageScroll(lenis?: ScrollController) {
  syncScrollLock(lenis);
}

export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;
    acquireScrollLock(lenis);
    return () => releaseScrollLock(lenis);
  }, [locked, lenis]);
}
