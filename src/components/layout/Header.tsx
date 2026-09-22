"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/lib/sanity/types";
import { SearchOverlay } from "@/components/navigation/SearchOverlay";
import { BrandLogo } from "@/components/brand/BrandLogo";

type HeaderProps = {
  logoText: string;
  navigation: NavItem[];
};

export function Header({ logoText, navigation }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-700 ease-[var(--ease-premium)]",
          scrolled || mobileOpen
            ? "border-b border-border/80 bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-4">
          <BrandLogo
            width={108}
            priority
            label={`${logoText} ana sayfa`}
            className="relative -mt-0.5"
          />

          <nav
            className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
            aria-label="Ana menü"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.75rem] tracking-[0.14em] uppercase text-foreground/80 link-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-foreground/80 hover:text-foreground transition-colors"
              aria-label="Ara"
            >
              <Search className="size-[1.125rem]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              {mobileOpen ? (
                <X className="size-5" strokeWidth={1.5} />
              ) : (
                <Menu className="size-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden border-t border-border/60 bg-background transition-[max-height,opacity] duration-700 ease-[var(--ease-premium)]",
            mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 border-transparent",
          )}
        >
          <nav className="container-page flex flex-col gap-1 py-8" aria-label="Mobil menü">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-2xl tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
