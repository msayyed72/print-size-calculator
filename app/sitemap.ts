import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://fameorbit.app/" },
    { url: "https://fameorbit.app/print-size-calculator/" },
    { url: "https://fameorbit.app/dpi-calculator/" },
    { url: "https://fameorbit.app/pixels-to-inches/" },
    { url: "https://fameorbit.app/image-resolution-checker/" },
  ];
}
