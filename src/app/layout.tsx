import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BrandLoader } from "@/components/layout/brand-loader";
import { PageTransitionShell } from "@/components/layout/page-transition-shell";
import { LenisProvider } from "@/lib/motion/lenis";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Le Coquette Lux Spa",
  description:
    "Warm-premium beauty rituals and luxury spa appointments designed to feel refined, personal, and intentionally elevated.",
  metadataBase: new URL("https://lecoquetteluxspa.com")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <LenisProvider />
        <BrandLoader />
        <SiteHeader />
        <PageTransitionShell>
          <main>{children}</main>
        </PageTransitionShell>
        <SiteFooter />
      </body>
    </html>
  );
}
