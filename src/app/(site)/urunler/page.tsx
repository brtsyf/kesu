import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { getCategories, getProducts } from "@/lib/sanity/fetch";
import { SEO, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: SEO.products.title,
  description: SEO.products.description,
  path: "/urunler",
});

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <section className="pt-[calc(var(--header-height)+4rem)] pb-24 md:pb-32">
      <Container>
        <Reveal>
          <p className="eyebrow mb-5">Koleksiyon</p>
          <h1 className="heading-section text-balance mb-14 max-w-3xl md:mb-20">
            Ürünler
          </h1>
        </Reveal>
        <ProductCatalog products={products} categories={categories} />
      </Container>
    </section>
  );
}
