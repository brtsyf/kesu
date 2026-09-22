import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata = buildMetadata({
  title: "İletişim | Kesu",
  description: "Kesu ile iletişime geçin.",
  path: "/iletisim",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <section className="pt-[calc(var(--header-height)+4rem)] pb-24 md:pb-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">İletişim</p>
            <h1 className="heading-section text-balance mb-8">
              Merhaba deyin.
            </h1>
            <div className="space-y-4 text-muted">
              <p>
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {settings.contact.email}
                </a>
              </p>
              <p>{settings.contact.phone}</p>
              <p>{settings.contact.address}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
