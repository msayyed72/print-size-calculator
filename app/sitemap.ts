import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: "https://fameorbit.app/" }, { url: "https://fameorbit.app/print-size-calculator/" }]; }
