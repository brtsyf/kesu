import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { NeedsSection } from "@/components/sections/NeedsSection";
import { TestimonialSection } from "@/components/sections/Testimonial";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { getHomePage, getProducts, getSiteSettings } from "@/lib/sanity/fetch";
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
  const [home, products] = await Promise.all([
    getHomePage(),
    getProducts(),
  ]);

  return (
    <>
      <Hero content={home.hero} />
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
