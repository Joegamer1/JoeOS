# JoeOS implementation brief

Continue work on **JoeOS**, my personal website built as a Linux-style desktop in the browser. Apps, windows, files, and terminal commands should share state and work together. Build and test the part I request, keeping the remaining roadmap available for later work.

## What I want to build

I want visitors to be able to use the desktop and read my work without learning the terminal first. Do not copy daedalOS or its Windows aesthetic, layouts, or assets. Familiar desktop conventions are welcome. Use readable content windows and familiar desktop controls. Keep terminal styling inside the Terminal app. The implemented Workbench Light theme uses an oatmeal desktop, paper-colored windows, dark text, and restrained clay/teal accents; use semantic tokens so the palette can evolve. Avoid neon overload, hacker clichés, Matrix rain, fake telemetry, generic glass cards, fake code wallpaper, and gimmicks without system depth.

Read `docs/DESIGN_SPEC.md` for the detailed visual and interaction contracts and `docs/CONSTRUCTION_PLAN.md` for scoped work packets and progress evidence. Those documents expand this brief. Do not implement the whole roadmap merely because it appears here. Follow the user's current task and distinguish current behavior from target requirements.

The site is Joe's public personal website: a place for blogging about life, interests, and experiences, and a professional introduction to his accomplishments, skills, and work. Personal writing and professional case studies are equally important. The desktop is the presentation layer for that content.

### Originality and anti-template direction

Do not produce the default AI-generated portfolio: oversized slogan hero, gradient-highlighted word, two CTA pills, glowing background blobs, bento cards, skill badges, arbitrary statistics, and a closing sales pitch. Do not merely recolor the current hacker dashboard. Remove neon green dominance, outlined display headlines, decorative grids, tiny uppercase console labels, and security-status clutter. The terminal may be technically rich without dictating the entire site's appearance.

Build a personal working environment with content-specific views: a short welcome note, a project index with meaningful metadata, a journal organized around titles and dates, and case studies with evidence and captions. Share window chrome and navigation, not one generic card layout across every app. Warmth must come from readable surfaces and Joe's approved writing, not manufactured quirkiness, invented memories, or decorative sticky notes.

Before substantial visual changes, state the visitor's task, the actual content available, and two or three compositional decisions that serve it. Afterward, check whether the result could pass for a startup landing page if the name were replaced. If yes, revise the composition, not just the accent color. Familiar controls are good; novelty must not make navigation obscure. Follow the detailed anti-template contract in `docs/DESIGN_SPEC.md` and report its originality checks in visual-task handoffs.

### Public website / private systems boundary

JoeOS must never connect to Joe's homelab, Home Assistant, home network, or private services. Do not add integrations, telemetry adapters, API proxies, remote controls, credentials, embedded private dashboards, or an owner-only administration mode. Those connections belong exclusively in Joe's separate private tools. This prohibition also applies to read-only connections and future architecture plans.

Homelab and home automation content consists of deliberately authored public case studies, curated screenshots, explanatory diagrams, lessons learned, and accomplishments. Interactive diagrams and simulations may use published content or clearly labeled fictional data; they must not query or control real infrastructure. Any desktop metrics must describe the visitor's local JoeOS session accurately or be labeled as illustrative demo data. Never present invented homelab status as live telemetry.

## Planned systems

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
10. A Homelab section with authored project histories, explanatory topology diagrams, architecture decisions, selected public code excerpts, lessons learned, accomplishments, and guided case-study tours. Interactivity explores published content only. No live status, private connections, monitoring, or control features.
11. A mobile layout with app switching, search, terminal access, and readable content.
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

For every slice: inspect existing code first, state the invariant being added, implement it end to end, add proportional tests, validate the production export, and update documentation. If the task is too large to finish at once, complete a tested part and document the next step.

## What to check

Check that visitors can find and read the content, that implemented controls work, and that shared content agrees across apps, files, and the terminal. Keep unfinished features labeled as planned.

Begin by auditing the current repository against the selected task and these requirements. If Joe asks for the next step without choosing a subsystem, inspect the latest construction record: the initial warm redesign implements A1/A2 and introductory A3 views. Address recorded gaps or proceed to B1 pure geometry before drag/resize. Keep the remaining system roadmap documented while finishing and testing the current task. Do not replace the product with a simplified mockup.

## Optional showcase: Marathon (1994)

Investigate an on-demand Marathon app as a later engineering milestone; see `docs/MARATHON.md`. This is a feasibility candidate, not an implemented feature or a dependency of the portfolio launch. Integrate with window/process lifecycle, isolate the runtime, keep saves on the visitor's device, and load game resources only after explicit launch. Verify runtime and game-data distribution terms independently before bundling anything.
