"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localizeHref, stripLocale, localeCookie } from "@/lib/i18n/config";
import { useI18n } from "@/components/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

const labels = { tr: "TR", en: "EN", ar: "ع", ru: "RU" } as const;

export function LanguageSwitcher({
  placement = "header",
  label,
}: {
  placement?: "header" | "menu";
  label: string;
}) {
  const { locale } = useI18n();
  const pathname = usePathname();
  const rest = stripLocale(pathname);
  const inMenu = placement === "menu";

  return (
    <nav
      aria-label={label}
      className={cn(
        "items-center",
        inMenu ? "mt-8 flex gap-6" : "hidden gap-1.5 lg:flex lg:me-2",
      )}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={localizeHref(code, rest)}
            hrefLang={code}
            lang={code}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              document.cookie = `${localeCookie}=${code};path=/;max-age=31536000;samesite=lax`;
            }}
            className={cn(
              "font-semibold tracking-[0.12em] transition-colors",
              inMenu ? "py-1 text-[1.15rem]" : "text-[0.72rem]",
              active ? "text-[#141414]" : "text-[#141414]/40 hover:text-[#141414]/75",
            )}
          >
            {labels[code]}
          </Link>
        );
      })}
    </nav>
  );
}
