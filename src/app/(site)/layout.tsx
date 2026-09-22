import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { IntroScreen } from "@/components/sections/IntroScreen";
import { getSiteSettings } from "@/lib/sanity/fetch";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <IntroScreen
        brand={settings.logoText}
        line={"Klinik sonuç.\nKesin formül."}
        subline="Profesyonel estetik için Kore teknolojisi."
      />
      <Header logoText={settings.logoText} navigation={settings.navigation} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
