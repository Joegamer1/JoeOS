import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { siteUrl } from "@/lib/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "JoeOS — Systems, security, and the work behind them",
  description: "A browser-native personal operating environment for Joe's engineering, cybersecurity, and homelab work.",
  keywords: ["JoeOS", "cybersecurity", "homelab", "systems engineering", "portfolio"],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#07110f", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
