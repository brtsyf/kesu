import type { Metadata } from "next";
import type { SeoFields } from "@/lib/sanity/types";
import { getImageUrl } from "@/lib/sanity/image";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  seo,
  image,
}: {
  title: string;
  description: string;
  path?: string;
  seo?: SeoFields;
  image?: string;
}): Metadata {
  const finalTitle = seo?.metaTitle ?? title;
  const finalDescription = seo?.metaDescription ?? description;
  const ogImage = image || (seo?.ogImage ? getImageUrl(seo.ogImage, 1200) : undefined);
  const url = absoluteUrl(path);

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical: url },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: "Kesu",
      locale: "tr_TR",
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
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
    brand: { "@type": "Brand", name: "Kesu" },
    url: absoluteUrl(`/urunler/${product.slug}`),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: article.author },
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
  };
}
