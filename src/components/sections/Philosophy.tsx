import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type PhilosophyProps = {
  eyebrow: string;
  title: string;
  body: string;
  image: SanityImage;
};

export function Philosophy({ eyebrow, title, body, image }: PhilosophyProps) {
  const src = getImageUrl(image, 1600);
  const lines = title.split("\n");

  return (
    <section className="py-24 md:py-32 bg-surface">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h2 className="heading-section text-balance mb-8">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-muted leading-relaxed max-w-md">{body}</p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="relative aspect-[4/5] md:aspect-[5/4] overflow-hidden bg-background">
              {src ? (
                <Image
                  src={src}
                  alt={getImageAlt(image, "Kesu felsefe görseli")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
