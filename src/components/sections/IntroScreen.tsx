"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/brand/BrandLogo";

const STORAGE_KEY = "kesu-intro-seen";
/** Auto-dismiss after brand beat — intentionally brief */
const AUTO_DISMISS_MS = 2600;

type IntroScreenProps = {
  brand?: string;
  line?: string;
  subline?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroScreen({
  brand = "KESU",
  line = "Klinik sonuç.\nKesin formül.",
  subline = "Profesyonel estetik için Kore teknolojisi.",
}: IntroScreenProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(STORAGE_KEY));
    } catch {
      seen = false;
    }
    setVisible(!seen);
    setMounted(true);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(dismiss, reduced ? 600 : AUTO_DISMISS_MS);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, dismiss, reduced]);

  if (!mounted) return null;

  const lines = line.split("\n");

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="kesu-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-dark text-background cursor-pointer"
          role="dialog"
          aria-modal="true"
          aria-label="Karşılama"
          onClick={dismiss}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: reduced ? undefined : "blur(12px)",
            scale: reduced ? 1 : 1.02,
          }}
          transition={{ duration: reduced ? 0.18 : 0.55, ease }}
        >
          {/* Liquid field */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="kesu-intro-blob kesu-intro-blob--a" />
            <div className="kesu-intro-blob kesu-intro-blob--b" />
            <div className="kesu-intro-blob kesu-intro-blob--c" />
            <div className="kesu-intro-sheen" />
            <svg className="absolute h-0 w-0" aria-hidden>
              <defs>
                <filter id="kesu-liquid-goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="18"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12"
                    result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 px-8 text-center max-w-3xl flex flex-col items-center">
            <motion.div
              className="kesu-intro-glass mb-8 md:mb-10 px-10 py-8 md:px-14 md:py-10"
              initial={reduced ? false : { opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
            >
              <BrandLogo
                href={null}
                inverted
                priority
                width={200}
                label={brand}
                className="mx-auto justify-center [&_img]:object-center"
              />
            </motion.div>

            <h1 className="heading-section text-balance text-background">
              {lines.map((row, i) => (
                <motion.span
                  key={row}
                  className="block overflow-hidden"
                  initial={reduced ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.22 + i * 0.1,
                    ease,
                  }}
                >
                  {row}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-6 text-[0.95rem] md:text-base text-dark-muted tracking-wide"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.48, ease }}
            >
              {subline}
            </motion.p>

            <motion.div
              className="kesu-intro-drop mx-auto mt-8"
              aria-hidden
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.62, ease }}
            />

            <motion.p
              className="mt-8 text-[0.65rem] tracking-[0.2em] uppercase text-dark-muted/75"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.75, ease }}
            >
              Devam etmek için dokunun
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
