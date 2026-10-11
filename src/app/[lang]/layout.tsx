import { notFound } from "next/navigation";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { IntroScreen } from "@/components/sections/IntroScreen";
import { MotionProvider } from "@/components/animation/MotionProvider";
import { isLocale, locales, localizeHref, type LocaleRoute } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getSiteSettings } from "@/lib/sanity/fetch";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleRoute & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const settings = await getSiteSettings();
  const navigation = dict.nav.map((item) => ({
    ...item,
    href: localizeHref(lang, item.href),
  }));

  return (
    <I18nProvider locale={lang} discoverTemplate={dict.product.discover}>
      <MotionProvider>
        <IntroScreen
          brand={settings.logoText}
          line={dict.intro.line}
          subline={dict.intro.subline}
          continueLabel={dict.intro.continue}
          label={dict.intro.label}
        />
        <Header
          navigation={navigation}
          socialLinks={settings.socialLinks}
          labels={dict.header}
          searchLabels={dict.search}
        />
        <main className="flex-1">{children}</main>
        <Footer
          settings={settings}
          blurb={dict.footer.blurb}
          navigation={navigation}
          privacy={dict.footer.privacy}
          terms={dict.footer.terms}
          menuLabel={dict.footer.menu}
          privacyHref={localizeHref(lang, "/cerez-politikasi")}
          termsHref={localizeHref(lang, "/iletisim")}
          socialLabel={dict.header.social}
          logoHref={localizeHref(lang, "/")}
          logoLabel={dict.header.logoHome}
        />
        <CookieConsent
          label={dict.cookies.label}
          body={dict.cookies.body}
          accept={dict.cookies.accept}
          details={dict.cookies.details}
          detailsHref={localizeHref(lang, "/cerez-politikasi")}
        />
        <WhatsAppButton
          phone={settings.contact.whatsapp}
          label={dict.contact.whatsappCta}
        />
      </MotionProvider>
    </I18nProvider>
  );
}
