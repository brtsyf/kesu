import type { Locale } from "@/lib/i18n/config";
import type { ProductDetailCopy } from "@/lib/i18n/types";
import type { Product, ProductLocaleCopy } from "@/lib/sanity/types";

function text(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function list(value?: string[] | null) {
  const items = value?.map((item) => item.trim()).filter(Boolean);
  return items?.length ? items : undefined;
}

function localizeIngredients(ingredients: string[] | undefined) {
  return ingredients?.map((item) => (item === "Somon DNA" ? "Salmon DNA" : item));
}

export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale === "tr") return product;

  const cms: ProductLocaleCopy | undefined = product.translations?.[locale];

  return {
    ...product,
    tagline: text(cms?.tagline) ?? product.tagline,
    shortDescription: text(cms?.shortDescription) ?? product.shortDescription,
    description: text(cms?.description) ?? product.description,
    benefits: list(cms?.benefits) ?? product.benefits,
    usage: text(cms?.usage) ?? product.usage,
    ingredients: list(cms?.ingredients) ?? localizeIngredients(product.ingredients) ?? [],
    eyebrow: text(cms?.eyebrow),
    lead: text(cms?.lead),
    intro: text(cms?.intro),
  };
}

export function localizeProducts(products: Product[], locale: Locale): Product[] {
  return products.map((product) => localizeProduct(product, locale));
}

export function detailCopy(product: Product): ProductDetailCopy {
  return {
    eyebrow:
      text(product.eyebrow) ??
      product.tagline ??
      product.category?.title ??
      "Kesu",
    lead: text(product.lead) ?? product.tagline ?? product.title,
    intro: text(product.intro) ?? product.shortDescription,
  };
}
