import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://printsizecalculator.com";
  return ["", "/dpi-calculator", "/pixels-to-inches", "/pixels-to-cm", "/image-resolution-checker", "/photo-print-size", "/a4-pixel-size", "/a3-pixel-size", "/poster-resolution-calculator", "/300-dpi-calculator"].map((path) => ({ url: base + path, lastModified: new Date() }));
}
