import type { Locale } from "@/lib/i18n/config";

const STORED_TURKISH_ALT =
  /stüdyo|ampul|felsefe görseli|bakım detayı|doğal ışıltı/i;

export function assetAlt(
  alt: string | null | undefined,
  fallback: string,
  locale: Locale,
) {
  const stored = alt?.trim();
  if (!stored) return fallback;
  if (locale !== "tr" && STORED_TURKISH_ALT.test(stored)) return fallback;
  return stored;
}
