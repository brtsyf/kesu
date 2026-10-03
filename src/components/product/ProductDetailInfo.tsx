"use client";

import { motion, useReducedMotion } from "framer-motion";
import { detailContentTransition } from "@/lib/motion";
import { getProductTint } from "@/lib/product-media";
import type { Product } from "@/lib/sanity/types";

const DETAIL_COPY: Record<
  string,
  { eyebrow: string; lead: string; intro: string }
> = {
  "kesu-six-lift": {
    eyebrow: "Sıkılık & elastikiyet bakımı",
    lead: "Doğal ifade, burada başlar.",
    intro: "Toparlanmış bir sonuç için geliştirildi.",
  },
  "kesu-anti-aging": {
    eyebrow: "Nem & canlılık bakımı",
    lead: "Derin bir tazelikle yeniden kurulur.",
    intro:
      "İnce çizgi ve matlığı aynı anda ele alır.",
  },
  "kesu-white-effect": {
    eyebrow: "Ton eşitliği & aydınlık bakımı",
    lead: "Işık, dengeli bir zeminde başlar.",
    intro: "Leke bakımını ferah bir ifadeye bağlar.",
  },
  "kesu-eyes": {
    eyebrow: "Göz çevresi bakımı",
    lead: "Özen, en hassas çizgide başlar.",
    intro: "Nazik ve odaklı bir formül sunar.",
  },
  "kesu-hair": {
    eyebrow: "Saç & saç derisi bakımı",
    lead: "Kök, telin ötesinde başlar.",
    intro: "Bütüncül bir yaklaşım.",
  },
  "kesu-acnera": {
    eyebrow: "Akne ve yağlanma bakımı",
    lead: "Daha temiz ve dengeli bir cilt.",
    intro: "Tek formülde ele alınır.",
  },
  "kesu-bioca": {
    eyebrow: "Yüz ve boyun bakımı",
    lead: "Daha sıkı ve toparlanmış bir görünüm.",
    intro: "Aynı formül, iki bölgeyi de kapsar.",
  },
  "kesu-genishine": {
    eyebrow: "Kol altı ve genital bölge dış cilt bakımı",
    lead: "Daha aydınlık ve eşit bir görünüm.",
    intro:
      "Bölgesel koyuluğu hedefleyen bir formül.",
  },
  "kesu-salmon": {
    eyebrow: "Cilt yenileme ve bakım",
    lead: "Daha canlı ve ışıltılı bir görünüm.",
    intro: "Nem ve elastikiyeti bir araya getirir.",
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

function ProductNameRule({ tint }: { tint: string }) {
  return (
    <span
      aria-hidden
      className="mt-4 block h-[3px] w-28"
      style={{ backgroundColor: tint }}
    />
  );
}

export function ProductDetailInfo({ product }: { product: Product }) {
  const reduced = useReducedMotion();
  const copy = copyFor(product);
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
        Profesyonel bakım koleksiyonu
      </motion.p>
    </div>
  );
}

function ProductDetailInfoBody({
  product,
  copy,
  name,
  tint,
}: {
  product: Product;
  copy: { eyebrow: string; lead: string; intro: string };
  name: string;
  tint: string;
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
        Profesyonel bakım koleksiyonu
      </p>
    </div>
  );
}
