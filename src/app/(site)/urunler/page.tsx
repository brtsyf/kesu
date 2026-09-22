import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { getCategories, getProducts } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ürünler | Kesu",
  description: "Kesu bakım koleksiyonunu keşfedin.",
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
          <h1 className="heading-section text-balance mb-5 max-w-3xl">
            Ürünler
          </h1>
          <p className="text-muted max-w-xl mb-14 md:mb-20 leading-relaxed">
            Sade bir rutin için seçilmiş formüller. Her ürün tek başına güçlü,
            birlikte dengeli.
          </p>
        </Reveal>
        <ProductCatalog products={products} categories={categories} />
      </Container>
    </section>
  );
}
