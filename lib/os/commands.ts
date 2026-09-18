import { directories, files, listDirectory, normalizePath } from "./filesystem";
import type { AppId, WindowState } from "./types";
export const commandHelp = ["help", "ls", "cd", "pwd", "cat", "open", "clear", "whoami", "neofetch", "ps"];
export interface CommandContext { cwd: string; setCwd: (path: string) => void; open: (id: AppId) => void; windows: WindowState[] }
export function executeCommand(input: string, context: CommandContext): string[] {
  const [command, ...args] = input.trim().split(/\s+/);
  const path = normalizePath(args[0] ?? context.cwd, context.cwd);
  switch (command) {
    case "help": return ["AVAILABLE COMMANDS", commandHelp.join("  "), "Apps: terminal, about, projects, homelab, blog", "Try: cat about.txt or open blog. Advanced parsing is planned."];
    case "pwd": return [context.cwd];
    case "ls": return directories.includes(path) ? listDirectory(path) : [`ls: directory not found: ${path}`];
    case "cd": { const destination = normalizePath(args[0] ?? "~", context.cwd); if (!directories.includes(destination)) return [`cd: directory not found: ${destination}`]; context.setCwd(destination); return []; }
    case "cat": return files[path] ? files[path].split("\n") : [`cat: file not found: ${path}`];
    case "open": if (["terminal", "about", "projects", "homelab", "blog"].includes(args[0])) { context.open(args[0] as AppId); return [`Opened ${args[0]}.`]; } return ["usage: open <terminal|about|projects|homelab|blog>"];
    case "ps": return ["APP          WINDOW STATE", ...context.windows.map(w => `${w.appId.padEnd(13)}${w.minimized ? "minimized" : "open"}`), "Window registry only; a full process manager is planned."];
    case "whoami": return ["Visitor to Joe's public personal website. This is a browser-local shell, not a remote login."];
    case "neofetch": return ["JoeOS 0.1.0-alpha", "Runtime: your browser", "Theme: Linux / SOC", "Private infrastructure connections: none"];
    case "clear": return [];
    case undefined: case "": return [];
    default: return [`joe-sh: command not found: ${command}`, "Try help."];
  }
}
