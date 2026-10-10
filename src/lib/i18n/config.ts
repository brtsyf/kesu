export const locales = ["tr", "en", "ar", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const localeCookie = "kesu-locale";

export type LocaleRoute = { params: Promise<{ lang: string }> };

export type LocaleSlugRoute = {
  params: Promise<{ lang: string; slug: string }>;
};

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function htmlLang(locale: Locale): string {
  if (locale === "en") return "en";
  if (locale === "ar") return "ar";
  if (locale === "ru") return "ru";
  return "tr";
}

export function openGraphLocale(locale: Locale): string {
  if (locale === "en") return "en_US";
  if (locale === "ar") return "ar_AR";
  if (locale === "ru") return "ru_RU";
  return "tr_TR";
}

export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (!isLocale(parts[1])) return pathname || "/";
  const rest = parts.slice(2).join("/");
  return rest ? `/${rest}` : "/";
}

export function localizeHref(locale: Locale, path: string): string {
  if (
    !path ||
    path.startsWith("http") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const stripped = stripLocale(normalized);
  return stripped === "/" ? `/${locale}` : `/${locale}${stripped}`;
}

export function preferredLocale(acceptLanguage: string | null): Locale {
  const values = (acceptLanguage ?? "")
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const value of values) {
    const base = value.split("-")[0];
    if (base === "ar" || base === "en" || base === "ru" || base === "tr") return base;
  }
  return defaultLocale;
}
