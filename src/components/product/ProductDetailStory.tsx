import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/lib/sanity/types";

export function ProductDetailStory({ product }: { product: Product }) {
  const hasBenefits = Boolean(product.benefits?.length);
  const hasIngredients = Boolean(product.ingredients?.length);

  return (
    <>
      <section className="bg-[#fafaf7] pb-20 md:pb-28">
        <Container>
          <div className="grid gap-12 border-t border-[#e4e0d8] pt-16 md:pt-20 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="mb-4 text-[0.95rem] text-[#7a776e]">Açıklama</p>
              <h2 className="heading-display mb-6 text-balance text-[#141414]">
                Formülün odak noktası.
              </h2>
              <p className="max-w-lg text-[0.98rem] leading-[1.8] text-[#6b6860]">
                {product.description}
              </p>
            </Reveal>
            {product.usage ? (
              <Reveal className="lg:col-span-6" delay={0.08}>
                <p className="mb-4 text-[0.95rem] text-[#7a776e]">Kullanım</p>
                <h2 className="heading-display mb-6 text-balance text-[#141414]">
                  Profesyonel uygulama.
                </h2>
                <p className="max-w-lg text-[0.98rem] leading-[1.8] text-[#6b6860]">
                  {product.usage}
                </p>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      {hasBenefits ? (
        <section className="bg-[#fafaf7] pb-20 md:pb-28">
          <Container>
            <Reveal>
              <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-12 lg:items-end">
                <h2 className="heading-section text-balance lg:col-span-7">
                  <span className="block">Net bir ihtiyaç.</span>
                  <span className="block">Net bir formül.</span>
                </h2>
                <p className="max-w-md text-[0.98rem] leading-relaxed text-[#7a776e] lg:col-span-5 lg:justify-self-end">
                  {product.tagline
                    ? `${product.tagline} için geliştirilmiş klinik endikasyon.`
                    : "Her formül spesifik bir endikasyona odaklanır."}
                </p>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.benefits.map((benefit, index) => (
                <Reveal key={benefit} delay={index * 0.04}>
                  <article className="min-h-[8.5rem] rounded-[1.35rem] bg-white/70 px-7 py-7 ring-1 ring-[#e8e4dc]">
                    <p className="text-[1.05rem] font-medium leading-snug tracking-[-0.02em] text-[#141414]">
                      {benefit}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {hasIngredients ? (
        <section className="bg-[#fafaf7] pb-20 md:pb-28">
          <Container>
            <Reveal>
              <p className="mb-4 text-[0.95rem] text-[#7a776e]">İçerikler</p>
              <h2 className="heading-display mb-8 text-balance text-[#141414]">
                Formülün dili.
              </h2>
              <p className="max-w-3xl text-[0.95rem] leading-[1.9] text-[#7a776e]">
                {product.ingredients.join(" · ")}
              </p>
            </Reveal>
          </Container>
        </section>
      ) : null}
    </>
  );
}
