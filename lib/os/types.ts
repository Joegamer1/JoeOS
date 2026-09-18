import type { LucideIcon } from "lucide-react";

export type AppId = "terminal" | "homelab" | "projects" | "about" | "blog";

export interface AppDefinition {
  id: AppId;
  name: string;
  description: string;
  icon: LucideIcon;
  singleton?: boolean;
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
}
