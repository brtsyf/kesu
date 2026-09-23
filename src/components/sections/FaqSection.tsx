import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import type { FaqItem } from "@/lib/sanity/types";

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section
      id="sss"
      className="scroll-mt-[var(--header-height)] bg-[#7d8f72] py-24 text-[#f4f3ef] md:py-32"
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-5 !text-[#f4f3ef]/70 before:bg-[#f4f3ef]/50">
              Kesu
            </p>
            <h2 className="heading-display text-balance text-[#f4f3ef]">
              Bizi daha iyi tanıyın.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.08}>
            <FaqAccordion items={items} tone="sage" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
