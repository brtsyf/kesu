import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: "Kesu — Premium Bakım",
  description:
    "Modern bakım rutini için minimal, bilimsel ve premium cilt bakım ürünleri.",
  path: "/",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
