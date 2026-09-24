import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { NeedsSection } from "@/components/sections/NeedsSection";
import { TestimonialSection } from "@/components/sections/Testimonial";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { homePage } from "@/lib/data/seed";
import { resolveBottleImage } from "@/lib/product-media";
import { getProducts, getSiteSettings } from "@/lib/sanity/fetch";
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
  const sixLift = products.find((product) => product.slug === "kesu-six-lift");
  const heroBottle = sixLift
    ? resolveBottleImage(
        sixLift.slug,
        sixLift.title,
        sixLift.thumbnail,
        sixLift.bottle,
        sixLift.images?.[0],
      )
    : undefined;

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
      <Hero content={{ ...home.hero, bottle: heroBottle ?? home.hero.bottle }} />
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
