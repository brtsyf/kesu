"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { KoreanBeautyHeadline } from "@/components/animation/KoreanBeautyHeadline";
import { Reveal } from "@/components/animation/Reveal";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import type { HeroContent } from "@/lib/sanity/types";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;
const wipeEase = [0.16, 1, 0.3, 1] as const;
const BOTTLE_FALLBACK = "/images/products/six-lift-bottle.png";
const PORTRAIT_FALLBACK = "/images/editorial/hero-portrait.jpg";

type VisualProps = {
  portraitSrc: string;
  portraitAlt: string;
  bottleSrc: string;
  bottleAlt: string;
  reduced: boolean | null;
  compactBottle?: boolean;
};

function OrbitRing({
  half,
  wide = false,
}: {
  half: "top" | "bottom";
  wide?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 80"
      className={cn(
        "pointer-events-none absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg]",
        wide ? "w-[242%]" : "w-[110%]",
        half === "top"
          ? "z-0 [clip-path:inset(0_0_49%_0)]"
          : "z-[2] [clip-path:inset(51%_0_0_0)]",
      )}
    >
      <ellipse
        cx="100"
        cy="40"
        rx="93"
        ry="30"
        fill="none"
        stroke="#c9c5bd"
        strokeWidth={half === "top" ? 0.7 : 0.75}
      />
    </svg>
  );
}

function HeroBottle({
  bottleSrc,
  bottleAlt,
  reduced,
  className,
  tight = false,
  compactBottle = false,
}: Pick<VisualProps, "bottleSrc" | "bottleAlt" | "reduced" | "compactBottle"> & {
  className: string;
  tight?: boolean;
}) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute z-[2]", className)}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -5, 0] }}
      transition={
        reduced
          ? { duration: 0.8, delay: 0.4, ease }
          : {
              opacity: { duration: 0.8, delay: 0.4, ease },
              y: { duration: 5.6, repeat: Infinity, ease: "easeInOut" },
            }
      }
    >
      <div className={cn("relative", tight && "origin-top scale-[1.72]")}>
        <OrbitRing half="top" wide={compactBottle} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bottleSrc}
          alt={bottleAlt}
          width={1024}
          height={1536}
          className="relative z-[1] h-auto w-full -rotate-[9deg] drop-shadow-[0_22px_36px_rgba(20,20,18,0.16)]"
          decoding="async"
        />
        <OrbitRing half="bottom" wide={compactBottle} />
      </div>
    </motion.div>
  );
}

/** Desktop: arch portrait with the bottle to its left. */
function HeroVisualDesktop(props: VisualProps) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-visible">
      <div className="absolute inset-0 overflow-hidden rounded-t-[999px] bg-[#ddd8cf]">
        <Image
          src={props.portraitSrc}
          alt={props.portraitAlt}
          fill
          priority
          quality={92}
          sizes="42vw"
          className="object-cover object-[50%_24%]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#f4f3ef]/55 to-transparent" />
      </div>
      <HeroBottle
        {...props}
        className={
          props.compactBottle
            ? "-left-[24%] bottom-[-6%] w-[40%]"
            : "-left-[48%] bottom-[-10%] w-[88%]"
        }
      />
    </div>
  );
}

function ProductCaption({
  href,
  caption,
  captionSub,
  className,
}: {
  href: string;
  caption: string;
  captionSub: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex w-fit items-start gap-3 text-[#6b6860] transition-colors hover:text-[#141414]",
        className,
      )}
    >
      <span className="mt-[0.85rem] w-8 shrink-0 border-t border-[#141414]/25" />
      <span className="text-right leading-snug">
        <span className="block text-[1.125rem] font-medium tracking-[-0.015em] text-[#141414]">
          {caption}
        </span>
        <span className="mt-0.5 block text-[0.95rem]">{captionSub}</span>
      </span>
    </Link>
  );
}

/** Mobile: full-screen editorial hero with portrait backdrop + gradient text overlay. */
function HeroMobileFull({
  visual,
  content,
  lines,
  caption,
  captionHref,
  reduced,
}: {
  visual: VisualProps;
  content: HeroContent;
  lines: string[];
  caption: string;
  captionHref: string;
  reduced: boolean | null;
}) {
  return (
    <div className="relative min-h-[calc(100svh-var(--header-height))] overflow-hidden">
      {/* ── Portrait full-screen background ── */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <Image
          src={visual.portraitSrc}
          alt={visual.portraitAlt}
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[54%_18%]"
        />
      </motion.div>

      {/* ── Subtle vignette from top ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[#0e1f16]/30 to-transparent" />

      {/* ── Dark gradient overlay at bottom ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#0e1f16]/93 via-[#0e1f16]/58 to-transparent" />

      {/* ── Text + CTA pinned to bottom ── */}
      <div className="relative z-10 flex min-h-[calc(100svh-var(--header-height))] flex-col justify-end px-6 pb-12 pt-8">
        {/* Headline — white text, same wipe animation */}
        <h1 className="heading-hero mb-4" lang="en">
          {lines.map((line, i) =>
            reduced ? (
              <span key={i} className="block text-white">
                {line}
              </span>
            ) : (
              <span key={i} className="block">
                <motion.span
                  className="block origin-left text-white"
                  initial={{
                    x: -20,
                    letterSpacing: "0.08em",
                    filter: "blur(8px)",
                    opacity: 1,
                  }}
                  animate={{
                    x: 0,
                    letterSpacing: "-0.042em",
                    filter: "blur(0px)",
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.08 + i * 0.16,
                    ease: wipeEase,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            )
          )}
        </h1>

        {/* Description */}
        <motion.p
          className="mb-8 max-w-[24rem] text-[0.9rem] leading-[1.78] text-white/60"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          {content.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-5"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease }}
        >
          <Link
            href={content.primaryCta.href}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#7d8f72] px-6 py-[0.82rem] text-[0.9rem] text-white transition-colors duration-500 ease-[var(--ease-premium)] hover:bg-[#6c7d62]"
          >
            {content.primaryCta.label}
            <ArrowRight className="size-4" strokeWidth={1.7} />
          </Link>
          <Link
            href={captionHref}
            className="text-[0.9rem] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {caption}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export function Hero({ content }: { content: HeroContent }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const blurPx = useTransform(scrollY, [0, 180, 520], [0, 4, 16]);
  const heroFilter = useMotionTemplate`blur(${blurPx}px)`;
  const lines = content.headline.split("\n");
  const caption = content.caption ?? "Lifting";
  const captionSub = content.captionSub ?? "Sıkılık, Elastikiyet, Canlılık";
  const captionHref = content.captionHref ?? "/urunler/kesu-six-lift";
  const bottleSrc = getImageUrl(content.bottle, 900) || BOTTLE_FALLBACK;
  const visual: VisualProps = {
    portraitSrc: getImageUrl(content.image, 1800) || PORTRAIT_FALLBACK,
    portraitAlt: getImageAlt(content.image, "Kesu — cilt bakımı"),
    bottleSrc,
    bottleAlt: getImageAlt(content.bottle, "Kesu Lifting ampul"),
    reduced,
    compactBottle: !bottleSrc.startsWith("/"),
  };

  return (
    <section className="relative z-0 lg:sticky lg:top-0">
      <motion.div
        className="relative overflow-x-clip bg-[#f4f3ef] pt-[var(--header-height)] will-change-[filter]"
        style={reduced ? undefined : { filter: heroFilter }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_42%,rgba(201,196,184,0.38)_0%,transparent_56%)]"
        />

        {/* ── MOBILE: full-bleed editorial hero (outside container) ── */}
        <div className="lg:hidden">
          <HeroMobileFull
            visual={visual}
            content={content}
            lines={lines}
            caption={caption}
            captionHref={captionHref}
            reduced={reduced}
          />
        </div>

        {/* ── DESKTOP: original grid layout ── */}
        <div className="container-hero relative hidden lg:block">
          <div className="grid items-start gap-8 pt-8 pb-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8 lg:min-h-[calc(100svh-var(--header-height))]">
            <div className="relative z-20 max-w-[42rem] pt-4">
              <h1 className="heading-hero mb-8" lang="en">
                <KoreanBeautyHeadline lines={lines} />
              </h1>

              <Reveal delay={0.12} y={22}>
                <p className="mb-9 max-w-[22rem] text-[0.98rem] leading-[1.75] text-[#6b6860]">
                  {content.description}
                </p>
              </Reveal>

              <Reveal delay={0.2} y={22}>
                <div className="flex flex-wrap items-center gap-5">
                  <Link
                    href={content.primaryCta.href}
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#7d8f72] px-6 py-[0.82rem] text-[0.9rem] text-white transition-colors duration-500 ease-[var(--ease-premium)] hover:bg-[#6c7d62]"
                  >
                    {content.primaryCta.label}
                    <ArrowRight className="size-4" strokeWidth={1.7} />
                  </Link>
                  <Link
                    href={captionHref}
                    className="text-[0.9rem] text-[#6b6860] underline-offset-4 transition-colors hover:text-[#141414] hover:underline"
                  >
                    {caption}
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="relative w-full overflow-visible pb-6 lg:ml-auto lg:max-w-[36.5rem] lg:self-center">
              <HeroVisualDesktop {...visual} />
              <ProductCaption
                href={captionHref}
                caption={caption}
                captionSub={captionSub}
                className="mt-5 ml-auto"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
