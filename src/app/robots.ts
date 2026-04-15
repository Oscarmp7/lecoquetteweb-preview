import type { MetadataRoute } from "next";
import { siteConfig, toAbsoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.isSiteUrlConfigured) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: toAbsoluteUrl("/sitemap.xml"),
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: toAbsoluteUrl("/sitemap.xml"),
    host: new URL(siteConfig.siteUrl).host,
  };
}
