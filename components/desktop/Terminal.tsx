"use client";

import { FormEvent, useRef, useState } from "react";
import { executeCommand } from "@/lib/os/commands";
import type { AppId, WindowState } from "@/lib/os/types";

type Entry = { command?: string; output: string[] };

export function Terminal({ open, windows }: { open: (id: AppId) => void; windows: WindowState[] }) {
  const [cwd, setCwd] = useState("/home/joe");
  const [entries, setEntries] = useState<Entry[]>([{ output: ["JoeOS shell 0.1.0", "Type `help` to inspect available commands."] }]);
  const [input, setInput] = useState("");
  const field = useRef<HTMLInputElement>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    setEntries(command === "clear" ? [] : [...entries, { command, output: executeCommand(command, { cwd, setCwd, open, windows }) }]);
    setInput("");
  }

  return <section className="terminal" onClick={() => field.current?.focus()} aria-label="JoeOS terminal">
    <div className="terminal-scroll" aria-live="polite">
      {entries.map((entry, index) => <div className="terminal-entry" key={index}>
        {entry.command && <div><span className="prompt">joe@joeos</span><span className="path">:~$</span> {entry.command}</div>}
        {entry.output.map((line, lineIndex) => <div key={lineIndex}>{line}</div>)}
      </div>)}
      <form onSubmit={submit} className="terminal-form">
        <label htmlFor="terminal-command"><span className="prompt">visitor@joeos</span><span className="path">:{cwd}$</span></label>
        <input id="terminal-command" ref={field} autoComplete="off" autoFocus value={input} onChange={(e) => setInput(e.target.value)} aria-label="Terminal command" />
      </form>
    </div>
  </section>;
}
