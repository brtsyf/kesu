import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import type { Testimonial } from "@/lib/sanity/types";

export function TestimonialSection({ testimonial }: { testimonial: Testimonial }) {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <Container>
        <Reveal>
          <figure className="max-w-4xl">
            <blockquote className="heading-display text-balance">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-10 text-sm tracking-[0.12em] uppercase text-muted">
              {testimonial.name}
              {testimonial.product ? (
                <span className="text-foreground/70"> — {testimonial.product}</span>
              ) : null}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
