import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { CertificateGallery } from "@/components/sections/CertificateGallery";
import { CtaSection } from "@/components/sections/CtaSection";
import { certificatesPage } from "@/lib/data/seed";
import { getCertificates } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sertifikalarımız | Kesu",
  description:
    "Kesu kalite ve üretim sertifikaları. Belgeleri inceleyin.",
  path: "/sertifikalarimiz",
});

export default async function CertificatesPage() {
  const certificates = await getCertificates();
  const page = certificatesPage;
  const titleLines = page.title.split("\n");

  return (
    <div className="bg-[#fafaf7]">
      <section className="relative overflow-hidden bg-[#f4f3ef] pt-[calc(var(--header-height)+4rem)] pb-20 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_-10%,rgba(184,196,176,0.22)_0%,transparent_65%)]"
        />
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-7">{page.eyebrow}</p>
                <h1 className="heading-section text-[#141414]">
                  {titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="max-w-md text-[1.05rem] leading-[1.8] text-[#6b6860]">
                  {page.intro}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-10 pb-24 md:pt-16 md:pb-32">
        <Container>
          <CertificateGallery certificates={certificates} />
        </Container>
      </section>

      <CtaSection
        title="Birlikte değerlendirelim."
        description="Hekim ve profesyonel iş birliği hakkında bize ulaşın."
        label="Kesu ile iletişime geçin"
        href="/iletisim"
        secondaryLabel="Tüm koleksiyona dön"
        secondaryHref="/urunler"
      />
    </div>
  );
}
