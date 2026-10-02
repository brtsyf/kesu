import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { NeedsSection } from "@/components/sections/NeedsSection";
import { TestimonialSection } from "@/components/sections/Testimonial";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Hero, type HeroProductSlide } from "@/components/sections/Hero";
import { homePage } from "@/lib/data/seed";
import { resolveBottleImage } from "@/lib/product-media";
import { getProducts, getSiteSettings } from "@/lib/sanity/fetch";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import {
  SEO,
  buildMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: settings.seo?.metaTitle ?? SEO.home.title,
    description: settings.seo?.metaDescription ?? SEO.home.description,
    path: "/",
    seo: settings.seo,
    absolute: true,
  });
}

export default async function HomePage() {
  const products = await getProducts();
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
          href: `/urunler/${product.slug}`,
        },
      ];
    });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(settings)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd()),
        }}
      />
      <Hero content={home.hero} slides={heroSlides} />
      <div className="relative z-10">
        <FeaturedProducts
          eyebrow={home.featuredEyebrow}
          title={home.featuredTitle}
          description={home.featuredDescription}
          products={products}
        />
        <NeedsSection />
        <TestimonialSection testimonial={home.testimonial} />
        <FaqSection items={home.faqs} />
        <CtaSection
          title="Birlikte değerlendirelim."
          description="Hekim ve profesyonel iş birliği hakkında bize ulaşın."
          label="Kesu ile iletişime geçin"
          href="/iletisim"
          secondaryLabel="Tüm koleksiyona dön"
          secondaryHref="/urunler"
        />
      </div>
    </>
  );
}
