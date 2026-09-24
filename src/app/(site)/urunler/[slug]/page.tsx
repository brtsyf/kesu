import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetailInfo } from "@/components/product/ProductDetailInfo";
import { ProductDetailStory } from "@/components/product/ProductDetailStory";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductTransitionScroll } from "@/components/product/ProductTransitionScroll";
import { CtaSection } from "@/components/sections/CtaSection";
import { Reveal } from "@/components/animation/Reveal";
import { getImageUrl } from "@/lib/sanity/image";
import { getProductBySlug, getProducts } from "@/lib/sanity/fetch";
import { getProductStillLife } from "@/lib/product-media";
import { buildMetadata, productJsonLd } from "@/lib/seo";

export const dynamicParams = true;

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
    absolute: true,
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
  const stillLife = getProductStillLife(
    product.slug,
    product.images,
    `${product.title} stüdyo`,
  );

  return (
    <div className="bg-[#fafaf7]">
      <ProductTransitionScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pt-[calc(var(--header-height)+2rem)] pb-16 md:pb-24">
        <Container>
          <Reveal y={12}>
            <nav
              aria-label="Sayfa konumu"
              className="mb-10 flex flex-wrap items-center gap-2 text-[0.86rem] text-[#9a958c] md:mb-14"
            >
              <Link
                href="/"
                className="transition-colors hover:text-[#141414]"
              >
                Ana sayfa
              </Link>
              <span>/</span>
              <Link
                href="/urunler"
                className="transition-colors hover:text-[#141414]"
              >
                Koleksiyon
              </Link>
              <span>/</span>
              <span className="text-[#6b6860]">
                {product.category?.title ?? product.title}
              </span>
            </nav>
          </Reveal>

          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
            <div className="lg:col-span-5">
              <ProductDetailInfo product={product} />
            </div>
            <div className="lg:col-span-7">
              <ProductGallery
                images={gallery}
                title={product.title}
                slug={product.slug}
                bottle={product.bottle}
                backdrop={product.backdrop}
              />
            </div>
          </div>
        </Container>
      </section>

      <ProductDetailStory product={product} stillLife={stillLife} />

      {relatedFallback.length ? (
        <section className="kesu-related-products bg-[#fafaf7] pb-20 md:pb-28">
          <Container>
            <Reveal>
              <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:items-end">
                <h2 className="heading-section text-balance lg:col-span-7">
                  <span className="block">Birlikte</span>
                  <span className="block">düşünün.</span>
                </h2>
                <p className="max-w-md text-[0.98rem] leading-relaxed text-[#7a776e] lg:col-span-5 lg:justify-self-end">
                  Aynı özenle formüle edilmiş diğer Kesu solüsyonları.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {relatedFallback.map((p, index) => (
                <Reveal key={p._id} delay={index * 0.05} className="h-full">
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaSection
        title="Birlikte değerlendirelim."
        description="Hekim ve profesyonel iş birliği hakkında bize ulaşın."
        label="Kesu ile iletişime geçin"
        href="/iletisim"
        secondaryLabel="Tüm koleksiyona dön"
        secondaryHref="/urunler"
      />
    </div>
  );
}
