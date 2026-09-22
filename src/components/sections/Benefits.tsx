import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type BenefitsProps = {
  eyebrow: string;
  title: string;
  benefits: { title: string; description: string }[];
  image: SanityImage;
};

export function Benefits({ eyebrow, title, benefits, image }: BenefitsProps) {
  const src = getImageUrl(image, 1400);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[3/4] overflow-hidden bg-surface">
              {src ? (
                <Image
                  src={src}
                  alt={getImageAlt(image, "Bakım detayı")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : null}
            </div>
          </Reveal>

          <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-8">
            <Reveal>
              <p className="eyebrow mb-5">{eyebrow}</p>
              <h2 className="heading-section text-balance mb-12 md:mb-16">
                {title}
              </h2>
            </Reveal>
            <div className="space-y-10">
              {benefits.map((item, i) => (
                <Reveal key={item.title} delay={0.05 * i}>
                  <div className="border-t border-border pt-8">
                    <h3 className="text-xl md:text-2xl tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted max-w-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
