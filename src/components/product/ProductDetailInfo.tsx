"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { detailContentTransition, premiumEase } from "@/lib/motion";
import type { Product } from "@/lib/sanity/types";

const item = (delay: number, y = 18) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { ...detailContentTransition, delay },
});

export function ProductDetailInfo({ product }: { product: Product }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <ProductDetailInfoStatic product={product} />;
  }

  return (
    <div className="lg:pt-4">
      {product.category ? (
        <motion.p className="eyebrow mb-4" {...item(0.28, 12)}>
          {product.category.title}
        </motion.p>
      ) : null}
      <motion.h1
        className="heading-display text-balance mb-4"
        {...item(0.34, 20)}
      >
        {product.title}
      </motion.h1>
      <motion.p
        className="text-muted text-lg mb-10 max-w-md leading-relaxed"
        {...item(0.4, 15)}
      >
        {product.shortDescription}
      </motion.p>
      <motion.div {...item(0.46, 10)} className="mb-14">
        <Button href="/iletisim">Bilgi Al</Button>
      </motion.div>

      <motion.div
        className="space-y-10 border-t border-border pt-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.52, ease: premiumEase }}
      >
        <div>
          <h2 className="text-sm tracking-[0.14em] uppercase mb-3">Açıklama</h2>
          <p className="text-muted leading-relaxed max-w-lg">
            {product.description}
          </p>
        </div>
        {product.benefits?.length ? (
          <div>
            <h2 className="text-sm tracking-[0.14em] uppercase mb-3">
              Faydalar
            </h2>
            <ul className="space-y-2 text-muted">
              {product.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {product.usage ? (
          <div>
            <h2 className="text-sm tracking-[0.14em] uppercase mb-3">
              Kullanım
            </h2>
            <p className="text-muted leading-relaxed max-w-lg">{product.usage}</p>
          </div>
        ) : null}
        {product.ingredients?.length ? (
          <div>
            <h2 className="text-sm tracking-[0.14em] uppercase mb-3">
              İçerikler
            </h2>
            <p className="text-muted leading-relaxed max-w-lg">
              {product.ingredients.join(" · ")}
            </p>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}

function ProductDetailInfoStatic({ product }: { product: Product }) {
  return (
    <div className="lg:pt-4">
      {product.category ? (
        <p className="eyebrow mb-4">{product.category.title}</p>
      ) : null}
      <h1 className="heading-display text-balance mb-4">{product.title}</h1>
      <p className="text-muted text-lg mb-10 max-w-md leading-relaxed">
        {product.shortDescription}
      </p>
      <Button href="/iletisim" className="mb-14">
        Bilgi Al
      </Button>
      <div className="space-y-10 border-t border-border pt-10">
        <div>
          <h2 className="text-sm tracking-[0.14em] uppercase mb-3">Açıklama</h2>
          <p className="text-muted leading-relaxed max-w-lg">
            {product.description}
          </p>
        </div>
        {product.benefits?.length ? (
          <div>
            <h2 className="text-sm tracking-[0.14em] uppercase mb-3">
              Faydalar
            </h2>
            <ul className="space-y-2 text-muted">
              {product.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {product.usage ? (
          <div>
            <h2 className="text-sm tracking-[0.14em] uppercase mb-3">
              Kullanım
            </h2>
            <p className="text-muted leading-relaxed max-w-lg">{product.usage}</p>
          </div>
        ) : null}
        {product.ingredients?.length ? (
          <div>
            <h2 className="text-sm tracking-[0.14em] uppercase mb-3">
              İçerikler
            </h2>
            <p className="text-muted leading-relaxed max-w-lg">
              {product.ingredients.join(" · ")}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
