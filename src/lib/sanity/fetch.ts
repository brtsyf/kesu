import {
  aboutPage as seedAbout,
  blogPosts as seedBlog,
  categories as seedCategories,
  homePage as seedHome,
  products as seedProducts,
  siteSettings as seedSettings,
} from "@/lib/data/seed";
import type {
  AboutPageContent,
  BlogPost,
  Category,
  HomePageContent,
  Product,
  SiteSettings,
} from "./types";
import { sanityClient } from "./client";
import { hasSanityConfig } from "./env";
import {
  aboutPageQuery,
  blogPostBySlugQuery,
  blogPostsQuery,
  categoriesQuery,
  featuredProductsQuery,
  homePageQuery,
  productBySlugQuery,
  productsQuery,
  siteSettingsQuery,
} from "./queries";

async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!hasSanityConfig || !sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await fetchSanity<SiteSettings>(siteSettingsQuery);
  return data ?? seedSettings;
}

export async function getHomePage(): Promise<HomePageContent> {
  const data = await fetchSanity<HomePageContent>(homePageQuery);
  return data ?? seedHome;
}

export async function getAboutPage(): Promise<AboutPageContent> {
  const data = await fetchSanity<AboutPageContent>(aboutPageQuery);
  return data ?? seedAbout;
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchSanity<Product[]>(productsQuery);
  return data?.length ? data : seedProducts;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await fetchSanity<Product[]>(featuredProductsQuery);
  if (data?.length) return data;
  return seedProducts.filter((p) => p.featured).slice(0, 3);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await fetchSanity<Product>(productBySlugQuery, { slug });
  if (data) return data;
  return seedProducts.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchSanity<Category[]>(categoriesQuery);
  return data?.length ? data : seedCategories;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await fetchSanity<BlogPost[]>(blogPostsQuery);
  return data?.length ? data : seedBlog;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await fetchSanity<BlogPost>(blogPostBySlugQuery, { slug });
  if (data) return data;
  return seedBlog.find((p) => p.slug === slug) ?? null;
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
