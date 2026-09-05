import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://printsizecalculator.com", lastModified: new Date() }];
}
