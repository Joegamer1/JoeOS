import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { siteUrl } from "@/lib/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "JoeOS — Joe's personal workspace",
  description: "Joe's projects and writing, presented as a Linux-style desktop in your browser.",
  keywords: ["JoeOS", "cybersecurity", "homelab", "systems engineering", "portfolio"],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#ded7ca", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
