import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import type { Product } from "@/lib/sanity/types";

type FeaturedProductsProps = {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
};

export function FeaturedProducts({
  title,
  description,
  products,
}: FeaturedProductsProps) {
  const lines = title.split("\n");

  return (
    <section className="rounded-t-[2.25rem] bg-[#fafaf7] py-24 shadow-[0_-18px_50px_rgba(20,20,18,0.06)] md:rounded-t-[2.75rem] md:py-32">
      <Container>
        <Reveal>
          <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
            <h2 className="heading-section text-balance lg:col-span-7">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="max-w-md text-[0.98rem] leading-relaxed text-[#7a776e] lg:col-span-5 lg:justify-self-end">
              {description}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product._id} delay={index * 0.05} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
