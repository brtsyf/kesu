import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { ar } from "@/lib/i18n/messages/ar";
import { en } from "@/lib/i18n/messages/en";
import { ru } from "@/lib/i18n/messages/ru";
import { tr } from "@/lib/i18n/messages/tr";

const dictionaries: Record<Locale, Dictionary> = { tr, en, ar, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
