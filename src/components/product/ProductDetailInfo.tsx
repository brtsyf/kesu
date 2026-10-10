"use client";

import { motion, useReducedMotion } from "framer-motion";
import { detailContentTransition } from "@/lib/motion";
import { getProductTint } from "@/lib/product-media";
import type { ProductDetailCopy } from "@/lib/i18n/types";
import type { Product } from "@/lib/sanity/types";

const item = (delay: number, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { ...detailContentTransition, delay },
});

function fallbackCopy(product: Product): ProductDetailCopy {
  return {
    eyebrow: product.tagline ?? product.category?.title ?? "Kesu",
    lead: product.tagline ?? product.title,
    intro: product.shortDescription,
  };
}

function ProductNameRule({ tint }: { tint: string }) {
  return (
    <span
      aria-hidden
      className="mt-4 block h-[3px] w-28"
      style={{ backgroundColor: tint }}
    />
  );
}

export function ProductDetailInfo({
  product,
  copy = fallbackCopy(product),
  collectionLabel = "Profesyonel bakım koleksiyonu",
}: {
  product: Product;
  copy?: ProductDetailCopy;
  collectionLabel?: string;
}) {
  const reduced = useReducedMotion();
  const name = product.category?.title ?? product.title;
  const tint =
    product.cardTint ?? getProductTint(product.slug, product.category?.slug);

  if (reduced) {
    return (
      <ProductDetailInfoBody
        product={product}
        copy={copy}
        name={name}
        tint={tint}
        collectionLabel={collectionLabel}
      />
    );
  }

  return (
    <div className="max-w-xl lg:pt-4">
      <motion.p
        className="mb-5 text-[0.95rem] text-[#7a776e]"
        {...item(0.22, 10)}
      >
        {copy.eyebrow}
      </motion.p>
      <motion.h1
        className="heading-section mb-6 text-[#141414]"
        {...item(0.28, 18)}
      >
        {name}
        <ProductNameRule tint={tint} />
      </motion.h1>
      <motion.p
        className="mb-5 max-w-md text-[1.35rem] font-medium leading-snug tracking-[-0.03em] text-[#141414] md:text-[1.5rem]"
        {...item(0.34, 14)}
      >
        {copy.lead}
      </motion.p>
      <motion.p
        className="mb-6 max-w-md text-[0.98rem] leading-[1.75] text-[#6b6860]"
        {...item(0.4, 12)}
      >
        {copy.intro}
      </motion.p>
      {product.description ? (
        <motion.p
          className="mb-8 max-w-lg text-[0.95rem] leading-[1.8] text-[#6b6860]"
          {...item(0.44, 12)}
        >
          {product.description}
        </motion.p>
      ) : null}
      {product.benefits.length ? (
        <motion.ul
          className="mb-8 max-w-md space-y-2.5"
          {...item(0.48, 10)}
        >
          {product.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex gap-2.5 text-[0.92rem] leading-snug text-[#5c5a53]"
            >
              <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-[#7d8f72]" />
              {benefit}
            </li>
          ))}
        </motion.ul>
      ) : null}
      <motion.p
        className="text-[0.92rem] text-[#8a867c]"
        {...item(0.52, 10)}
      >
        {product.volume ? (
          <>
            {product.volume}
            <span className="mx-2.5 text-[#d0cbc2]">|</span>
          </>
        ) : null}
        {collectionLabel}
      </motion.p>
    </div>
  );
}

function ProductDetailInfoBody({
  product,
  copy,
  name,
  tint,
  collectionLabel,
}: {
  product: Product;
  copy: { eyebrow: string; lead: string; intro: string };
  name: string;
  tint: string;
  collectionLabel: string;
}) {
  return (
    <div className="max-w-xl lg:pt-4">
      <p className="mb-5 text-[0.95rem] text-[#7a776e]">{copy.eyebrow}</p>
      <h1 className="heading-section mb-6 text-[#141414]">
        {name}
        <ProductNameRule tint={tint} />
      </h1>
      <p className="mb-5 max-w-md text-[1.35rem] font-medium leading-snug tracking-[-0.03em] text-[#141414] md:text-[1.5rem]">
        {copy.lead}
      </p>
      <p className="mb-6 max-w-md text-[0.98rem] leading-[1.75] text-[#6b6860]">
        {copy.intro}
      </p>
      {product.description ? (
        <p className="mb-8 max-w-lg text-[0.95rem] leading-[1.8] text-[#6b6860]">
          {product.description}
        </p>
      ) : null}
      {product.benefits.length ? (
        <ul className="mb-8 max-w-md space-y-2.5">
          {product.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex gap-2.5 text-[0.92rem] leading-snug text-[#5c5a53]"
            >
              <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-[#7d8f72]" />
              {benefit}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="text-[0.92rem] text-[#8a867c]">
        {product.volume ? (
          <>
            {product.volume}
            <span className="mx-2.5 text-[#d0cbc2]">|</span>
          </>
        ) : null}
        {collectionLabel}
      </p>
    </div>
  );
}
