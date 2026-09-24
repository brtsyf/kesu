import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { aboutPage } from "@/lib/data/seed";
import { SEO, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: SEO.about.title,
  description: SEO.about.description,
  path: "/hakkimizda",
});

export default function AboutPage() {
  const page = aboutPage;
  const titleLines = page.title.split("\n");
  const [story, closing] = page.storyBlocks;

  return (
    <main>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f4f3ef] pt-[calc(var(--header-height)+4rem)] pb-28 md:pb-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_-10%,rgba(184,196,176,0.22)_0%,transparent_65%)]"
        />
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-7">{page.eyebrow}</p>
                <h1 className="heading-section text-[#141414]">
                  {titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="max-w-md text-[1.05rem] leading-[1.8] text-[#6b6860]">
                  {page.intro}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── STORY ───────────────────────────────────────────────── */}
      <section className="bg-[#fafaf7] py-28 md:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            {story && (
              <Reveal>
                <p className="text-[1.05rem] leading-[1.85] text-[#6b6860]">
                  {story.body}
                </p>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* ── MISYON ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#24382f] py-28 text-[#f4f3ef] md:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_28%_120%,rgba(125,143,114,0.28)_0%,transparent_65%)]"
        />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow mb-8 !text-[#f4f3ef]/50 before:bg-[#f4f3ef]/30">
                {page.philosophyTitle}
              </p>
              <blockquote className="heading-display text-pretty text-[#f4f3ef]">
                "{page.philosophyBody}"
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      {closing ? (
        <section className="bg-[#fafaf7] py-28 md:py-36">
          <Container>
            <Reveal>
              <p className="mx-auto max-w-3xl text-[1.05rem] leading-[1.85] text-[#6b6860]">
                {closing.body}
              </p>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="bg-[#fafaf7] py-28 md:py-36">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-7">
              <h2 className="heading-display max-w-xl text-[#141414]">
                Birlikte çalışalım.
              </h2>
              <p className="mt-5 max-w-md text-[1rem] leading-[1.8] text-[#6b6860]">
                Kliniğiniz için doğru ürünü bulmak, iş birliği kurmak veya
                koleksiyonu keşfetmek için bize ulaşın.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col gap-4 sm:flex-row lg:col-span-5 lg:justify-end">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#24382f] px-6 py-[0.85rem] text-[0.9rem] text-white transition-colors duration-500 ease-[var(--ease-premium)] hover:bg-[#1b2c24]"
              >
                İletişime geçin
                <ArrowUpRight className="size-4" strokeWidth={1.7} />
              </Link>
              <Link
                href="/urunler"
                className="inline-flex items-center gap-2.5 rounded-full border border-[#141414]/20 px-6 py-[0.85rem] text-[0.9rem] text-[#141414] transition-colors duration-500 ease-[var(--ease-premium)] hover:border-[#141414]/50"
              >
                Koleksiyona bak
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
