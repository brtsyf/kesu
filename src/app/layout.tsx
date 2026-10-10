import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Manrope, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { htmlLang, isLocale } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fafaf7",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kesu",
    template: "%s | Kesu",
  },
  applicationName: "Kesu",
  authors: [{ name: "Kesu" }],
  creator: "Kesu",
  publisher: "Kesu",
  category: "dermocosmetics",
  keywords: [
    "Kesu",
    "mezoterapi",
    "dermokozmetik",
    "profesyonel estetik",
    "lifting",
    "anti-aging",
    "white effect",
  ],
  openGraph: {
    siteName: "Kesu",
    type: "website",
    images: [
      {
        url: "/brand/og-default.png",
        alt: "Kesu",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerStore = await headers();
  const requested = headerStore.get("x-kesu-locale");
  const locale = isLocale(requested) ? requested : "tr";

  return (
    <html
      lang={htmlLang(locale)}
      dir="ltr"
      className={`${manrope.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
