import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import type { Product, SanityImage } from "@/lib/sanity/types";

export function ProductDetailStory({
  product,
  stillLife,
}: {
  product: Product;
  stillLife?: SanityImage;
}) {
  const hasIngredients = Boolean(product.ingredients?.length);
  const hasCopy = Boolean(product.usage || hasIngredients);

  if (!hasCopy && !stillLife?.url) return null;

  const copy = (
    <div className="flex flex-col justify-center gap-12 lg:min-h-full lg:py-4">
      {product.usage ? (
        <Reveal>
          <p className="mb-4 text-[0.95rem] text-[#7a776e]">Kullanım</p>
          <h2 className="heading-display mb-6 text-balance text-[#141414]">
            Profesyonel uygulama.
          </h2>
          <p className="max-w-lg text-[0.98rem] leading-[1.8] text-[#6b6860]">
            {product.usage}
          </p>
        </Reveal>
      ) : null}
      {hasIngredients ? (
        <Reveal delay={0.06}>
          <p className="mb-4 text-[0.95rem] text-[#7a776e]">İçerikler</p>
          <h2 className="heading-display mb-6 text-balance text-[#141414]">
            Formülün dili.
          </h2>
          <p className="max-w-lg text-[0.95rem] leading-[1.9] text-[#7a776e]">
            {product.ingredients.join(" · ")}
          </p>
        </Reveal>
      ) : null}
    </div>
  );

  return (
    <section className="bg-[#fafaf7] pb-20 md:pb-28">
      <Container>
        {stillLife?.url ? (
          <div className="grid items-center gap-10 border-t border-[#e4e0d8] pt-16 md:pt-20 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <figure className="overflow-hidden rounded-[2.25rem] bg-[#f4f2ee] md:rounded-[2.75rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stillLife.url}
                  alt={stillLife.alt ?? product.title}
                  className="aspect-[4/5] w-full object-cover object-[50%_40%]"
                />
              </figure>
            </Reveal>
            <div className="lg:col-span-6">{copy}</div>
          </div>
        ) : (
          <div className="border-t border-[#e4e0d8] pt-16 md:pt-20">{copy}</div>
        )}
      </Container>
    </section>
  );
}
