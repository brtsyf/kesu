"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { premiumEase } from "@/lib/motion";

const CONSENT_COOKIE = "kesu-consent";

type CookieConsentProps = {
  label: string;
  body: string;
  accept: string;
  details: string;
  detailsHref: string;
};

function hasConsent() {
  return document.cookie
    .split("; ")
    .some((part) => part.startsWith(`${CONSENT_COOKIE}=`));
}

export function CookieConsent({
  label,
  body,
  accept,
  details,
  detailsHref,
}: CookieConsentProps) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!hasConsent());
  }, []);

  function onAccept() {
    document.cookie = `${CONSENT_COOKIE}=1;path=/;max-age=31536000;samesite=lax`;
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-label={label}
          className="fixed inset-x-3 bottom-36 z-[45] lg:inset-x-0 lg:bottom-6 lg:mx-auto lg:w-[42rem]"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, ease: premiumEase }}
        >
          <div className="border border-border bg-[#fafaf7]/95 px-5 py-4 shadow-[0_16px_40px_rgba(20,20,18,0.08)] backdrop-blur-md lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-7 lg:py-5">
            <p className="text-[0.92rem] leading-relaxed text-[#3c403b] lg:text-[0.98rem]">
              {body}{" "}
              <Link href={detailsHref} className="underline underline-offset-4">
                {details}
              </Link>
            </p>
            <button
              type="button"
              onClick={onAccept}
              className="mt-4 inline-flex shrink-0 bg-dark px-5 py-2.5 text-[0.75rem] tracking-[0.08em] text-background uppercase transition-colors duration-500 hover:bg-accent-deep lg:mt-0"
            >
              {accept}
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
