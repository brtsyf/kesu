import Link from "next/link";
import type { SiteSettings } from "@/lib/sanity/types";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-auto border-t border-accent/15 bg-surface">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div className="max-w-sm">
            <BrandLogo width={128} className="mb-6" />
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
            <p className="whitespace-pre-line">{settings.contact.address}</p>
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
            <SocialLinks
              links={settings.socialLinks}
              variant="footer"
              className="pt-3"
            />
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
