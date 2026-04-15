import type { MetadataRoute } from "next";
import { siteConfig, toAbsoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: toAbsoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: siteConfig.isSiteUrlConfigured ? 1 : 0.2,
    },
  ];
}
