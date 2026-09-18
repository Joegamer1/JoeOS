"use client";

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import { Activity, Minus, Search, ShieldCheck, Square, X } from "lucide-react";
import { appRegistry } from "@/lib/os/app-registry";
import { initialWindows, windowReducer } from "@/lib/os/windows";
import { pages } from "@/lib/content/pages";
import type { AppId } from "@/lib/os/types";
import { Terminal } from "./Terminal";

export function Desktop() {
  const [time, setTime] = useState("");
  const [windows, dispatch] = useReducer(windowReducer, initialWindows);
  const [search, setSearch] = useState<string | null>(null);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(new Date())), 1000);
    const shortcut = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearch(s => s === null ? "" : null); } if (e.key === "Escape") setSearch(null); };
    window.addEventListener("keydown", shortcut);
    return () => { window.clearInterval(timer); window.removeEventListener("keydown", shortcut); };
  }, []);
  function open(appId: AppId) { const app = appRegistry.find(a => a.id === appId)!; dispatch({ type: "open", appId, title: app.name }); setSearch(null); }
  const active = Math.max(0, ...windows.filter(w => !w.minimized).map(w => w.zIndex));
  return <main className="desktop">
    <Link className="skip-link" href="/read/about/">Skip desktop and read about Joe</Link>
    <div className="grid" aria-hidden="true" />
    <header className="topbar"><div className="brand"><ShieldCheck size={19} /><strong>JOE<span>OS</span></strong><i>PERSONAL WORKSPACE</i></div><div className="topbar-center">PUBLIC WEBSITE / LOCAL SESSION</div><span className="clock">{time || "JoeOS"}</span></header>
    <aside className="telemetry" aria-label="Browser session"><div className="eyebrow"><Activity size={13} /> LOCAL SESSION</div><div className="metric"><span>OPEN APPS</span><strong>{windows.length}</strong></div><div className="metric"><span>RELEASE</span><strong>0.1.0 ALPHA</strong></div><div className="network-map"><p>PUBLIC STORIES. PRIVATE SYSTEMS.</p><strong>NO INFRASTRUCTURE CONNECTIONS</strong><span>Case studies, not remote controls.</span></div></aside>
    <section className="welcome"><p className="kicker">A WORKSPACE FOR A LIFE IN PROGRESS</p><h1>Systems worth<br /><em>exploring.</em></h1><p>I'm Joe. Welcome to my corner of the web: personal stories, engineering experiments, and the work behind them.</p><div className="quick-command"><button onClick={() => setSearch("")}>Launch an app <kbd>⌘ / Ctrl K</kbd></button><Link href="/read/about/">Reading mode →</Link></div></section>
    <div className="window-layer">{windows.map((w, index) => <section key={w.id} hidden={w.minimized} className={`window ${w.maximized ? "window-max" : ""} ${w.zIndex === active ? "focused" : ""}`} style={{ zIndex: w.zIndex, ...(!w.maximized ? { top: `${40 + index * 3}%`, left: `${30 + index * 2}%` } : {}) }} onPointerDown={() => dispatch({ type: "focus", id: w.id })} onFocus={() => dispatch({ type: "focus", id: w.id })} aria-label={`${w.title} window`}>
      <div className="window-header"><div className="window-title"><span>{String(index + 1).padStart(2,"0")}</span>{w.title}<small>browser-local</small></div><div className="window-controls"><button onClick={() => dispatch({ type: "minimize", id: w.id })} aria-label={`Minimize ${w.title}`}><Minus size={14} /></button><button onClick={() => dispatch({ type: "maximize", id: w.id })} aria-label={`${w.maximized ? "Restore" : "Maximize"} ${w.title}`}><Square size={12} /></button><button onClick={() => dispatch({ type: "close", id: w.id })} aria-label={`Close ${w.title}`}><X size={15} /></button></div></div>
      {w.appId === "terminal" ? <Terminal open={open} windows={windows} /> : <article className="app-content"><p className="kicker">{pages[w.appId].summary}</p><h2>{pages[w.appId].title}</h2>{pages[w.appId].paragraphs.map(p => <p key={p}>{p}</p>)}<Link href={`/read/${w.appId}/`}>Read as a page →</Link></article>}
    </section>)}</div>
    {search !== null && <section className="launcher" aria-label="App search"><div className="launcher-heading"><label htmlFor="app-search">Launch an application</label><button onClick={() => setSearch(null)} aria-label="Close search">×</button></div><input id="app-search" autoFocus placeholder="Search apps…" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { const app = appRegistry.find(a => `${a.name} ${a.description}`.toLowerCase().includes(search.toLowerCase())); if (app) open(app.id); } }} />{appRegistry.filter(a => `${a.name} ${a.description}`.toLowerCase().includes(search.toLowerCase())).map(a => <button key={a.id} onClick={() => open(a.id)}><a.icon size={18} />{a.name}<small>{a.description}</small></button>)}</section>}
    <nav className="dock" aria-label="Application launcher"><button aria-label="Open search" onClick={() => setSearch("")}><Search size={20} /></button>{appRegistry.map(app => <button key={app.id} className={windows.some(w => w.appId === app.id) ? "active" : ""} onClick={() => open(app.id)} aria-label={`Open ${app.name}`} title={app.description}><app.icon size={21} /><span>{app.name}</span></button>)}</nav>
    <footer className="footer-status"><span><i /> BROWSER-LOCAL EXPERIENCE</span><span>BUILD 0.1.0-ALPHA</span><a href="https://github.com/Joegamer1/JoeOS">SOURCE & ROADMAP ↗</a></footer>
  </main>;
}
