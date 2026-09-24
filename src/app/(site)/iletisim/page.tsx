import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "İletişim | Kesu",
  description:
    "Ürün bilgisi ve profesyonel iş birliği için Kesu ile iletişime geçin.",
  path: "/iletisim",
});

const STILL_LIFE = [
  {
    src: "/images/products/six-lift.png",
    alt: "Kesu Six Lift ampul",
    className:
      "left-[8%] bottom-[2%] h-[90%] z-[2] md:left-[10%] md:h-[92%]",
  },
  {
    src: "/images/products/white-effect.png",
    alt: "Kesu White Effect ampul",
    className:
      "right-[20%] bottom-[10%] h-[56%] z-[3] md:right-[22%] md:h-[58%]",
  },
  {
    src: "/images/products/anti-aging.png",
    alt: "Kesu Anti-Aging ampul",
    className:
      "right-[5%] bottom-[12%] h-[40%] z-[1] md:right-[6%] md:h-[42%]",
  },
] as const;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const { address, whatsapp, email } = settings.contact;

  return (
    <section className="bg-[#fafaf7] pt-[calc(var(--header-height)+3.5rem)] pb-24 md:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <Reveal className="max-w-xl">
            <p className="mb-5 text-[0.95rem] text-[#7a776e]">İletişim</p>
            <h1 className="heading-section mb-7 text-balance md:mb-8">
              <span className="block">Güzelliğe aynı</span>
              <span className="block">yerden bakalım.</span>
            </h1>
            <p className="mb-9 max-w-md text-[0.98rem] leading-[1.75] text-[#7a776e]">
              Ürün bilgisi ve profesyonel iş birliği için buradayız. Kesu
              koleksiyonunu birlikte, yakından tanıyalım.
            </p>
            <a
              href="#iletisim"
              className="inline-flex items-center gap-2 border-b border-[#141414]/20 pb-0.5 text-[0.95rem] text-[#141414] transition-colors duration-500 ease-[var(--ease-premium)] hover:border-[#141414]/50"
            >
              Bize ulaşın
              <ArrowRight className="size-4" strokeWidth={1.6} />
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <div
              className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-[#eef1ec] sm:min-h-[26rem] md:min-h-[30rem] lg:min-h-[32rem]"
              aria-label="Kesu mezoterapi ampulleri"
            >
              {STILL_LIFE.map((vial) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={vial.src}
                  src={vial.src}
                  alt={vial.alt}
                  width={560}
                  height={1080}
                  className={`pointer-events-none absolute w-auto max-w-none object-contain object-bottom drop-shadow-[0_16px_28px_rgba(20,20,18,0.12)] ${vial.className}`}
                  decoding="async"
                />
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-14 pt-24 md:gap-16 md:pt-32 lg:grid-cols-2 lg:gap-24 lg:pt-40">
          <Reveal>
            <h2 className="heading-display mb-5 text-balance">Ürün bilgisi</h2>
            <p className="mb-8 max-w-md text-[0.98rem] leading-relaxed text-[#7a776e]">
              İlgilendiğiniz ürünü ve merak ettiğiniz konuyu paylaşın; bakımı ve
              koleksiyonu birlikte konuşalım.
            </p>
            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 border-b border-[#141414]/20 pb-0.5 text-[0.95rem] text-[#141414] transition-colors duration-500 ease-[var(--ease-premium)] hover:border-[#141414]/50"
            >
              Koleksiyonu inceleyin
              <ArrowRight className="size-4" strokeWidth={1.6} />
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="heading-display mb-5 text-balance">
              Konuşmayı başlatalım.
            </h2>
            <p className="mb-8 max-w-md text-[0.98rem] leading-relaxed text-[#7a776e]">
              Resmî sosyal hesaplarımız üzerinden bize ulaşabilirsiniz.
            </p>
            <SocialLinks links={settings.socialLinks} variant="page" />
          </Reveal>
        </div>

        <div
          id="iletisim"
          className="mt-24 scroll-mt-28 border-t border-[#141414]/[0.08] pt-16 md:mt-32 md:pt-20"
        >
          <Reveal>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="mb-3 text-[0.95rem] text-[#7a776e]">Adres</p>
                <p className="text-lg leading-relaxed whitespace-pre-line text-[#141414]/90">
                  {address}
                </p>
              </div>

              {whatsapp ? (
                <div>
                  <p className="mb-3 text-[0.95rem] text-[#7a776e]">WhatsApp</p>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-lg tracking-tight link-underline"
                  >
                    {whatsapp}
                  </a>
                </div>
              ) : null}

              {email ? (
                <div>
                  <p className="mb-3 text-[0.95rem] text-[#7a776e]">E-posta</p>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex text-lg tracking-tight link-underline"
                  >
                    {email}
                  </a>
                </div>
              ) : null}

              {settings.socialLinks.length ? (
                <div>
                  <p className="mb-3 text-[0.95rem] text-[#7a776e]">Sosyal</p>
                  <SocialLinks links={settings.socialLinks} variant="footer" />
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
