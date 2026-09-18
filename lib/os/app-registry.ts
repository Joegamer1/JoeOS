import { BookOpen, FolderKanban, FlaskConical, TerminalSquare, UserRound } from "lucide-react";
import type { AppDefinition } from "./types";

export const appRegistry: AppDefinition[] = [
  { id: "terminal", name: "Terminal", description: "Command JoeOS directly", icon: TerminalSquare, singleton: true },
  { id: "homelab", name: "Homelab", description: "Public engineering case studies", icon: FlaskConical },
  { id: "projects", name: "Projects", description: "Systems built and shipped", icon: FolderKanban },
  { id: "about", name: "Identity", description: "About, experience, and contact", icon: UserRound },
  { id: "blog", name: "Journal", description: "Personal stories and technical writing", icon: BookOpen },
];
