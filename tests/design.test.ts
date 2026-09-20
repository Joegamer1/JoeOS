import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const tokens = Object.fromEntries([...css.matchAll(/--(color-[\w-]+):\s*(#[\da-f]{6});/gi)].map(m => [m[1], m[2]]));
function luminance(hex: string) {
  const rgb = hex.slice(1).match(/../g)!.map(n => parseInt(n, 16) / 255).map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
const pairs: [string, string, number][] = [
  ["text", "surface", 4.5], ["text-muted", "surface", 4.5],
  ["text-muted", "desktop", 4.5], ["accent", "surface", 4.5],
  ["highlight", "surface", 4.5], ["text", "selected", 4.5],
  ["text", "hover", 4.5], ["text-muted", "sidebar", 4.5],
  ["panel-muted", "panel", 4.5], ["terminal-text", "terminal", 4.5],
  ["terminal-accent", "terminal", 4.5], ["terminal-path", "terminal", 4.5],
  ["focus", "surface", 3], ["border", "surface", 3],
];
for (const [foreground, background, minimum] of pairs) {
  test(`theme contrast: ${foreground} on ${background} >= ${minimum}:1`, () => {
    const values = [foreground, background].map(key => { assert.ok(tokens[`color-${key}`]); return luminance(tokens[`color-${key}`]); });
    const ratio = (Math.max(...values) + .05) / (Math.min(...values) + .05);
    assert.ok(ratio >= minimum, `Measured ${ratio.toFixed(2)}:1`);
  });
}
