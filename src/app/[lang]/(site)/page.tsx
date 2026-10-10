import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { NeedsSection } from "@/components/sections/NeedsSection";
import { TestimonialSection } from "@/components/sections/Testimonial";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Hero, type HeroProductSlide } from "@/components/sections/Hero";
import { notFound } from "next/navigation";
import { isLocale, localizeHref, type LocaleRoute } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizeProduct } from "@/lib/i18n/localize-product";
import { homePage } from "@/lib/data/seed";
import { resolveBottleImage } from "@/lib/product-media";
import { getProducts, getSiteSettings } from "@/lib/sanity/fetch";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: LocaleRoute) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return buildMetadata({
    title: dict.seo.homeTitle,
    description: dict.seo.homeDescription,
    path: "/",
    absolute: true,
    locale: lang,
  });
}

export default async function HomePage({ params }: LocaleRoute) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const products = (await getProducts()).map((product) =>
    localizeProduct(product, lang),
  );
  const settings = await getSiteSettings();
  const home = homePage;
  const heroSlides: HeroProductSlide[] = [...products]
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .flatMap((product) => {
      const image = resolveBottleImage(
        product.slug,
        product.title,
        product.thumbnail,
        product.bottle,
        product.images?.[0],
      );
      const src = getImageUrl(image, 900);
      if (!src.includes("cdn.sanity.io")) return [];
      return [
        {
          src,
          alt: getImageAlt(image, product.title),
          caption: product.category?.title ?? product.title,
          captionSub: product.tagline ?? "",
          href: localizeHref(lang, `/urunler/${product.slug}`),
        },
      ];
    });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...organizationJsonLd(settings),
            description: dict.seo.homeDescription,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...websiteJsonLd(),
            description: dict.seo.homeDescription,
            inLanguage: lang,
          }),
        }}
      />
      <Hero
        content={{
          ...home.hero,
          description: dict.hero.description,
          image: { ...home.hero.image, alt: dict.hero.portraitAlt },
          primaryCta: {
            label: dict.hero.cta,
            href: localizeHref(lang, "/urunler"),
          },
        }}
        slides={heroSlides}
      />
      <div className="relative z-10">
        <FeaturedProducts
          eyebrow=""
          title={dict.home.featuredTitle}
          description={dict.home.featuredDescription}
          products={products}
        />
        <NeedsSection
          title={dict.home.needsTitle}
          intro={dict.home.needsIntro}
          cards={dict.home.needs.map((card) => ({
            ...card,
            href: localizeHref(lang, card.href),
          }))}
        />
        <TestimonialSection
          testimonial={{
            quote: dict.home.testimonialQuote,
            name: dict.home.testimonialName,
            product: dict.home.testimonialRole,
          }}
        />
        <FaqSection items={dict.home.faqs} />
        <CtaSection
          title={dict.home.ctaTitle}
          description={dict.home.ctaBody}
          label={dict.home.ctaLabel}
          href={localizeHref(lang, "/iletisim")}
          secondaryLabel={dict.home.ctaSecondary}
          secondaryHref={localizeHref(lang, "/urunler")}
        />
      </div>
    </>
  );
}
