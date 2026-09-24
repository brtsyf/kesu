"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { NavItem, SocialLink } from "@/lib/sanity/types";
import { SearchOverlay } from "@/components/navigation/SearchOverlay";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";

type HeaderProps = {
  logoText: string;
  navigation: NavItem[];
  socialLinks?: SocialLink[];
};

export function Header({
  logoText,
  navigation,
  socialLinks = [],
}: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const solid = scrolled || mobileOpen || !isHome;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 isolate transition-[background-color,border-color] duration-500 ease-[var(--ease-premium)]",
          solid
            ? "border-b border-black/[0.06] bg-[#f6f6f4]/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-hero relative flex h-[var(--header-height)] items-center justify-between">
          <BrandLogo
            width={isHome ? 118 : 110}
            priority
            label={`${logoText} ana sayfa`}
            className="relative -mt-0.5 shrink-0"
          />

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-12 lg:flex"
            aria-label="Ana menü"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[1.125rem] font-semibold tracking-[-0.015em] text-shadow-none transition-colors duration-300",
                  pathname === item.href
                    ? "text-[#1a1a1a]"
                    : "text-[#1a1a1a]/70 hover:text-[#1a1a1a]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-foreground/55 transition-colors hover:text-foreground lg:hidden"
              aria-label="Ara"
            >
              <Search className="size-6" strokeWidth={1.5} />
            </button>
            <SocialLinks links={socialLinks} variant="header" />
            <button
              type="button"
              className="p-2 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              {mobileOpen ? (
                <X className="size-6" strokeWidth={1.5} />
              ) : (
                <Menu className="size-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden border-t border-border/50 bg-[#f6f6f4] transition-[max-height,opacity] duration-500 ease-[var(--ease-premium)] lg:hidden",
            mobileOpen
              ? "max-h-[80vh] opacity-100"
              : "max-h-0 opacity-0 border-transparent",
          )}
        >
          <nav
            className="container-hero flex flex-col gap-1 py-8"
            aria-label="Mobil menü"
          >
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
            <SocialLinks
              links={socialLinks}
              variant="header"
              className="mt-6"
            />
          </nav>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
