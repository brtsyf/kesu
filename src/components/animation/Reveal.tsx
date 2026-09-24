"use client";

import { useLayoutEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useProductMorphOptional } from "@/components/product/ProductMorphContext";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  const morphing = Boolean(useProductMorphOptional()?.active);
  const [frozen, setFrozen] = useState(false);

  useLayoutEffect(() => {
    if (morphing) setFrozen(true);
  }, [morphing]);

  const skip = reduced || morphing || frozen;

  return (
    <motion.div
      className={cn(className)}
      initial={skip ? false : { opacity: 0, y }}
      animate={skip ? { opacity: 1, y: 0 } : undefined}
      whileInView={skip ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={
        skip
          ? { duration: 0, delay: 0 }
          : {
              duration: 0.9,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
}
