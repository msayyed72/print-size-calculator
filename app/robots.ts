import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://msayyed72.github.io/print-size-calculator/sitemap.xml",
  };
}
