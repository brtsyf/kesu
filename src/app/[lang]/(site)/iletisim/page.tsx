import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { isLocale, localizeHref, type LocaleRoute } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: LocaleRoute) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return buildMetadata({
    title: dict.seo.contactTitle,
    description: dict.seo.contactDescription,
    path: "/iletisim",
    locale: lang,
  });
}

export default async function ContactPage({
  params,
}: LocaleRoute) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang).contact;
  const settings = await getSiteSettings();
  const { address, whatsapp, email } = settings.contact;

  return (
    <section className="bg-[#fafaf7] pt-[calc(var(--header-height)+3.5rem)] pb-24 md:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <Reveal className="max-w-xl">
            <p className="mb-5 text-[0.95rem] text-[#7a776e]">{copy.eyebrow}</p>
            <h1 className="heading-section mb-7 text-balance md:mb-8">
              {copy.title.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mb-9 max-w-md text-[0.98rem] leading-[1.75] text-[#7a776e]">
              {copy.intro}
            </p>
            <a
              href="#iletisim"
              className="inline-flex items-center gap-2 border-b border-[#141414]/20 pb-0.5 text-[0.95rem] text-[#141414] transition-colors duration-500 ease-[var(--ease-premium)] hover:border-[#141414]/50"
            >
              {copy.reach}
              <ArrowRight className="size-4" strokeWidth={1.6} />
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-[#eef1ec]">
              <Image
                src="/images/editorial/contact-collection.png"
                alt={copy.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>
        </div>

        <div className="grid gap-14 pt-24 md:gap-16 md:pt-32 lg:grid-cols-2 lg:gap-24 lg:pt-40">
          <Reveal>
            <h2 className="heading-display mb-5 text-balance">{copy.infoTitle}</h2>
            <p className="mb-8 max-w-md text-[0.98rem] leading-relaxed text-[#7a776e]">
              {copy.infoBody}
            </p>
            <Link
              href={localizeHref(lang, "/urunler")}
              className="inline-flex items-center gap-2 border-b border-[#141414]/20 pb-0.5 text-[0.95rem] text-[#141414] transition-colors duration-500 ease-[var(--ease-premium)] hover:border-[#141414]/50"
            >
              {copy.collectionLink}
              <ArrowRight className="size-4" strokeWidth={1.6} />
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="heading-display mb-5 text-balance">
              {copy.startTitle}
            </h2>
            <p className="mb-8 max-w-md text-[0.98rem] leading-relaxed text-[#7a776e]">
              {copy.startBody}
            </p>
            <SocialLinks
              links={settings.socialLinks}
              variant="page"
              label={copy.social}
            />
          </Reveal>
        </div>

        <div
          id="iletisim"
          className="mt-24 scroll-mt-28 border-t border-[#141414]/[0.08] pt-16 md:mt-32 md:pt-20"
        >
          <Reveal>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="mb-3 text-[0.95rem] text-[#7a776e]">{copy.address}</p>
                <p className="text-lg leading-relaxed whitespace-pre-line text-[#141414]/90">
                  {address}
                </p>
              </div>

              {whatsapp ? (
                <div>
                  <p className="mb-3 text-[0.95rem] text-[#7a776e]">{copy.whatsapp}</p>
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
                  <p className="mb-3 text-[0.95rem] text-[#7a776e]">{copy.email}</p>
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
                  <p className="mb-3 text-[0.95rem] text-[#7a776e]">{copy.social}</p>
                  <SocialLinks
                    links={settings.socialLinks}
                    variant="footer"
                    label={copy.social}
                  />
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
