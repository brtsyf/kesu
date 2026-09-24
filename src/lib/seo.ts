import type { Metadata } from "next";
import type { SeoFields, SiteSettings } from "@/lib/sanity/types";
import { getImageUrl } from "@/lib/sanity/image";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Kesu";

export const SEO = {
  home: {
    title: "Kesu | Profesyonel Dermokozmetik Mezoterapi Solüsyonları",
    description:
      "Kesu mezoterapi solüsyonları: Six Lift, Anti-Aging, White Effect, Eyes, Hair, Acnera, BioCA, Genishine ve Salmon DNA. Kore güzellik yaklaşımından esinlenen profesyonel bakım.",
  },
  products: {
    title: "Ürünler",
    description:
      "Six Lift, Anti-Aging, White Effect, Eyes, Hair, Acnera, BioCA, Genishine ve Salmon DNA. Profesyonel estetik uygulamaları için Kesu mezoterapi koleksiyonu.",
  },
  about: {
    title: "Hakkımızda",
    description:
      "Kesu, profesyonel estetik için Six Lift, Anti-Aging, White Effect, Eyes, Hair, Acnera, BioCA, Genishine ve Salmon DNA sunan yenilikçi bir dermokozmetik markasıdır.",
  },
  certificates: {
    title: "Sertifikalarımız",
    description:
      "Kesu kalite, üretim ve klinik uygunluk sertifikaları. Profesyonel dermokozmetik belgelerini inceleyin.",
  },
  contact: {
    title: "İletişim",
    description:
      "Ürün bilgisi, hekim ve klinik iş birliği için Kesu ile iletişime geçin. İstanbul Zeytinburnu — WhatsApp ve e-posta.",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  seo,
  image,
  absolute = false,
}: {
  title: string;
  description: string;
  path?: string;
  seo?: SeoFields;
  image?: string;
  absolute?: boolean;
}): Metadata {
  const finalTitle = seo?.metaTitle ?? title;
  const finalDescription = seo?.metaDescription ?? description;
  const customImage =
    image || (seo?.ogImage ? getImageUrl(seo.ogImage, 1200) : undefined);
  const ogImage = customImage ?? "/brand/og-default.png";
  const url = absoluteUrl(path);
  const useAbsolute = absolute || Boolean(seo?.metaTitle);
  const shareTitle = useAbsolute ? finalTitle : `${finalTitle} | ${SITE_NAME}`;

  return {
    title: useAbsolute ? { absolute: finalTitle } : finalTitle,
    description: finalDescription,
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description: finalDescription,
      url,
      siteName: SITE_NAME,
      locale: "tr_TR",
      type: "website",
      images: [{ url: ogImage, alt: shareTitle, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: finalDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function productJsonLd(product: {
  title: string;
  description: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    sku: product.slug,
    brand: { "@type": "Brand", name: SITE_NAME },
    url: absoluteUrl(`/urunler/${product.slug}`),
  };
}

export function organizationJsonLd(settings: SiteSettings) {
  const sameAs = settings.socialLinks
    .map((link) => link.href)
    .filter((href) => {
      try {
        const url = new URL(href);
        return Boolean(url.pathname && url.pathname !== "/");
      } catch {
        return false;
      }
    });

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/kesu-logo.png"),
    description: settings.seo?.metaDescription ?? SEO.home.description,
    email: settings.contact.email,
    telephone: settings.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.contact.address.replace(/\n/g, ", "),
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: SEO.home.description,
    inLanguage: "tr-TR",
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}
