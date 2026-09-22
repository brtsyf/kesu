import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "İletişim | Kesu",
  description: "Kesu iletişim bilgileri.",
  path: "/iletisim",
});

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const { address, whatsapp } = settings.contact;

  return (
    <section className="pt-[calc(var(--header-height)+4rem)] pb-24 md:pb-32">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-5">İletişim</p>
          <h1 className="heading-section text-balance mb-12 md:mb-16">
            Bize ulaşın.
          </h1>

          <div className="space-y-10">
            <div>
              <p className="eyebrow mb-3">Adres</p>
              <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                {address}
              </p>
            </div>

            {whatsapp ? (
              <div>
                <p className="eyebrow mb-3">WhatsApp</p>
                <a
                  href={whatsappHref(whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-lg tracking-tight link-underline"
                >
                  {whatsapp}
                </a>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
