import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizeProduct } from "@/lib/i18n/localize-product";
import { getProducts } from "@/lib/sanity/fetch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const requested = searchParams.get("lang");
  const locale: Locale = isLocale(requested) ? requested : "tr";
  if (!q) return NextResponse.json({ products: [] });

  const products = (await getProducts())
    .map((product) => localizeProduct(product, locale))
    .filter((product) => {
      const name = product.category?.title ?? product.title;
      return [
        name,
        product.title,
        product.shortDescription,
        product.tagline,
        product.description,
        product.intro,
        product.lead,
        product.eyebrow,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(q));
    })
    .slice(0, 8);

  return NextResponse.json({ products });
}
