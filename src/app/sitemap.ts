import type { MetadataRoute } from "next";
import { locales, localizeHref } from "@/lib/i18n/config";
import { getProducts } from "@/lib/sanity/fetch";
import { absoluteUrl } from "@/lib/seo";

const paths = ["/", "/urunler", "/hakkimizda", "/sertifikalarimiz", "/iletisim"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const productPaths = products.map((product) => `/urunler/${product.slug}`);

  return [...paths, ...productPaths].flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizeHref(locale, path)),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [item, absoluteUrl(localizeHref(item, path))]),
        ),
      },
    })),
  );
}
