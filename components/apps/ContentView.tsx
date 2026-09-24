import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { pages, type ContentId } from "@/lib/content/pages";
import type { AppId } from "@/lib/os/types";

export function ContentView({ section, onOpen }: { section: ContentId; onOpen?: (id: AppId) => void }) {
  const page = pages[section];
  const heading = section === "about" ? "Hello, I'm Joe." : page.title;
  return <article className={`content-view content-${section}`}>
    <div className="document-eyebrow">{section === "about" ? "About me" : section === "projects" ? "Things I'm building" : section === "blog" ? "Personal & technical writing" : "Engineering notes"}</div>
    <h1>{heading}</h1>
    {section === "about" ? <>
      <p className="intro-text">{page.paragraphs[0]}</p>
      <p>{page.paragraphs[1]}</p>
      <div className="explore-links"><p>Take a look around</p>{([['projects','The projects'],['blog','The journal']] as const).map(([id,label]) => onOpen ? <button key={id} onClick={() => onOpen(id)}>{label}<ArrowRight size={19} aria-hidden="true" /></button> : <Link key={id} href={`/read/${id}/`}>{label}<ArrowRight size={19} aria-hidden="true" /></Link>)}</div>
      <p className="quiet-note">{page.paragraphs[2]}</p>
    </> : section === "projects" ? <>
      <p className="page-summary">{page.summary}</p><section className="project-entry" aria-labelledby="joeos-project"><div className="project-heading"><h2 id="joeos-project">JoeOS</h2><span>In progress</span></div><p>{page.paragraphs[0]}</p><a href="https://github.com/Joegamer1/JoeOS">Code and build notes <ArrowUpRight size={16} aria-hidden="true" /></a></section><p className="quiet-note">{page.paragraphs[1]}</p>
    </> : section === "blog" ? <>
      <p className="intro-text">{page.paragraphs[0]}</p><section className="journal-empty" aria-label="Journal publication status"><span className="margin-label">The journal</span><div><h2>No entries just yet.</h2><p>{page.paragraphs[1]}</p></div></section>
    </> : <>
      <p className="intro-text">{page.paragraphs[0]}</p><div className="case-study-note"><h2>About this section</h2><p>{page.paragraphs[1]}</p></div><p className="quiet-note">{page.paragraphs[2]}</p>
    </>}
  </article>;
}
