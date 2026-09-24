"use client";

import { motion, useReducedMotion } from "framer-motion";
import { detailContentTransition } from "@/lib/motion";
import type { Product } from "@/lib/sanity/types";

const DETAIL_COPY: Record<
  string,
  { eyebrow: string; lead: string; intro: string }
> = {
  "kesu-six-lift": {
    eyebrow: "Sıkılık & elastikiyet bakımı",
    lead: "Sıkılık, cildin doğal ifadesinde başlar.",
    intro:
      "Sarkma, elastikiyet kaybı ve yorgun görünüme yönelik lifting solüsyonu. Somon DNA destekli formül, daha toparlanmış bir cilt ifadesi için geliştirilmiştir.",
  },
  "kesu-anti-aging": {
    eyebrow: "Nem & canlılık bakımı",
    lead: "Canlılık, derin nemle yeniden kurulur.",
    intro:
      "İnce çizgi, matlık ve nem kaybına odaklanan anti-aging solüsyonu. Cildi canlandırmaya, nem dengesini desteklemeye yardımcı olur.",
  },
  "kesu-white-effect": {
    eyebrow: "Ton eşitliği & aydınlık bakımı",
    lead: "Aydınlık, eşit bir tonda başlar.",
    intro:
      "Leke ve donuk görünüm için whitening solüsyonu. Cilt tonunu dengelemeye ve daha ışıklı bir ifade kazandırmaya yardımcı olur.",
  },
  "kesu-eyes": {
    eyebrow: "Göz çevresi bakımı",
    lead: "Özen, en hassas çizgide başlar.",
    intro:
      "Göz çevresi ince çizgi, koyu halka ve yorgunluk görünümüne yönelik özel solüsyon. Hassas bölge için nazik, odaklı bir bakım sunar.",
  },
  "kesu-hair": {
    eyebrow: "Saç & saç derisi bakımı",
    lead: "Bakım, saç tellerinin ötesinde başlar.",
    intro:
      "Saç ve saç derisini bir bütün olarak ele alan profesyonel yaklaşım. Zayıf ve ince saç tellerinin daha güçlü, dolgun görünümüne yönelik bakım sunar.",
  },
};

const item = (delay: number, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { ...detailContentTransition, delay },
});

function copyFor(product: Product) {
  return (
    DETAIL_COPY[product.slug] ?? {
      eyebrow: product.tagline ?? product.category?.title ?? "Kesu",
      lead: product.tagline ?? product.title,
      intro: product.shortDescription,
    }
  );
}

export function ProductDetailInfo({ product }: { product: Product }) {
  const reduced = useReducedMotion();
  const copy = copyFor(product);
  const name = product.category?.title ?? product.title;

  if (reduced) {
    return (
      <ProductDetailInfoBody product={product} copy={copy} name={name} />
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
      <motion.p
        className="mb-8 max-w-lg text-[0.95rem] leading-[1.8] text-[#6b6860]"
        {...item(0.44, 12)}
      >
        {product.description}
      </motion.p>
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
        {product.volume ?? "5 × 10 ml"}
        <span className="mx-2.5 text-[#d0cbc2]">|</span>
        Profesyonel bakım koleksiyonu
      </motion.p>
    </div>
  );
}

function ProductDetailInfoBody({
  product,
  copy,
  name,
}: {
  product: Product;
  copy: { eyebrow: string; lead: string; intro: string };
  name: string;
}) {
  return (
    <div className="max-w-xl lg:pt-4">
      <p className="mb-5 text-[0.95rem] text-[#7a776e]">{copy.eyebrow}</p>
      <h1 className="heading-section mb-6 text-[#141414]">{name}</h1>
      <p className="mb-5 max-w-md text-[1.35rem] font-medium leading-snug tracking-[-0.03em] text-[#141414] md:text-[1.5rem]">
        {copy.lead}
      </p>
      <p className="mb-6 max-w-md text-[0.98rem] leading-[1.75] text-[#6b6860]">
        {copy.intro}
      </p>
      <p className="mb-8 max-w-lg text-[0.95rem] leading-[1.8] text-[#6b6860]">
        {product.description}
      </p>
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
        {product.volume ?? "5 × 10 ml"}
        <span className="mx-2.5 text-[#d0cbc2]">|</span>
        Profesyonel bakım koleksiyonu
      </p>
    </div>
  );
}
