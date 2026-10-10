import Link from "next/link";
import { headers } from "next/headers";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { isLocale, localizeHref } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function NotFound() {
  const headerStore = await headers();
  const requested = headerStore.get("x-kesu-locale");
  const locale = isLocale(requested) ? requested : "tr";
  const copy = getDictionary(locale).notFound;

  return (
    <main className="flex-1">
      <section className="min-h-[70vh] flex items-center pt-[var(--header-height)]">
        <Container>
          <p className="eyebrow mb-5">404</p>
          <h1 className="heading-section text-balance mb-6 max-w-2xl">
            {copy.title}
          </h1>
          <p className="text-muted mb-10 max-w-md">{copy.body}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={localizeHref(locale, "/")}>{copy.home}</Button>
            <Button href={localizeHref(locale, "/urunler")} variant="secondary">
              {copy.products}
            </Button>
          </div>
          <p className="sr-only">
            <Link href={localizeHref(locale, "/")}>{copy.home}</Link>
          </p>
        </Container>
      </section>
    </main>
  );
}
