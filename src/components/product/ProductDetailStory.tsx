import { Reveal } from "@/components/animation/Reveal";
import { StillLifePhoto } from "@/components/product/StillLifePhoto";
import { Container } from "@/components/ui/Container";
import { getProductTint } from "@/lib/product-media";
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

  if (!hasCopy && stillLife === undefined) return null;

  return (
    <section className="bg-[#fafaf7] pb-20 md:pb-28">
      <Container>
        <div className="grid items-center gap-10 border-t border-[#e4e0d8] pt-16 md:pt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <StillLifePhoto
              src={stillLife?.url}
              alt={stillLife?.alt || `${product.title} stüdyo`}
              tint={getProductTint(product.slug, product.category?.slug)}
            />
          </Reveal>
          <div className="lg:col-span-6">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
