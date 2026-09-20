"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { appRegistry } from "@/lib/os/app-registry";
import type { AppId } from "@/lib/os/types";

export function AppLauncher({ onOpen, onDismiss }: { onOpen: (id: AppId) => void; onDismiss: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const results = appRegistry.filter(a => `${a.name} ${a.description}`.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => { const element = dialog.current!; element.showModal(); input.current?.focus(); return () => element.close(); }, []);
  return <dialog className="launcher" ref={dialog} aria-label="Find an app" onCancel={event => { event.preventDefault(); onDismiss(); }}><div className="launcher-heading"><Search size={20} aria-hidden="true" /><label htmlFor="app-search">Find an app</label><button onClick={onDismiss} aria-label="Close search"><X size={20} /></button></div><input ref={input} id="app-search" placeholder="About, projects, terminal…" value={query} onChange={e => { setQuery(e.target.value); setSelected(0); }} onKeyDown={event => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setSelected(i => results.length ? (i + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length : 0); }
    if (event.key === "Enter" && results[selected]) { event.preventDefault(); onOpen(results[selected].id); }
  }} aria-describedby="search-selection" /><div className="search-results">{results.map((app,index) => <button className={selected === index ? "selected" : ""} key={app.id} onFocus={() => setSelected(index)} onClick={() => onOpen(app.id)}><app.icon size={22} aria-hidden="true" /><span>{app.name}<small>{app.description}</small></span><span aria-hidden="true">↵</span></button>)}</div><p id="search-selection" className="search-hint" role="status">{results.length ? `${results[selected]?.name ?? results[0].name} selected. ↑ ↓ to choose, Enter to open.` : "No matching apps. Try another name."}</p></dialog>;
}
