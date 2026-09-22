import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";

type CtaSectionProps = {
  title: string;
  description: string;
  label: string;
  href: string;
};

export function CtaSection({ title, description, label, href }: CtaSectionProps) {
  const lines = title.split("\n");

  return (
    <section className="py-24 md:py-32 bg-dark text-background">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="heading-section text-balance mb-6">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-dark-muted text-lg mb-10 max-w-md">{description}</p>
            <Button href={href} variant="dark">
              {label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
