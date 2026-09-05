import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://fameorbit.app/" },
    { url: "https://fameorbit.app/print-size-calculator/" },
    { url: "https://fameorbit.app/dpi-calculator/" },
    { url: "https://fameorbit.app/pixels-to-inches/" },
    { url: "https://fameorbit.app/image-resolution-checker/" },
    { url: "https://fameorbit.app/word-counter/" },
    { url: "https://fameorbit.app/character-counter/" },
    { url: "https://fameorbit.app/json-formatter/" },
    { url: "https://fameorbit.app/uuid-generator/" },
  ];
}
