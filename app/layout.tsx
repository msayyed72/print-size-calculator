import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = { title: "FameOrbit — Free Online Tools", description: "Fast, free online tools for images, productivity, developers, and everyday tasks.", metadataBase: new URL("https://fameorbit.app") };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6840238951184333"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
