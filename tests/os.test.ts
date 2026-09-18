import { test } from "node:test";
import assert from "node:assert/strict";
import { windowReducer, initialWindows } from "../lib/os/windows";
import { normalizePath, files } from "../lib/os/filesystem";
import { executeCommand, type CommandContext } from "../lib/os/commands";

test("paths resolve dot segments and cannot escape the virtual root", () => {
  assert.equal(normalizePath("../../../.."), "/");
  assert.equal(normalizePath("~/about.txt"), "/home/joe/about.txt");
  assert.equal(normalizePath("./joe/../joe", "/home"), "/home/joe");
});
test("windows open once, restore, focus, maximize and close", () => {
  let state = windowReducer(initialWindows, { type: "open", appId: "about", title: "About" });
  state = windowReducer(state, { type: "minimize", id: "about" });
  assert.equal(state[1].minimized, true);
  state = windowReducer(state, { type: "open", appId: "about", title: "About" });
  assert.equal(state.length, 2); assert.equal(state[1].minimized, false);
  state = windowReducer(state, { type: "maximize", id: "about" });
  assert.equal(state[1].maximized, true);
  state = windowReducer(state, { type: "focus", id: "terminal" });
  assert.ok(state[0].zIndex > state[1].zIndex);
  assert.equal(windowReducer(state, { type: "close", id: "about" }).length, 1);
});
test("terminal navigates shared files and launches through callback", () => {
  let opened = "";
  const ctx: CommandContext = { cwd: "/home/joe", setCwd: path => { ctx.cwd = path; }, open: id => { opened = id; }, windows: initialWindows };
  assert.deepEqual(executeCommand("cat about.txt", ctx), files["/home/joe/about.txt"].split("\n"));
  executeCommand("open blog", ctx); assert.equal(opened, "blog");
  executeCommand("cd ..", ctx); assert.equal(ctx.cwd, "/home");
  assert.deepEqual(executeCommand("ls", ctx), ["joe/"]);
  executeCommand("cd /missing", ctx); assert.equal(ctx.cwd, "/home");
  assert.match(executeCommand("unknown", ctx)[0], /command not found/);
});
