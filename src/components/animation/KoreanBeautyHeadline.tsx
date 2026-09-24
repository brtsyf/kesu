"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Wider, slower ease than the page's y+opacity Reveals. */
const wipeEase = [0.16, 1, 0.3, 1] as const;

type KoreanBeautyHeadlineProps = {
  lines: string[];
};

/**
 * Hero H1 only — tracking collapse + deblur from the left (not y+opacity).
 * Runs on mount; text stays readable (opacity 1) from the first frame.
 */
export function KoreanBeautyHeadline({ lines }: KoreanBeautyHeadlineProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <>
        {lines.map((line, index) => (
          <span
            key={`${line}-${index}`}
            lang="en"
            className="block text-[#141414]"
          >
            {line}
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block" lang="en">
          <motion.span
            className="block origin-left text-[#141414]"
            initial={{
              x: -20,
              letterSpacing: "0.08em",
              filter: "blur(8px)",
              opacity: 1,
            }}
            animate={{
              x: 0,
              letterSpacing: "-0.042em",
              filter: "blur(0px)",
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.08 + index * 0.16,
              ease: wipeEase,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}
