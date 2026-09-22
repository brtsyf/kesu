import Link from "next/link";
import type { SiteSettings } from "@/lib/sanity/types";
import { Container } from "@/components/ui/Container";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div className="max-w-sm">
            <p className="text-[0.8125rem] tracking-[0.28em] font-medium mb-5">
              {settings.logoText}
            </p>
            <p className="text-muted text-[0.95rem] leading-relaxed">
              {settings.footerContent}
            </p>
          </div>

          <nav aria-label="Footer menü" className="flex flex-col gap-3">
            {settings.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.8rem] tracking-[0.12em] uppercase text-foreground/80 link-underline w-fit"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-[0.95rem] text-muted">
            <p>{settings.contact.address}</p>
            {settings.contact.whatsapp ? (
              <a
                href={`https://wa.me/${settings.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors w-fit"
              >
                WhatsApp · {settings.contact.whatsapp}
              </a>
            ) : null}
            <div className="flex gap-5 pt-3">
              {settings.socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.75rem] tracking-[0.14em] uppercase link-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-[0.75rem] tracking-[0.08em] uppercase text-muted">
          <p>© {new Date().getFullYear()} {settings.siteName}</p>
          <div className="flex gap-6">
            <Link href="/iletisim" className="hover:text-foreground transition-colors">
              Gizlilik
            </Link>
            <Link href="/iletisim" className="hover:text-foreground transition-colors">
              Koşullar
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
