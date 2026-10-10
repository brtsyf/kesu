"use client";

import { createContext, useContext, useMemo } from "react";
import { localizeHref, type Locale } from "@/lib/i18n/config";

type I18nContextValue = {
  locale: Locale;
  href: (path: string) => string;
  discover: (name: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  discoverTemplate,
  children,
}: {
  locale: Locale;
  discoverTemplate: string;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      href: (path: string) => localizeHref(locale, path),
      discover: (name: string) => discoverTemplate.replace("{name}", name),
    }),
    [discoverTemplate, locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return value;
}
