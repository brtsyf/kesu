import {
  categories as seedCategories,
  products as seedProducts,
  siteSettings as seedSettings,
} from "@/lib/data/seed";
import { applyProductCutout } from "@/lib/product-media";
import { socialLinksFromSettings } from "@/lib/social";
import type {
  Category,
  CertificateItem,
  Product,
  SiteSettings,
} from "./types";
import { sanityClient } from "./client";
import { hasSanityConfig } from "./env";
import {
  categoriesQuery,
  certificatesQuery,
  legacyCertificatesQuery,
  productBySlugQuery,
  productsQuery,
  socialMediaQuery,
} from "./queries";

async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!hasSanityConfig || !sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params, {
      cache: "force-cache",
      next: { tags: ["sanity"] },
    });
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const socialDoc = await fetchSanity<{
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    youtube?: string;
  }>(socialMediaQuery);
  const socialLinks = socialLinksFromSettings({ social: socialDoc ?? undefined });
  return {
    ...seedSettings,
    socialLinks: socialLinks.length ? socialLinks : seedSettings.socialLinks,
  };
}

export async function getCertificates(): Promise<CertificateItem[]> {
  const [docs, legacy] = await Promise.all([
    fetchSanity<CertificateItem[]>(certificatesQuery),
    fetchSanity<{ certificates?: CertificateItem[] }>(legacyCertificatesQuery),
  ]);
  const fromDocs = docs?.filter((item) => item.image) ?? [];
  if (fromDocs.length) return fromDocs;
  return legacy?.certificates?.filter((item) => item.image) ?? [];
}

function withSeedFields(product: Product): Product {
  const seed = seedProducts.find((item) => item.slug === product.slug);
  if (!seed) return product;
  return {
    ...seed,
    ...product,
    volume: product.volume ?? seed.volume,
    tagline: product.tagline ?? seed.tagline,
    cardTint: product.cardTint ?? seed.cardTint,
    ingredients: product.ingredients?.length ? product.ingredients : seed.ingredients,
    benefits: product.benefits?.length ? product.benefits : seed.benefits,
    usage: product.usage || seed.usage,
  };
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchSanity<Product[]>(productsQuery);
  return (data?.length ? data : seedProducts).map(withSeedFields).map(applyProductCutout);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await fetchSanity<Product>(productBySlugQuery, { slug });
  const product = data ?? seedProducts.find((p) => p.slug === slug) ?? null;
  return product ? applyProductCutout(withSeedFields(product)) : null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchSanity<Category[]>(categoriesQuery);
  return data?.length ? data : seedCategories;
}

export async function searchProducts(term: string): Promise<Product[]> {
  const products = await getProducts();
  const q = term.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category?.title.toLowerCase().includes(q),
  );
}
