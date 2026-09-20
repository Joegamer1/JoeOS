import Link from "next/link";
import { notFound } from "next/navigation";
import { pages, type ContentId } from "@/lib/content/pages";
import { siteUrl } from "@/lib/content/site";
import { ContentView } from "@/components/apps/ContentView";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(pages).map(section => ({ section })); }
async function content(params: Promise<{ section: string }>) {
  const { section } = await params;
  if (!Object.hasOwn(pages, section)) notFound();
  return pages[section as ContentId];
}
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const page = await content(params);
  return { title: `${page.title} — JoeOS`, description: page.summary, alternates: { canonical: `${siteUrl}/read/${(await params).section}/` } };
}
export default async function ReadingPage({ params }: { params: Promise<{ section: string }> }) {
  await content(params);
  const { section } = await params;
  return <main className="reading"><Link href="/">← JoeOS desktop</Link><nav aria-label="Reading sections">{Object.entries(pages).map(([id,p]) => <Link key={id} href={`/read/${id}/`} aria-current={section === id ? "page" : undefined}>{p.title}</Link>)}</nav><ContentView section={section as ContentId} /></main>;
}
