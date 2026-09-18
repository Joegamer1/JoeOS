# Codex master build prompt — the ridiculous version

You are continuing **JoeOS**, a flagship engineering project and personal website that convincingly behaves like a custom browser-native operating environment. This is not a landing page with fake windows and not a simple portfolio mockup. Build the ambitious version with durable architecture, real shared state, meaningful interactions, obsessive polish, and room for a long development cycle.

## Product thesis

The experience should create the same kind of technical wonder that a deeply built browser desktop creates, but it must have an original identity. Do not copy daedalOS, Windows, its layouts, assets, interaction details, or visual styling. JoeOS is a modern Linux workstation crossed with a restrained cybersecurity/SOC console: dark mineral surfaces, crisp technical typography, sparse phosphor green/cyan signals, fine grid and topology motifs, excellent information density, and quiet confidence. Avoid neon overload, hacker clichés, Matrix rain, generic glass cards, fake code wallpaper, excessive rounded rectangles, and gimmicks without system depth.

The site is Joe's public personal website: a place for blogging about life, interests, and experiences, and a professional introduction to his accomplishments, skills, and work. Personal writing and professional case studies are equally important. The desktop is the presentation layer for that content.

### Public website / private systems boundary

JoeOS must never connect to Joe's homelab, Home Assistant, home network, or private services. Do not add integrations, telemetry adapters, API proxies, remote controls, credentials, embedded private dashboards, or an owner-only administration mode. Those connections belong exclusively in Joe's separate private tools. This prohibition also applies to read-only connections and future architecture plans.

Homelab and home automation content consists of deliberately authored public case studies, curated screenshots, explanatory diagrams, lessons learned, and accomplishments. Interactive diagrams and simulations may use published content or clearly labeled fictional data; they must not query or control real infrastructure. Any desktop metrics must describe the visitor's local JoeOS session accurately or be labeled as illustrative demo data. Never present invented homelab status as live telemetry.

## Non-negotiable systems

Build these as real, typed, testable subsystems that share one domain model:

1. A window manager with multi-instance windows, focus and z-order, drag, resize, minimize, maximize, snapping, viewport constraints, keyboard movement, and persisted layouts.
2. A typed application registry and lifecycle/runtime with launch parameters, deep links, lazy loading, icons, singleton/multi-instance rules, process identity, and recovery from app errors.
3. A navigable virtual filesystem for portfolio content with normalized paths, file metadata, directories, mounts, and a storage adapter ready for IndexedDB.
4. A terminal command system with parser, history, autocomplete, filesystem-aware `ls`, `cd`, `pwd`, `cat`, `open`, plus `help`, `man`, `whoami`, `neofetch`, `ps`, `kill`, `clear`, aliases, and JoeOS-specific discovery commands. Commands must call shared services, not duplicate content.
5. A process manager tied to app and window lifecycles, with an inspectable process table and safe kill/restart behavior.
6. A launcher/global search that indexes apps, commands, files, projects, experience, writing, and settings; it must be fast and fully keyboard accessible.
7. A notification service with queueing, priorities, actions, history, and accessible announcements.
8. Multiple workspaces with overview mode, keyboard/touch switching, per-workspace windows, and session restore.
9. Versioned persistence with migrations for preferences, window layouts, workspaces, terminal history, dismissed notifications, and user-created local notes.
10. A first-class Homelab showcase: authored project histories, explanatory topology diagrams, architecture decisions, selected public code excerpts, lessons learned, accomplishments, and guided case-study tours. Interactivity explores published content only. No live status, private connections, monitoring, or control features.
11. A deliberate mobile reinterpretation centered on app switching, search, terminal access, and readable content—not a tiny draggable desktop.
12. A semantic, crawlable and accessible web layer: static content routes, skip paths, strong focus management, screen-reader labeling, reduced motion, contrast, touch targets, keyboard parity, metadata, sitemap, structured data, and graceful degradation.
13. A Journal/Blog app with personal and technical writing, individual article URLs, dates, tags, archives, RSS, and readable long-form layouts. Support a convenient direct reading experience alongside the desktop. Share content records across Journal, Files, Terminal, and Search. Keep draft publishing under Joe's control through the repository/build workflow.

## Engineering direction

- Keep Next.js + React + strict TypeScript and static export compatibility while GitHub Pages is the target.
- Separate content, kernel services, window management, application views, shell, and persistence. Follow `docs/ARCHITECTURE.md`, refining it when evidence justifies a change.
- Prefer reducers/state machines and explicit services for OS behavior. Avoid a god component or a tangle of component-local state.
- Add runtime schemas for authored content and persisted state. Include storage versioning and migrations from the beginning.
- Define performance budgets. Lazy-load apps, avoid expensive idle effects, minimize hydration, and keep interactions responsive on ordinary laptops and phones.
- Use deterministic tests for geometry, command parsing, paths, lifecycle, migrations, and reducers; integration tests for cross-app state; browser tests for keyboard, accessibility, session restore, and responsive behavior.
- Use real portfolio content when supplied. Until then, isolate clearly marked sample content in typed fixtures; never invent credentials, employers, achievements, or sensitive homelab facts.
- Preserve GitHub Pages exportability. Author blog posts and case studies as build-time content. Any future public backend must have a separately justified purpose; it must never bridge to Joe's private systems.
- Keep commits coherent and leave the project runnable and tested after each milestone.

## Build sequence

Work in vertical slices that prove the architecture:

1. Establish domain schemas, kernel event bus, typed app registry, process lifecycle, and a reducer-based window manager; migrate the initial terminal onto them.
2. Build real window interactions and accessibility, then persistence with versioned migrations and session recovery.
3. Implement filesystem and command parser; connect Terminal, Files, Search, and Projects to the same content records.
4. Add launcher, notifications, process monitor, workspaces, keyboard shortcut service, and command palette.
5. Build Journal and the Homelab showcase around authored public content, personal stories, and professional accomplishments. Do not create a future private-system or telemetry adapter.
6. Add static semantic content routes and the mobile shell, then complete accessibility, SEO, performance, tests, and observability.
7. Polish boot/session transitions, contextual menus, settings/themes, guided discovery, sound controls, and thoughtful easter eggs only after core systems are real.

For every slice: inspect existing code first, state the invariant being added, implement it end to end, add proportional tests, validate the production export, and update documentation. Do not flatten the ambition to finish faster. If scope is too large for one turn, complete a robust architectural slice and leave a precise next milestone.

## Definition of “wow”

The result is successful when a visitor first sees a distinctive, credible operating environment; then discovers the windows, files, terminal, search, processes, workspaces, and homelab are connected rather than staged; then leaves with a clear understanding of Joe's engineering judgment and work. Visual spectacle opens the door. Coherent systems earn the respect.

Begin by auditing the current repository against these requirements. Then implement the next missing vertical slice—starting with the kernel/app/window foundation—without replacing the product with a simplified mockup.

## Optional showcase: Marathon (1994)

Investigate an on-demand Marathon app as a later engineering milestone; see `docs/MARATHON.md`. This is a feasibility candidate, not an implemented feature or a dependency of the portfolio launch. Integrate with window/process lifecycle, isolate the runtime, keep saves on the visitor's device, and load game resources only after explicit launch. Verify runtime and game-data distribution terms independently before bundling anything.
