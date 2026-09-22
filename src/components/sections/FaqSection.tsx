import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import type { FaqItem } from "@/lib/sanity/types";

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section id="sss" className="py-24 md:py-32 scroll-mt-[var(--header-height)]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-5">SSS</p>
            <h2 className="heading-display text-balance">
              Sıkça sorulan sorular.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.08}>
            <FaqAccordion items={items} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
