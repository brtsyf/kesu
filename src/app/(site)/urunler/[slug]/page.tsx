import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetailInfo } from "@/components/product/ProductDetailInfo";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductTransitionScroll } from "@/components/product/ProductTransitionScroll";
import { Reveal } from "@/components/animation/Reveal";
import { getImageUrl } from "@/lib/sanity/image";
import { getProductBySlug, getProducts } from "@/lib/sanity/fetch";
import { buildMetadata, productJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/urunler/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.title} | Kesu`,
    description: product.shortDescription,
    path: `/urunler/${product.slug}`,
    seo: product.seo,
    image: getImageUrl(product.thumbnail, 1200),
  });
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/urunler/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await getProducts();
  const related = all
    .filter(
      (p) =>
        p._id !== product._id &&
        p.category?.slug === product.category?.slug,
    )
    .slice(0, 3);

  const relatedFallback =
    related.length > 0
      ? related
      : all.filter((p) => p._id !== product._id).slice(0, 3);

  const jsonLd = productJsonLd({
    title: product.title,
    description: product.shortDescription,
    slug: product.slug,
    image: getImageUrl(product.thumbnail, 1200),
  });

  const gallery =
    product.images?.length > 0
      ? product.images
      : product.thumbnail
        ? [product.thumbnail]
        : [];

  return (
    <>
      <ProductTransitionScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pt-[calc(var(--header-height)+3rem)] pb-20 md:pb-28">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-6">
              <ProductGallery
                images={gallery}
                title={product.title}
                slug={product.slug}
                bottle={product.bottle}
                backdrop={product.backdrop}
              />
            </div>
            <div className="lg:col-span-6">
              <ProductDetailInfo product={product} />
            </div>
          </div>
        </Container>
      </section>

      {relatedFallback.length ? (
        <section className="pb-24 md:pb-32 border-t border-border pt-20">
          <Container>
            <Reveal>
              <p className="eyebrow mb-5">İlgili ürünler</p>
              <h2 className="heading-display mb-12">Birlikte düşünün.</h2>
            </Reveal>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {relatedFallback.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
