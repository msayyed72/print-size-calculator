import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "FameOrbit — Free Online Tools", description: "Fast, free online tools for images, productivity, developers, and everyday tasks.", metadataBase: new URL("https://fameorbit.app") };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
