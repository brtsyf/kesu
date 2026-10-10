import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import type { NeedCardCopy } from "@/lib/i18n/types";

const TINTS: Record<string, string> = {
  hydration: "#f6eeed",
  firmness: "#eef1ec",
  tone: "#f5f2e8",
  balance: "#f3efe8",
  eyes: "#f1f0f5",
  hair: "#f3eee8",
};

export function NeedsSection({
  title,
  intro,
  cards,
}: {
  title: string;
  intro: string;
  cards: NeedCardCopy[];
}) {
  return (
    <section className="bg-[#fafaf7] pb-24 md:pb-32">
      <Container>
        <Reveal>
          <div className="mb-12 grid gap-8 md:mb-16 lg:grid-cols-12 lg:items-end">
            <h2 className="heading-section text-balance lg:col-span-7">
              {title.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="max-w-md text-[0.98rem] leading-relaxed text-[#7a776e] lg:col-span-5 lg:justify-self-end">
              {intro}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((need, index) => (
            <Reveal key={need.id} delay={index * 0.04}>
              <article
                className="flex h-full min-h-[13.5rem] flex-col justify-between rounded-[1.35rem] px-7 py-7 md:min-h-[15rem] md:px-8 md:py-8"
                style={{ backgroundColor: TINTS[need.id] ?? "#f4f2ee" }}
              >
                <div>
                  <h3 className="text-[1.2rem] font-medium tracking-[-0.03em] text-[#141414]">
                    {need.title}
                  </h3>
                  <p className="mt-2 max-w-[18rem] text-[0.9rem] leading-relaxed text-[#7a776e]">
                    {need.description}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href={need.href}
                    className="inline-flex items-center gap-1.5 text-[0.88rem] text-[#141414] transition-colors duration-400 hover:text-[#141414]/70"
                  >
                    <span className="border-b border-[#141414]/25 pb-px">
                      {need.label}
                    </span>
                    <ArrowUpRight className="size-3.5" strokeWidth={1.6} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
