import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Philosophy } from "@/components/sections/Philosophy";
import { Benefits } from "@/components/sections/Benefits";
import { TestimonialSection } from "@/components/sections/Testimonial";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";
import {
  getFeaturedProducts,
  getHomePage,
  getSiteSettings,
} from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: settings.seo?.metaTitle ?? `${settings.siteName} — Premium Bakım`,
    description:
      settings.seo?.metaDescription ??
      "Minimal ve bilimsel cilt bakım ürünleri.",
    path: "/",
    seo: settings.seo,
  });
}

export default async function HomePage() {
  const [home, featured] = await Promise.all([
    getHomePage(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <Hero content={home.hero} />
      <FeaturedProducts
        eyebrow={home.featuredEyebrow}
        title={home.featuredTitle}
        description={home.featuredDescription}
        products={featured}
      />
      <Philosophy
        eyebrow={home.philosophyEyebrow}
        title={home.philosophyTitle}
        body={home.philosophyBody}
        image={home.philosophyImage}
      />
      <Benefits
        eyebrow={home.benefitsEyebrow}
        title={home.benefitsTitle}
        benefits={home.benefits}
        image={home.benefitImage}
      />
      <TestimonialSection testimonial={home.testimonial} />
      <FaqSection items={home.faqs} />
      <CtaSection
        title={home.ctaTitle}
        description={home.ctaDescription}
        label={home.ctaLabel}
        href={home.ctaHref}
      />
    </>
  );
}
