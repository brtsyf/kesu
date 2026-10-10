import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { isLocale, type LocaleRoute } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizeProducts } from "@/lib/i18n/localize-product";
import { getCategories, getProducts } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: LocaleRoute) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return buildMetadata({
    title: dict.seo.productsTitle,
    description: dict.seo.productsDescription,
    path: "/urunler",
    locale: lang,
  });
}

export default async function ProductsPage({
  params,
}: LocaleRoute) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <section className="pt-[calc(var(--header-height)+4rem)] pb-24 md:pb-32">
      <Container>
        <Reveal>
          <p className="eyebrow mb-5">{dict.catalog.eyebrow}</p>
          <h1 className="heading-section text-balance mb-14 max-w-3xl md:mb-20">
            {dict.catalog.title}
          </h1>
        </Reveal>
        <ProductCatalog
          products={localizeProducts(products, lang)}
          categories={categories}
          labels={dict.catalog}
        />
      </Container>
    </section>
  );
}
