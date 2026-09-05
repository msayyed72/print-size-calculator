import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Print Size Calculator — What Size Can I Print My Photo?",
  description: "Upload an image and instantly see its best print size, DPI, resolution, aspect ratio, and quality for common photo and paper sizes. Private and free.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
