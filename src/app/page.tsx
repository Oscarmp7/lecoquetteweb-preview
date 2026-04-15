import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { escapeJsonForHtml, siteConfig, toAbsoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.metadataTitle,
  description: siteConfig.metadataDescription,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": toAbsoluteUrl("/#business"),
    name: siteConfig.name,
    description: siteConfig.heroDescription,
    image: toAbsoluteUrl(siteConfig.ogImagePath),
    url: toAbsoluteUrl("/"),
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    areaServed: [
      {
        "@type": "City",
        name: `${siteConfig.city}, ${siteConfig.region}`,
      },
    ],
    sameAs: [siteConfig.instagramUrl],
    bookingPage: toAbsoluteUrl("/#contact"),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Luxury beauty services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Luxury manicures in Gainesville" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Luxury pedicures in Gainesville" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Brow and beauty services in Gainesville" },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonForHtml(jsonLd) }}
      />
      <main id="top">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
