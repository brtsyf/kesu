"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { premiumEase } from "@/lib/motion";
import { useScrollLock } from "@/lib/scroll-lock";
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
  const reduced = useReducedMotion();
  useScrollLock(mobileOpen || searchOpen);

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
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

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
        <div className="relative mx-auto flex h-[var(--header-height)] w-full max-w-[104rem] items-center justify-between px-4 lg:px-[clamp(1.75rem,6.2vw,6rem)]">
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

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-foreground/55 transition-colors hover:text-foreground lg:hidden lg:p-2"
              aria-label="Ara"
            >
              <Search className="size-6" strokeWidth={1.5} />
            </button>
            <SocialLinks links={socialLinks} variant="header" />
            <button
              type="button"
              className="p-1.5 text-foreground/70 transition-colors hover:text-foreground lg:hidden lg:p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              <span className="relative block size-6">
                <AnimatePresence initial={false} mode="wait">
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      className="absolute inset-0"
                      initial={reduced ? false : { opacity: 0, rotate: -45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 45 }}
                      transition={{ duration: 0.28, ease: premiumEase }}
                    >
                      <X className="size-6" strokeWidth={1.5} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      className="absolute inset-0"
                      initial={reduced ? false : { opacity: 0, rotate: 45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -45 }}
                      transition={{ duration: 0.28, ease: premiumEase }}
                    >
                      <Menu className="size-6" strokeWidth={1.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil menü"
            initial={
              reduced ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
            }
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0.01 : 0.55, ease: premiumEase }}
            className="fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 overflow-hidden lg:hidden"
          >
            <div className="relative flex h-full flex-col bg-[#f4f5f0]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_-10%,color-mix(in_srgb,var(--accent-soft)_42%,transparent),transparent_58%),radial-gradient(ellipse_60%_40%_at_100%_100%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_55%)]"
              />

              <nav
                className="container-hero relative flex min-h-0 flex-1 flex-col justify-between pb-10 pt-8"
                aria-label="Mobil menü"
              >
                <div>
                  <p className="eyebrow mb-7">Menü</p>
                  <ul>
                    {navigation.map((item, index) => {
                      const active = pathname === item.href;
                      return (
                        <motion.li
                          key={item.href}
                          initial={reduced ? false : { opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: reduced ? 0 : 0.12 + index * 0.06,
                            duration: 0.46,
                            ease: premiumEase,
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => {
                              if (pathname === item.href) setMobileOpen(false);
                            }}
                            className={cn(
                              "group flex items-center gap-4 border-b border-black/[0.06] py-4 transition-colors duration-500 ease-[var(--ease-premium)]",
                              active
                                ? "text-[#141414]"
                                : "text-[#141414]/55 hover:text-[#141414]",
                            )}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                "inline-block h-px shrink-0 bg-accent-deep transition-[width,opacity] duration-500 ease-[var(--ease-premium)]",
                                active
                                  ? "w-7 opacity-100"
                                  : "w-4 opacity-50 group-hover:w-7 group-hover:opacity-100",
                              )}
                            />
                            <span className="text-[2.05rem] font-medium leading-[1.05] tracking-[-0.035em]">
                              {item.label}
                            </span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                <motion.p
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: reduced ? 0 : 0.28,
                    duration: 0.4,
                    ease: premiumEase,
                  }}
                  className="pt-10 text-[0.72rem] tracking-[0.14em] uppercase text-muted"
                >
                  Profesyonel mezoterapi solüsyonları
                </motion.p>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
