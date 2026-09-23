import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";

type CtaSectionProps = {
  title: string;
  description: string;
  label: string;
  href: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaSection({
  title,
  description,
  label,
  href,
  secondaryLabel = "Tüm koleksiyona dön",
  secondaryHref = "/urunler",
}: CtaSectionProps) {
  return (
    <section className="bg-[#fafaf7] py-28 md:py-40">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-display text-balance mb-5">{title}</h2>
            <p className="mx-auto mb-10 max-w-md text-[0.98rem] leading-relaxed text-[#7a776e]">
              {description}
            </p>
            <Link
              href={href}
              className="inline-flex items-center gap-2.5 rounded-full bg-dark px-6 py-[0.82rem] text-[0.9rem] text-background transition-colors duration-500 ease-[var(--ease-premium)] hover:bg-[#121814]"
            >
              {label}
              <ArrowUpRight className="size-4" strokeWidth={1.7} />
            </Link>
            {secondaryLabel && secondaryHref ? (
              <div className="mt-8">
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center gap-2 border-b border-[#141414]/20 pb-0.5 text-[0.9rem] text-[#6b6860] transition-colors duration-500 ease-[var(--ease-premium)] hover:border-[#141414]/50 hover:text-[#141414]"
                >
                  {secondaryLabel}
                  <ArrowRight className="size-4" strokeWidth={1.6} />
                </Link>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
