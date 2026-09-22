"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductVisual } from "@/components/product/ProductVisual";
import type { HeroContent } from "@/lib/sanity/types";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ content }: { content: HeroContent }) {
  const reduced = useReducedMotion();
  const lines = content.headline.split("\n");

  const fade = (delay: number) =>
    reduced
      ? undefined
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease },
        };

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen pt-[var(--header-height)]">
      <motion.div
        className="absolute inset-0 bg-background"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        aria-hidden
      />

      <Container className="relative grid lg:grid-cols-12 gap-10 lg:gap-8 items-center py-16 lg:py-0 lg:min-h-[calc(100vh-var(--header-height))]">
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
          <motion.p className="eyebrow mb-6" {...fade(0.25)}>
            {content.eyebrow}
          </motion.p>

          <h1 className="heading-hero text-balance mb-6">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                className="block overflow-hidden"
                initial={reduced ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05, delay: 0.4 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="max-w-md text-muted text-[1.05rem] leading-relaxed mb-10"
            {...fade(0.75)}
          >
            {content.description}
          </motion.p>

          <motion.div className="flex flex-wrap gap-3" {...fade(0.95)}>
            <Button href={content.primaryCta.href}>
              {content.primaryCta.label}
            </Button>
            {content.secondaryCta ? (
              <Button href={content.secondaryCta.href} variant="secondary">
                {content.secondaryCta.label}
              </Button>
            ) : null}
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-6 xl:col-span-7 relative"
          initial={reduced ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.55, ease }}
        >
          <ProductVisual
            bottle={content.bottle}
            backdrop={content.backdrop}
            image={content.image}
            alt="Kesu ürün görseli"
            priority
            large
            className="md:aspect-[5/6] lg:aspect-[4/5] xl:ml-8 shadow-[0_32px_80px_rgba(24,32,27,0.16)]"
          />
        </motion.div>
      </Container>
    </section>
  );
}
