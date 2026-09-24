# JoeOS design and implementation specification

Version: 1.2 · Initial warm redesign implemented September 20, 2026

Status: target specification, not a declaration that every feature exists. This document does not change the deployed UI by itself.

## 1. How to use this document

This is the durable product brief for Joe and future implementation agents. It makes decisions explicit so a smaller model can complete bounded work without inventing the product direction.

Read this alongside `ARCHITECTURE.md`, `../SECURITY.md`, and `../CODEX_BUILD_PROMPT.md`. For visual and interaction direction, this specification supersedes older descriptions of JoeOS as a dense SOC console. Security restrictions remain mandatory. The user's current explicit request defines the scope of each task; this roadmap does not authorize implementing or publishing everything at once.

Terms used here:

- **Must:** a requirement; do not silently weaken it.
- **Default:** implement this unless Joe requests otherwise or a demonstrated constraint requires a documented alternative.
- **Later:** preserve an extension point, but do not implement it in an unrelated task.
- **Proposed:** a concrete starting point Joe may refine. Do not describe it as an already approved or shipped feature.

When a task is ambiguous, follow the defaults. Ask when a choice changes privacy, publication, hosting, licensing, authored facts, or the product's core behavior. Do not ask Joe to choose every pixel.

## 2. Product identity

**JoeOS is my personal website, presented as a Linux-style desktop.**

I want space for my writing and interests as well as my projects and work. Both should be easy to find.

Windows, apps, the terminal, files, search, and processes should use shared state. The reference to daedalOS is about depth and discovery, not its Windows aesthetic, assets, or implementation.

Use the shell, man pages, keyboard shortcuts, and optional Easter eggs for the desktop details. Do not imply that visitors are accessing a secure or classified system.

### Priority order when requirements compete

1. Privacy and truthful representation.
2. Access to content, readability, and accessibility.
3. Coherent and reliable OS behavior.
4. Personality and visual polish.
5. Optional effects and Easter eggs.

Do not sacrifice items higher in this list to achieve items lower in it. Add complexity only when it supports an implemented feature.

### Design decisions already made

- Linux-inspired, not Windows-inspired; familiar desktop conventions are welcome.
- Warm and personal, not a generic cybersecurity dashboard.
- No commitment to phosphor green as the global brand color.
- Semantic theme tokens from the beginning; components must not depend on one palette.
- Browser-native website, not a remote computer or private control panel.
- Next.js, React, TypeScript, and static export remain the project foundation.
- Public content is authored intentionally. Private infrastructure is never connected, even read-only or during builds.

### What a successful visit looks like

| Visitor | First useful action | Successful outcome |
| --- | --- | --- |
| Professional visitor | Open About or Projects without typing a command | Understand Joe's interests, contribution, and evidence of work |
| Returning reader | Open a direct article link | Read immediately, without a boot ceremony or desktop puzzle |
| Curious technical visitor | Open Terminal, Files, or a second window | Discover consistent shared state and working interactions |
| Phone visitor | Tap a labeled app or reading link | Read comfortably and switch apps without dragging tiny windows |
| Keyboard/screen-reader visitor | Use the skip link or accessible launcher | Reach the same content and actions without pointer gestures |

## 3. Visual language

The interface should resemble a customized workstation someone enjoys spending time in. The first redesign uses a light oatmeal desktop, paper-colored content windows, dark text, restrained clay/teal accents, crisp icons, and modest corner radii. Only the top panel and optional Terminal use dark surfaces. Content windows should be calmer than the desktop around them.

Avoid Matrix rain, scanlines over text, glitch transitions, fake code wallpaper, giant padlocks, fabricated threat alerts, constant blinking cursors outside the terminal, and paragraphs written in uppercase. Do not replace these with an equally generic wall of rounded glass cards.

### Implemented initial theme: Workbench Light

The initial charcoal proposal was refined into this lighter palette during implementation. The source of truth is `app/globals.css`; 14 foreground/background combinations have automated contrast tests. This is not a claim of complete accessibility compliance. Verify new combinations, including hover, disabled, selected, and focus states. Adjust values when needed while preserving the warm direction.

| Semantic CSS token | Starting value | Intended role |
| --- | --- | --- |
| `--color-desktop` | `#ded7ca` | Oatmeal backdrop |
| `--color-surface` | `#faf7f0` | Paper-colored content surface |
| `--color-surface-raised` | `#ffffff` | Input surfaces |
| `--color-text` | `#302f2a` | Main dark text |
| `--color-text-muted` | `#5e5a52` | Readable secondary labels |
| `--color-border` | `#938b7c` | Control boundaries and window separation |
| `--color-accent` | `#315d57` | Links, icons, selected indicators |
| `--color-on-accent` | `#ffffff` | Text on solid accent fills |
| `--color-highlight` | `#a34d32` | Clay accents and active window marker |
| `--color-focus` | `#9c422a` | Visible keyboard focus ring |
| `--color-panel` | `#353730` | Restrained dark top panel |
| `--color-selected` | `#d9e3db` | Selected navigation row |

Use dark teal for interactive emphasis and clay sparingly for warmth. Terminal accents stay local to Terminal. Do not paint all text with an accent. Selection, focus, warning, and active-window state must not be distinguished only by color. Add semantic success/warning/danger tokens only with the features that need them, and test their contrast.

Components reference tokens rather than raw hex values. Keep palette definitions centralized. Semantic meanings remain stable across themes. Later themes may include a brighter paper-like reading palette and a classic terminal palette; neither is required in the first theme migration. Theme preference must not change content or available controls.

### Typography and spacing defaults

- Retain the existing locally bundled Space Grotesk and JetBrains Mono initially; do not add font services or replace fonts simply to make a task look larger.
- Use sans-serif for navigation, buttons, biography, project descriptions, and articles. Use monospace for terminal output, paths, timestamps, code, and selected compact technical labels.
- Body copy: 16px minimum; long-form articles default to 18px with roughly 1.65–1.8 line-height. Reading width: 60–72 characters, not the full window width.
- Standard controls and window titles: 14–16px. Secondary desktop metadata: 12–13px; essential information must not be tiny. Terminal: 14–16px with horizontal handling for code, not page overflow.
- Prefer sentence case. Uppercase is reserved for short decorative eyebrows, never paragraphs or every menu label.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px. Use 24px content padding on comfortable desktop windows and 16px on narrow screens.
- Corner defaults: 6px controls, 10px windows, 12px menus. Use a small number of consistent shapes, not rounded pills everywhere.
- Icon defaults: 18–20px within controls, 24px launcher icons. An icon's size is not its click target; aim for 44×44px targets on touch surfaces.

### Background, elevation, and motion

Default to a quiet solid desktop surface. Remove the current decorative grid, green glow, and outlined headline. An intentionally selected wallpaper may be considered later; do not add a gradient, texture, or atmospheric effect merely to fill empty space. Prefer mostly opaque content surfaces over heavy blur. Distinguish the active window through a clear title bar/border and modest shadow; inactive content remains readable.

### Layout requirements

Joe explicitly rejected the black-and-green hacker treatment after seeing the alpha. Do not preserve it as the default on the assumption that Linux implies green-on-black. The earlier Workbench palette is a proposed starting point, not a requirement to keep every surface dark. A lighter content surface may be appropriate; test hierarchy and readability rather than defending a palette. The desktop features remain on the roadmap; the existing layout can change.

The following are project-specific design constraints, not claims that these patterns are inherently bad on every website:

| Do not default to | Prefer for JoeOS |
| --- | --- |
| Giant abstract slogan with outlined or gradient text | A modest welcome note and immediately usable app/content choices |
| Hero → logo strip → bento features → statistics → CTA funnel | A coherent workspace; individual apps organize their actual content |
| Identical cards for every project, article, skill, and interest | Project rows, journal lists, readable documents, or diagrams selected by content type |
| Glowing orbs, dot grids, glass panels, neon borders | Calm opaque surfaces, useful boundaries, a clear active-window state |
| Pills for every label and dozens of technology badges | Plain metadata; explain a technology in the context of a real decision |
| “Crafting digital experiences,” “passionate innovator,” or “where X meets Y” | Specific, approved descriptions of what Joe does, wrote, or learned |
| Fake counters, customer logos, testimonials, availability badges | Verifiable evidence, or an honest empty/unpublished state |
| Scroll-reveal on every block, typewriter headlines, cursor trails | Motion only to explain an interaction or state transition |
| Random asymmetry and arbitrary font combinations to appear original | Consistent controls with deliberate content hierarchy and useful variation |
| Manufactured nostalgia, decorative coffee stains, fake handwritten notes | Actual approved artifacts and writing, with honest context and captions |

No blanket ban on cards, gradients, symmetry, icons, or familiar components is intended. A card is appropriate when it groups a meaningful object; an icon is appropriate when it communicates an action. The failure is using them as an automatic template without a content or interaction reason. Do not create a bespoke, confusing replacement for a standard control just to be different.

#### Positive composition defaults

- **Desktop:** the work surface is the page, not a marketing hero with windows pasted over it. Keep identity compact. Reserve the central area for a useful welcome/content window and real workspace activity. No permanent large slogan behind the windows.
- **Welcome/About:** short approved introduction, plain labels for About, Projects, Journal, and Terminal, and a direct reading link. If material is missing, leave deliberate breathing room rather than inventing decorative content.
- **Projects:** start from a readable index with title, one-sentence problem, and meaningful status. A selected project becomes a case study with decisions and evidence. Do not add numeric IDs, status chips, or thumbnail grids unless they help the actual collection.
- **Journal:** titles, dates, short excerpts, and article reading are the primary elements. Personal and technical entries can share a chronology. Avoid forcing every post into a dashboard card.
- **Homelab:** show an explanatory document with a diagram when approved content warrants one. Do not turn case studies into monitoring tiles.
- **Shell:** use one recognizable family of title bars, controls, menus, and focus treatments. Apps may have different editorial layouts without becoming unrelated miniature websites.

Use my writing, development notes, diagrams, and terminal interactions as they become available. “Make it unique” is not permission to invent facts, change the stack, copy another portfolio, or add expensive effects.

#### Originality review for each visual task

1. Name the visitor's task and the actual content available before selecting a layout.
2. State two or three specific choices about composition, hierarchy, or interaction. “Modern,” “premium,” and “clean” are not decisions.
3. Check the first viewport without color: does it still read as a usable personal workstation, or as a generic landing-page hero? A new palette alone does not pass.
4. Check each repeated container: does it group a meaningful object, or only fill space? Remove unjustified repetition.
5. Check visible copy: can each claim be traced to approved content or actual behavior? Remove generic filler instead of manufacturing personality.
6. Compare desktop and mobile results. Preserve distinctive hierarchy while keeping labels, controls, and reading obvious.
7. Record these observations with the visual handoff. Do not call the result unique solely because a prompt requested it.

Apply these checks only to visual/copy tasks; do not expand a command-parser fix into an unsolicited redesign.

Default UI transitions: 120–180ms; app/window transitions: at most about 220ms. Respect reduced motion by removing nonessential movement. Never animate each terminal character by default. Audio is off by default. No animation or sound may block reading or launching an app.

## 4. Desktop shell and navigation

The shell consists of a restrained top panel, desktop space, application windows, and a dock/launcher. Keep reserved panel/dock areas outside maximized-window bounds. Remove the idea that the shell needs a telemetry sidebar to feel technical.

Default first visit: show a welcoming About window with obvious About, Projects, Journal, and Terminal navigation. The initial warm redesign implements this entry point. Do not revert to an unsolicited terminal-first experience.

The top panel contains JoeOS identity, workspace access when implemented, local time, and Settings. Add notification history only when the underlying service exists. Do not display pretend Wi-Fi quality, physical memory, network throughput, or security posture.

Dock requirements:

- Apps are recognizable with labels on hover **and focus**, accessible names, and a usable mobile label strategy.
- A running indicator means an actual running app/window, not decoration.
- Activating a running singleton restores/focuses it; it does not create duplicates.
- Search is available from a visible button. Cmd/Ctrl+K is supplementary, not the only path.
- Reading mode is a real link to static content and remains easy to find.

Boot is optional and skippable. A later boot sequence may show actual local initialization stages, but no fake login, password challenge, or “encrypted session established” claim. Direct content links bypass it.

## 5. Window interaction contract

Implement behavior in a testable window service/reducer. Rendering must not become the source of truth for geometry or lifecycle.

| Action | Required result |
| --- | --- |
| Launch singleton | Create once; otherwise restore and focus its existing window |
| Launch multi-instance app | Follow explicit registry policy and allocate distinct window IDs |
| Focus | Bring that window above sibling windows in its workspace; preserve its content state |
| Minimize | Hide without destroying app state; restore from dock or overview |
| Close | Apply app close policy; release window resources; return focus to a useful surviving control |
| Maximize | Save previous bounds, fill available workspace, and change the control to Restore |
| Restore | Return to saved bounds, clamped to the current viewport |
| Resize/rotate viewport | Keep title bars/actions reachable; never restore a window entirely offscreen |
| Move to workspace | Change workspace ownership without duplicating or losing the app state |

Proposed geometry defaults: 48px top panel; 80px reserved bottom area; initial standard window around 760×520px, bounded by available space. Each app declares minimum size; a 320×240px minimum is only a baseline, not permission to cram articles into tiny surfaces. If usable space is too small, switch layout instead of violating constraints.

Dragging starts only on draggable title-bar space, never window controls or selected text. Use pointer capture; clean up listeners on cancellation and close. Resizing is constrained to minimum size and workspace bounds. Include keyboard-accessible Move, Resize, Maximize, and workspace actions in a window menu. Do not claim keyboard parity when an action exists only as a drag gesture.

Initial snap targets: left half, right half, maximize. Store pre-snap bounds for restore. Keep geometry functions pure and test offscreen coordinates, viewport shrink, and invalid persisted input.

Window and process IDs are distinct. Do not rely on ever-growing CSS z-index values as the sole lifecycle model; normalize stacking when necessary. Menus and launcher have their own shell overlay layer. Non-modal windows are not `aria-modal` dialogs. Actual confirmation dialogs manage focus and return it on dismissal.

## 6. Applications and public content

### About

Friendly biography, interests, professional context, and approved contact links. Lead with Joe as a person. The visible app name should default to **About**, rather than the colder “Identity.” Show missing material as an honest unpublished state. Do not invent employers, qualifications, hobbies, family details, or availability for work.

### Projects

Every published project should explain the problem, Joe's role, constraints, decisions, implementation, evidence, outcome, and lessons. Separate completed work from ongoing experiments. Screenshots and diagrams complement prose. Do not use arbitrary skill percentages, fake endorsements, or unverified impact metrics.

### Journal

Personal and technical writing share one publication system. Provide title, summary, date, tags, readable article body, stable URL, and optional updated date. Later: tags, archives, RSS, related writing. Only advertise a feature when it exists.

Direct URLs must be normal static reading pages, not a query string that only works after launching the desktop. Draft exclusion happens before files enter public assets, bundles, indexes, feeds, or virtual files. A public Git repository is already public: never commit private drafts to it and assume a `draft` flag hides their source.

### Homelab Showcase

This is an authored engineering exhibit, not monitoring software. Advanced interactivity should explain decisions:

- A sanitized conceptual topology with selectable components and explanatory detail.
- Before/after architecture comparisons with approved evidence.
- A guided account of a troubleshooting or reliability lesson.
- Dependency highlighting based entirely on published records.
- Explicitly labeled simulations for explaining concepts, never fabricated real-world status.

Example interaction: selecting “Application layer” opens an explanation of its responsibilities, tradeoffs, and a related case study. It does not ping a host or show current uptime. Diagram details must have an equivalent readable text/list representation.

No live endpoints, internal IPs, private hostnames, tokens, Home Assistant access, Homebase embeds, owner mode, or build-time private fetching. Imported media must be reviewed for addresses, names, identifiers, notifications, and other unintended disclosures. Do not fetch private source material merely because a case study needs content.

### Files

Virtual files expose the same approved content as reading pages, Projects, Journal, and search. Paths are discoverable aliases, not an independent duplicate database. Published content is read-only. Later visitor-created notes live in a separate device-local mount with explicit export/reset behavior. They are not sent to Joe and do not modify the public repository.

### Terminal

The terminal is a curated browser-local command environment, not an arbitrary shell. No `eval`, remote commands, script execution from user input, or implied server access.

Target commands: `help`, `man`, `ls`, `cd`, `pwd`, `cat`, `open`, `clear`, `whoami`, `neofetch`, `ps`, `kill`, plus documented discovery commands. Add parser quoting/escaping, history, autocomplete, and aliases in separately tested slices. Pipes are later, with explicit supported types; do not pretend unsupported syntax worked.

`open` uses the shared launch service. `ps` reports actual JoeOS processes once implemented; until then label its narrower window information honestly. `kill` cannot terminate browser/system processes. History must be scoped and bounded, and any persistence must be disclosed and resettable. Terminal output escapes content as text; virtual files cannot inject HTML.

### Process Monitor and Settings

Process Monitor describes actual app lifecycles, not invented physical CPU/memory data. Show “unavailable” where a measurement cannot be obtained reliably. Settings owns theme, motion/sound preferences, and local session controls. “Reset JoeOS data on this device” requires a precise confirmation and must not clear unrelated origin storage.

### Optional Marathon

Keep it in the future showcase track. Read `MARATHON.md` before work. Verify runtime and game-data licenses independently, reproduce a standalone prototype, then assess input, audio, saves, cleanup, download size, and hosting constraints. Do not bundle game assets or claim a playable game exists now. Game code/data loads only after explicit launch. Every input-capture state has a visible escape route back to the website.

## 7. Shared systems and ownership

```text
Approved public content
  ├─ static reading routes / metadata / future feeds
  ├─ app views (About, Projects, Journal, Homelab)
  ├─ virtual-file adapters
  └─ search index

App launch service → process lifecycle → window manager → shell views
                          │                   │
                          └── versioned session persistence
```

Rules:

- Content records have stable IDs; titles and paths can change without becoming identity keys.
- Commands, dock, Files, and search invoke the same typed launch API.
- Ephemeral interaction state such as a hovered snap target stays out of persistent storage.
- Persist plain validated data, not JSX, functions, DOM nodes, or timers.
- App close/error boundaries release listeners, workers, audio, and other owned resources.
- Do not introduce a second state library, event bus, or router merely because it is familiar to the implementing model. Extend existing ownership unless a concrete gap is demonstrated.
- A capability declaration is application architecture, not a security sandbox. Do not market virtual filesystem permissions as real isolation.

### Persistence and recovery

Use a versioned envelope containing schema version and validated payload. Migrate known versions; reject or safely ignore unsupported versions without erasing data silently. Recover from invalid JSON, missing apps, offscreen geometry, denied storage, and quota errors. The site must remain usable without persistence.

Suggested progression: preferences first, then geometry/workspaces, then explicitly opted-in session restoration and local notes. A restored session must not autoplay sound or launch a large game download. Provide a reset/recovery entry independent of the state it is repairing. Do not store personal contact inputs or private information under the guise of OS realism.

### Search and notifications

Search starts with app names and expands to published content, paths, and commands. Results show their type and destination. Arrow keys navigate results, Enter activates, Escape dismisses and restores focus. Empty queries show useful destinations; no matches yields a clear message. Do not move focus to an invisible result.

Notifications arise from real events such as a failed local save or completed export. Deduplicate repeated failures. Important errors remain accessible after a toast disappears. Normal success messages are polite announcements; do not interrupt screen readers for every clock tick or focus change. No fake alerts to make the desktop look busy.

## 8. Responsive behavior

Breakpoints are implementation defaults, not device detection:

- **Wide, at least 1100px:** freeform multi-window desktop with readable app minimum sizes.
- **Intermediate, 768–1099px:** constrained windows, prominent maximize and app switching; do not force side-by-side layouts when content cannot fit.
- **Narrow, below 768px:** one foreground app, a labeled app switcher/launcher, and normal vertical reading. No drag handles or resize targets on the mobile presentation.

Preserve desktop bounds separately when switching to mobile. Do not overwrite a desktop layout with full-screen phone coordinates. On returning to desktop, clamp saved bounds to available space.

Honor safe areas, dynamic viewport height, and virtual keyboard space. The dock must not cover the last paragraph, input, or action. Long titles and URLs wrap. Code may scroll within its own region; the whole page must not scroll horizontally. Prefer 16px input text on phones. Do not focus the terminal automatically and summon the keyboard on first load.

## 9. Accessibility, reading, and content tone

Product acceptance targets—not a certification claim:

- Normal text contrast at least 4.5:1; large text and meaningful control boundaries at least 3:1. Check rendered combinations rather than assuming token values pass.
- Visible focus that is not clipped or hidden beneath another window; action names match visible labels.
- All essential content reachable without the desktop through semantic HTML and ordinary links.
- Useful heading order and landmarks; no hover-only controls or color-only status.
- No keyboard trap. Dialogs, launcher dismissal, window close/minimize, and app errors return focus predictably.
- Usable at 200% zoom and a 320 CSS-pixel viewport. Test reduced motion and a manual screen-reader reading path.
- Long articles are readable without animation, sound, or interacting with OS controls.

Write public copy in first person, using plain descriptions of what I built, why I chose it, and what I learned. Say “No posts published yet,” not “Database unavailable.” Say “Saved on this device,” not “Synchronized,” unless genuine synchronization exists. Use technical terms when they explain the work. Avoid slogans, self-praise, repeated disclaimers, and generic claims about innovation or craftsmanship.

Error copy states what happened, what remains safe, and the next action. Example: “Your layout couldn't be saved on this device. You can keep using JoeOS; changes may be lost after closing this tab.” Never display private diagnostics or secret-bearing URLs.

## 10. Performance and deployment

Keep GitHub Pages static export working, including the `/JoeOS` project base path, nested direct links, self-hosted fonts, metadata, and sitemap. Do not introduce server actions, request-time APIs, private credential handling, or an external service to solve a presentation problem.

Proposed initial engineering budgets, to measure and revisit explicitly:

- Initial JavaScript transfer at most 300KB compressed, excluding optional apps loaded later.
- Initial page transfer at most 1.5MB, including fonts and normal imagery, excluding explicit game downloads.
- No continuous animation loop while idle; clock updates at minute granularity unless seconds are actually displayed.
- Aim for LCP within 2.5 seconds, CLS below 0.1, and responsive interactions under ordinary mobile testing conditions. Record the test device/profile; these are targets, not current measured results or guarantees.

Use lazy loading for heavy apps and diagrams. Do not preload Marathon on hover or during boot. Prefer local performance measurements over adding visitor analytics. Any external analytics or telemetry requires a separate explicit decision.

Before deployment, run the repository's locked dependencies and checks. Current commands:

```sh
pnpm test
pnpm lint
pnpm typecheck
GITHUB_ACTIONS=true GITHUB_REPOSITORY=Joegamer1/JoeOS pnpm build
```

Use package versions from the repository, not versions remembered by a model. If tooling changes, update these instructions with evidence. Publication is not implied by a documentation or review task. When deployment is authorized, verify the actual public URL and nested content links after Actions succeeds.

## 11. Implementation sequence

Each milestone should leave a usable application. Do not wait until the last milestone to consider accessibility, mobile, tests, or static routes; those are gates for every slice.

| Milestone | Scope | Completion evidence |
| --- | --- | --- |
| A — Warm foundation | Semantic tokens, readable type/controls, calm surfaces, About labeling, welcome-first entry | Desktop/mobile screenshots; measured contrast; no lost interactions |
| B — Window system | Process/window identity, geometry, move/resize/snap, keyboard window menu, viewport constraints | Pure geometry/lifecycle tests and pointer/keyboard browser checks |
| C — Reliable sessions | Versioned preferences/layouts, migrations, recovery, workspace ownership | Corrupt/old/denied storage tests; rotate/shrink/restore checks |
| D — Shared discovery | Content schema, Files, command parser/history/completion, real global search | Same content opens from all entry points; draft exclusion tests |
| E — Personal publishing | Journal articles, archives, tags, RSS, professional project case studies | Direct URL reloads, readable mobile articles, metadata/feed validation |
| F — Deep desktop | Process Monitor, notifications, workspace overview, app recovery | Lifecycle cleanup, focus restoration, workspace/process integration tests |
| G — Homelab exhibit | Approved case studies, accessible conceptual diagrams, guided tours | No private requests or identifiers; diagram/text parity |
| H — Optional details | Optional boot, themes, contextual actions, Easter eggs; separate Marathon prototype | Performance/reduced-motion checks; game-specific gates if applicable |

Milestones can be split further. Do not build every part of a milestone in one response when it prevents testing. Do not replace system work with decorative placeholders to report it complete.

### Recommended next task

A1/A2 and the content-view groundwork of A3 are implemented in the initial warm redesign. Next, refine approved content and complete the outstanding manual accessibility checks recorded in CONSTRUCTION_PLAN; then B1 introduces pure geometry before drag/resize. Preserve existing behavior and avoid a simultaneous runtime rewrite.

## 12. Work packets for smaller implementation models

Give the model this specification **and one bounded task**, not “build all of JoeOS.” Smaller tasks reduce the number of decisions it must hold at once. The exact model is less important than clear scope and verifiable results.

Every packet must contain:

1. Objective and why it matters to the visitor.
2. Files/areas to inspect, including applicable instructions.
3. Existing behavior to preserve.
4. Explicit in-scope changes and non-goals.
5. Acceptance checks with observable outcomes.
6. Required test commands and manual checks.
7. Publication authority: local only, commit requested, or deployment explicitly authorized.
8. Required handoff: changes, evidence, limitations, next smallest task.

### Reusable implementation prompt

```text
Work on JoeOS. Read AGENTS.md, docs/DESIGN_SPEC.md, docs/ARCHITECTURE.md,
SECURITY.md, and the files relevant to the task before editing.

Task: [one observable outcome]
Scope: [specific areas]
Preserve: [existing contracts/interactions]
Non-goals: [features that must not be added or redesigned]
Acceptance:
- [observable behavior]
- [edge case]
- [mobile/keyboard requirement]
Checks: [commands and manual verification]
Publication: local changes only unless separately authorized.

First summarize the current implementation and the invariant you will add.
For visual work, apply the anti-template contract: state the visitor task,
available approved content, and concrete composition choices. Do not use a
generic hero/bento/CTA funnel or merely recolor the hacker-dashboard layout.
Implement the smallest complete slice. Do not invent content or integrations.
Do not replace missing behavior with fake metrics or decorative controls.
Run checks; report actual results and anything not tested. If blocked, leave
a precise explanation rather than claiming the task is complete.
Finish with changed files, evidence, remaining limitations, and next task.
```

### Example packet A1: warm theme migration

```text
Objective: make the existing JoeOS alpha warmer and easier to read without
changing OS behavior.

Inspect app/globals.css, app/layout.tsx, components/desktop/* and the reading
route. Implement the Workbench semantic tokens from DESIGN_SPEC section 3;
adjust colors if measured contrast needs it. Replace legacy color references
consistently, increase tiny interface text, and keep articles comfortably spaced.

Preserve window launch/focus/minimize/maximize/close, terminal commands,
Cmd/Ctrl+K app search, all static URLs, and the /JoeOS base path.
Non-goals: persistence, new apps, new fonts, animations, process redesign,
publishing content, dependency upgrades, and deployment.

Acceptance: no raw palette colors scattered through component styles; no
essential labels below 12px; readable body copy; visible focus; no horizontal
page overflow at 390px or 320px; controls remain reachable at 200% zoom.
Verify desktop plus mobile screenshots, actual contrast pairs, app launches,
terminal input, and reading-route reloads. Run test/lint/typecheck/Pages build.
Report measured and untested items separately. Local changes only.
```

### Example packet B1: pure geometry foundation

```text
Objective: define tested window geometry before adding pointer gestures.
Add typed bounds and pure functions for clamping, maximize/restore, and
left/right snap. Integrate with the current window reducer without replacing
app content or adding persistence. Separate IDs where needed, but avoid an
unrelated runtime rewrite.

Acceptance: title bars remain reachable after viewport shrink; bounds respect
app minima or choose the documented narrow layout; maximize/restore preserves
prior bounds; invalid numbers cannot enter state. Unit tests cover each case.
Existing lifecycle tests and the production build still pass.
Non-goals: drag handlers, session storage, new themes, multi-workspace UI.
Local changes only; describe the smallest next pointer/keyboard task.
```

### Reviewer prompt

```text
Review only. Do not edit or deploy. Compare this change with DESIGN_SPEC and
its task packet. Find concrete regressions in readability, keyboard/mobile
behavior, state ownership, privacy, content truthfulness, static export, and
test coverage. For visual work, also check the anti-template contract: generic
hero/card funnels, decorative hacker cues, filler copy, and unjustified repeated
containers. Explain concrete fixes, not subjective claims of an "AI look."
Cite the exact file and behavior for each finding. Distinguish
blocking defects from optional polish. Do not demand unrelated roadmap work.
```

## 13. Release checklist and anti-drift rules

- [ ] Every visible control has working behavior or a clear unavailable state.
- [ ] No claims of private connectivity, invented achievements, or pretend live metrics.
- [ ] About, Projects, and Journal are discoverable without terminal knowledge.
- [ ] All entry points refer to the same approved content.
- [ ] Reading links work on direct navigation and reload under `/JoeOS/`.
- [ ] Focus, text contrast, touch targets, reduced motion, and narrow-screen layout checked.
- [ ] Existing OS behavior and resource cleanup remain intact.
- [ ] Unit/integration tests match the changed invariant; browser checks match changed interactions.
- [ ] Test, lint, typecheck, and production export results recorded honestly.
- [ ] README/status distinguish shipped behavior from target behavior.
- [ ] Deployment performed only when requested; actual live result verified if deployed.

Reject these shortcuts: making every panel green to signal “hacker”; shrinking type to fit more chrome; substituting static JSON counters for processes; duplicating article text in each app; inventing content to fill a layout; declaring a command complete because it prints “Opening…”; adding private APIs for realism; hiding unfinished behavior behind unlabeled icons; or rebuilding the whole app to solve a local styling issue.

Decision log for later changes: record the date, problem, decision, rejected alternative, affected contracts, and verification. When Joe changes the direction, update the specification and short build prompt together so future agents do not follow conflicting instructions.
