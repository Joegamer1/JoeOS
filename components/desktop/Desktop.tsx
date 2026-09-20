"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useReducer, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, Minus, Search, Square, X } from "lucide-react";
import { appRegistry } from "@/lib/os/app-registry";
import { initialWindows, windowReducer } from "@/lib/os/windows";
import type { AppId } from "@/lib/os/types";
import { ContentView } from "../apps/ContentView";
import { AppLauncher } from "./AppLauncher";
import { Terminal } from "./Terminal";

export function Desktop() {
  const [time, setTime] = useState("");
  const [windows, dispatch] = useReducer(windowReducer, initialWindows);
  const [searchOpen, setSearchOpen] = useState(false);
  const windowElements = useRef(new Map<string, HTMLElement>());
  const dockElements = useRef(new Map<string, HTMLButtonElement>());
  const searchTrigger = useRef<HTMLButtonElement>(null);
  const searchOrigin = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date()));
    const initial = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 60_000);
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchOrigin.current = document.activeElement as HTMLElement;
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); window.removeEventListener("keydown", shortcut); };
  }, []);

  function open(appId: AppId) {
    const app = appRegistry.find(item => item.id === appId)!;
    dispatch({ type: "open", appId, title: app.name });
    setSearchOpen(false);
    requestAnimationFrame(() => windowElements.current.get(appId)?.focus({ preventScroll: true }));
  }
  function dismissSearch() {
    setSearchOpen(false);
    requestAnimationFrame(() => (searchOrigin.current?.isConnected ? searchOrigin.current : searchTrigger.current)?.focus());
  }
  function hideWindow(id: string, type: "minimize" | "close") {
    dispatch({ type, id });
    requestAnimationFrame(() => dockElements.current.get(id)?.focus());
  }
  const active = Math.max(0, ...windows.filter(w => !w.minimized).map(w => w.zIndex));

  return <main className="desktop">
    <Link className="skip-link" href="/read/about/">Skip desktop and read about Joe</Link>
    <header className="topbar">
      <div className="desktop-brand"><span className="brand-symbol" aria-hidden="true">j.</span><strong>JoeOS</strong><span className="panel-divider" /><span className="panel-description">A personal workspace</span></div>
      <button ref={searchTrigger} className="panel-search" onClick={() => { searchOrigin.current = searchTrigger.current; setSearchOpen(true); }}><Search size={16} aria-hidden="true" /><span>Find an app</span><kbd>⌘ / Ctrl K</kbd></button>
      <time className="clock" suppressHydrationWarning>{time || "Welcome"}</time>
    </header>

    <aside className="desktop-places" aria-label="Desktop shortcuts"><p>On this desktop</p>{appRegistry.filter(a => a.id !== "terminal").map(app => <button key={app.id} onClick={() => open(app.id)}><app.icon size={25} strokeWidth={1.4} aria-hidden="true" /><span>{app.name}</span></button>)}<Link href="/read/about/"><BookOpen size={24} strokeWidth={1.4} aria-hidden="true" /><span>Reading mode</span></Link></aside>

    {!windows.some(w => !w.minimized) && <section className="empty-desktop"><h1>Make yourself at home.</h1><p>Open an app below, or read the site as ordinary pages.</p><button className="text-button" onClick={() => open("about")}>Open About <ArrowUpRight size={16} /></button><Link href="/read/about/">Reading mode</Link></section>}

    <div className="window-layer">{windows.map((w, index) => {
      const app = appRegistry.find(item => item.id === w.appId)!;
      return <section key={w.id} ref={element => { if (element) windowElements.current.set(w.id, element); else windowElements.current.delete(w.id); }} tabIndex={-1} hidden={w.minimized} className={`window ${w.maximized ? "window-max" : ""} ${w.zIndex === active ? "focused" : ""} ${w.appId === "terminal" ? "terminal-window" : ""}`} style={{ zIndex: w.zIndex, "--window-offset": `${index * 18}px` } as CSSProperties} onPointerDown={() => dispatch({ type: "focus", id: w.id })} onFocus={() => dispatch({ type: "focus", id: w.id })} aria-label={`${w.title} window`}>
        <header className="window-header"><div className="window-title"><app.icon size={17} aria-hidden="true" /><span>{w.title}</span><span className="window-subtitle">— JoeOS</span></div><div className="window-controls"><button onClick={() => hideWindow(w.id, "minimize")} aria-label={`Minimize ${w.title}`}><Minus size={17} /></button><button className="maximize-control" onClick={() => dispatch({ type: "maximize", id: w.id })} aria-label={`${w.maximized ? "Restore" : "Maximize"} ${w.title}`}><Square size={14} /></button><button onClick={() => hideWindow(w.id, "close")} aria-label={`Close ${w.title}`}><X size={18} /></button></div></header>
        {w.appId === "terminal" ? <Terminal open={open} windows={windows} /> : <div className="document-window"><nav className="window-sidebar" aria-label={`${w.title} navigation`}><p>Personal</p>{appRegistry.filter(a => a.id !== "terminal").map(a => <button key={a.id} aria-current={a.id === w.appId ? "page" : undefined} onClick={() => open(a.id)}><a.icon size={18} aria-hidden="true" />{a.name}</button>)}<div className="sidebar-bottom"><Link href={`/read/${w.appId}/`}><BookOpen size={17} aria-hidden="true" />Reading mode</Link><span>No desktop required.</span></div></nav><div className="document-scroll"><ContentView section={w.appId} onOpen={open} /><footer className="document-footer"><span>Joe&apos;s personal website</span><Link href={`/read/${w.appId}/`}>Open as a page <ArrowUpRight size={14} aria-hidden="true" /></Link></footer></div></div>}
      </section>;
    })}</div>

    {searchOpen && <AppLauncher onOpen={open} onDismiss={dismissSearch} />}
    <div className="desktop-bottom"><span className="desktop-note">A website, with room to explore.</span><nav className="dock" aria-label="Application launcher">{appRegistry.map(app => {
      const instance = windows.find(w => w.appId === app.id);
      const selected = instance && !instance.minimized && instance.zIndex === active;
      return <button ref={element => { if (element) dockElements.current.set(app.id, element); else dockElements.current.delete(app.id); }} key={app.id} className={selected ? "active" : ""} onClick={() => open(app.id)} aria-label={`Open ${app.name}`} aria-pressed={!!selected}><app.icon size={23} strokeWidth={1.5} aria-hidden="true" /><span>{app.name}</span>{instance && <i className="running-mark" aria-hidden="true" />}</button>;
    })}</nav><a className="source-link" href="https://github.com/Joegamer1/JoeOS">Built in the open <ArrowUpRight size={14} aria-hidden="true" /></a></div>
  </main>;
}
