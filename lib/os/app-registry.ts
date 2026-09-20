import { BookOpen, FolderKanban, FlaskConical, TerminalSquare, UserRound } from "lucide-react";
import type { AppDefinition } from "./types";

export const appRegistry: AppDefinition[] = [
  { id: "about", name: "About", description: "A personal introduction", icon: UserRound },
  { id: "projects", name: "Projects", description: "Systems built and shipped", icon: FolderKanban },
  { id: "blog", name: "Journal", description: "Personal stories and technical writing", icon: BookOpen },
  { id: "homelab", name: "Homelab", description: "Public engineering case studies", icon: FlaskConical },
  { id: "terminal", name: "Terminal", description: "Explore with a command", icon: TerminalSquare, singleton: true },
];
