import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LeCoquette Luxury Spa",
    description:
      "Luxury nail, brow, and beauty spa in Gainesville. Refined rituals designed to feel intimate, polished, and elevated.",
    url: "https://lecoquetteluxspa.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gainesville",
      addressCountry: "US",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Spa Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nail Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brow Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Beauty Treatments" } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <HeroSection />
        <ServicesSection />
      </main>
    </>
  );
}
