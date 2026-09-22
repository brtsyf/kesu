import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSiteSettings } from "@/lib/sanity/fetch";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header logoText={settings.logoText} navigation={settings.navigation} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
