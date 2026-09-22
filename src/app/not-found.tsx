import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/sanity/fetch";

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header logoText={settings.logoText} navigation={settings.navigation} />
      <main className="flex-1">
        <section className="min-h-[70vh] flex items-center pt-[var(--header-height)]">
          <Container>
            <p className="eyebrow mb-5">404</p>
            <h1 className="heading-section text-balance mb-6 max-w-2xl">
              Sayfa bulunamadı.
            </h1>
            <p className="text-muted mb-10 max-w-md">
              Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/">Ana sayfa</Button>
              <Button href="/urunler" variant="secondary">
                Ürünler
              </Button>
            </div>
            <p className="sr-only">
              <Link href="/">Ana sayfaya dön</Link>
            </p>
          </Container>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
