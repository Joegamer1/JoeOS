import { pages } from "../content/pages";
export const files: Record<string, string> = {
  "/home/joe/README.md": "Welcome to JoeOS. A public personal website, not a connection to private infrastructure.",
  ...Object.fromEntries(Object.entries(pages).map(([id, page]) => [`/home/joe/${id}.txt`, [page.title, page.summary, ...page.paragraphs].join("\n\n")])),
};
export const directories = ["/", "/home", "/home/joe"];
export function normalizePath(path: string, cwd = "/home/joe") {
  const parts: string[] = [];
  const expanded = path === "~" ? "/home/joe" : path.replace(/^~\//, "/home/joe/");
  for (const part of (expanded.startsWith("/") ? expanded : `${cwd}/${expanded}`).split("/")) {
    if (part === "..") parts.pop(); else if (part && part !== ".") parts.push(part);
  }
  return `/${parts.join("/")}`;
}
export function listDirectory(path: string) {
  const prefix = path === "/" ? "/" : `${path}/`;
  return [...directories.filter(d => d !== path), ...Object.keys(files)].filter(p => p.startsWith(prefix) && !p.slice(prefix.length).includes("/")).map(p => p.slice(prefix.length) + (directories.includes(p) ? "/" : ""));
}
