import { BookOpen, FolderKanban, FlaskConical, TerminalSquare, UserRound } from "lucide-react";
import type { AppDefinition } from "./types";

export const appRegistry: AppDefinition[] = [
  { id: "about", name: "About", description: "A personal introduction", icon: UserRound },
  { id: "projects", name: "Projects", description: "What I'm working on", icon: FolderKanban },
  { id: "blog", name: "Journal", description: "Personal stories and technical writing", icon: BookOpen },
  { id: "homelab", name: "Homelab", description: "Notes from my home servers", icon: FlaskConical },
  { id: "terminal", name: "Terminal", description: "Explore with a command", icon: TerminalSquare, singleton: true },
];
