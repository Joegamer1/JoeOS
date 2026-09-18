import type { AppId, WindowState } from "./types";
export type WindowAction = { type: "open"; appId: AppId; title: string } | { type: "focus" | "close" | "minimize" | "maximize"; id: string };
export const initialWindows: WindowState[] = [{ id: "terminal", appId: "terminal", title: "Terminal", zIndex: 1, minimized: false, maximized: false }];
export function windowReducer(state: WindowState[], action: WindowAction): WindowState[] {
  const front = Math.max(0, ...state.map(w => w.zIndex)) + 1;
  if (action.type === "open") {
    const existing = state.find(w => w.appId === action.appId);
    return existing ? state.map(w => w.id === existing.id ? { ...w, minimized: false, zIndex: front } : w) : [...state, { id: action.appId, appId: action.appId, title: action.title, zIndex: front, minimized: false, maximized: false }];
  }
  if (action.type === "close") return state.filter(w => w.id !== action.id);
  return state.map(w => w.id !== action.id ? w : action.type === "focus" ? { ...w, zIndex: front } : action.type === "minimize" ? { ...w, minimized: true } : { ...w, maximized: !w.maximized });
}
