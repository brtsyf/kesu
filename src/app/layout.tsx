import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SEO, siteUrl } from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fafaf7",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SEO.home.title,
    template: "%s | Kesu",
  },
  description: SEO.home.description,
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
    "whitening",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: SEO.home.title,
    description: SEO.home.description,
    url: "/",
    siteName: "Kesu",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/brand/og-default.png",
        alt: SEO.home.title,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.home.title,
    description: SEO.home.description,
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
