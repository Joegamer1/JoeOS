import { Desktop } from "@/components/desktop/Desktop";
import { siteUrl } from "@/lib/content/site";
export const metadata = { alternates: { canonical: `${siteUrl}/` } };

export default function Home() { return <Desktop />; }
