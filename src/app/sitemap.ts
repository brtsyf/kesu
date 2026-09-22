import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/sanity/fetch";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticRoutes = ["", "/urunler", "/hakkimizda", "/iletisim"].map(
    (path) => ({
      url: absoluteUrl(path || "/"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const productRoutes = products.map((p) => ({
    url: absoluteUrl(`/urunler/${p.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
