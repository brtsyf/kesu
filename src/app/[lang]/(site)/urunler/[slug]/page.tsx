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
import { isLocale, localizeHref, type LocaleSlugRoute } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { detailCopy, localizeProduct, localizeProducts } from "@/lib/i18n/localize-product";
import { buildMetadata, productJsonLd } from "@/lib/seo";

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: LocaleSlugRoute) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const found = await getProductBySlug(slug);
  if (!found) return {};
  const product = localizeProduct(found, lang);
  return buildMetadata({
    title: `${product.category?.title ?? product.title} | Kesu`,
    description: product.shortDescription,
    path: `/urunler/${product.slug}`,
    seo: lang === "tr" ? product.seo : undefined,
    image: getImageUrl(product.thumbnail, 1200),
    absolute: true,
    locale: lang,
  });
}

export default async function ProductDetailPage({
  params,
}: LocaleSlugRoute) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const found = await getProductBySlug(slug);
  if (!found) notFound();
  const product = localizeProduct(found, lang);

  const all = localizeProducts(await getProducts(), lang);
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
    locale: lang,
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
    `${product.title} ${dict.product.studio}`,
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
              aria-label={dict.product.crumb}
              className="mb-10 flex flex-wrap items-center gap-2 text-[0.86rem] text-[#9a958c] md:mb-14"
            >
              <Link
                href={localizeHref(lang, "/")}
                className="transition-colors hover:text-[#141414]"
              >
                {dict.product.home}
              </Link>
              <span>/</span>
              <Link
                href={localizeHref(lang, "/urunler")}
                className="transition-colors hover:text-[#141414]"
              >
                {dict.product.collection}
              </Link>
              <span>/</span>
              <span className="text-[#6b6860]">
                {product.category?.title ?? product.title}
              </span>
            </nav>
          </Reveal>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <ProductDetailInfo
                product={product}
                copy={detailCopy(product)}
                collectionLabel={dict.product.professional}
              />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <ProductGallery
                images={gallery}
                title={product.title}
                slug={product.slug}
                bottle={product.bottle}
                backdrop={product.backdrop}
                imageLabel={dict.product.image}
                emptyLabel={dict.product.imageSoon}
              />
            </div>
          </div>
        </Container>
      </section>

      <ProductDetailStory
        product={product}
        stillLife={stillLife}
        labels={{
          usage: dict.product.usage,
          usageTitle: dict.product.usageTitle,
          ingredients: dict.product.ingredients,
          ingredientsTitle: dict.product.ingredientsTitle,
          studio: dict.product.studio,
        }}
      />

      {relatedFallback.length ? (
        <section className="kesu-related-products bg-[#fafaf7] pb-20 md:pb-28">
          <Container>
            <Reveal>
              <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:items-end">
                <h2 className="heading-section text-balance lg:col-span-7">
                  {dict.product.relatedTitle.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="max-w-md text-[0.98rem] leading-relaxed text-[#7a776e] lg:col-span-5 lg:justify-self-end">
                  {dict.product.relatedBody}
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
        title={dict.product.ctaTitle}
        description={dict.product.ctaBody}
        label={dict.product.ctaLabel}
        href={localizeHref(lang, "/iletisim")}
        secondaryLabel={dict.product.ctaSecondary}
        secondaryHref={localizeHref(lang, "/urunler")}
      />
    </div>
  );
}
