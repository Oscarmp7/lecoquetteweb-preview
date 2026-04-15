const DEFAULT_SITE_URL = "https://www.example.com";

const normalizedEnvSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
const normalizedBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/+$/, "") ?? "";

export const siteConfig = {
  name: "LeCoquette Luxury Spa",
  shortName: "LeCoquette",
  siteUrl: normalizedEnvSiteUrl || DEFAULT_SITE_URL,
  isSiteUrlConfigured: Boolean(normalizedEnvSiteUrl),
  basePath: normalizedBasePath,
  phoneDisplay: "(786) 599-8161",
  phoneHref: "+17865998161",
  email: "contact@lecoquetteluxspa.com",
  instagramHandle: "@lecoquette_spa",
  instagramUrl: "https://instagram.com/lecoquette_spa",
  city: "Gainesville",
  region: "Florida",
  country: "US",
  bookingLabel: "Book Now",
  heroTitle: "Luxury Nail & Beauty Spa in Gainesville, Florida",
  heroDescription:
    "Luxury manicures, pedicures, brow services, and beauty rituals in Gainesville, Florida. A softer kind of luxury, by appointment.",
  metadataTitle: "Luxury Nail & Beauty Spa in Gainesville, FL | LeCoquette",
  metadataDescription:
    "Luxury manicures, pedicures, brow services, and beauty rituals in Gainesville, Florida. Reserve your LeCoquette appointment online.",
  ogImagePath: "/assets/branding/Background2.png",
} as const;

export function withBasePath(path: string): string {
  return `${siteConfig.basePath}${path}`;
}

export function toAbsoluteUrl(path = "/"): string {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return new URL(withBasePath(safePath), siteConfig.siteUrl).toString();
}

export function escapeJsonForHtml(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
