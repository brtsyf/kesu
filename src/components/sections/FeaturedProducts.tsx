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
  eyebrow,
  title,
  description,
  products,
}: FeaturedProductsProps) {
  const [primary, ...rest] = products;

  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-14 md:mb-20">
            <h2 className="heading-section lg:col-span-7 text-balance">{title}</h2>
            <p className="lg:col-span-5 lg:pt-4 text-muted max-w-md leading-relaxed">
              {description}
            </p>
          </div>
        </Reveal>

        {primary ? (
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-7">
              <ProductCard product={primary} large />
            </div>
            <div className="lg:col-span-5 flex flex-col gap-10 lg:gap-8 lg:pt-16">
              {rest.slice(0, 2).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
