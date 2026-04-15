import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BrandLoader } from "@/components/layout/brand-loader";
import { LenisProvider } from "@/lib/motion/lenis";
import { siteConfig, toAbsoluteUrl, withBasePath } from "@/lib/site";

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
  title: siteConfig.metadataTitle,
  description: siteConfig.metadataDescription,
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: withBasePath("/assets/branding/logo-dark.png"),
    apple: withBasePath("/assets/branding/logo-dark.png"),
  },
  robots: siteConfig.isSiteUrlConfigured
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
  openGraph: {
    title: siteConfig.metadataTitle,
    description: siteConfig.metadataDescription,
    url: toAbsoluteUrl("/"),
    siteName: siteConfig.shortName,
    images: [
      {
        url: toAbsoluteUrl(siteConfig.ogImagePath),
        width: 1200,
        height: 630,
        alt: "LeCoquette luxury nail and beauty spa in Gainesville, Florida",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadataTitle,
    description: siteConfig.metadataDescription,
    images: [toAbsoluteUrl(siteConfig.ogImagePath)],
  },
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
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
