import type { MetadataRoute } from "next";
import { pages } from "@/lib/content/pages";
import { siteUrl } from "@/lib/content/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/` }, ...Object.keys(pages).map(id => ({ url: `${siteUrl}/read/${id}/` }))];
}
