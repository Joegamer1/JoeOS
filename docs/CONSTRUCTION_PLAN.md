# JoeOS living construction plan

Baseline recorded September 20, 2026. Companion to [DESIGN_SPEC.md](DESIGN_SPEC.md).

This is a planning and continuity document. It does not authorize a deployment, dependency upgrade, private integration, or every task listed here. Future agents must inspect the actual checkout and applicable instructions before acting. A historical successful deployment is not evidence that today's untested changes work.

## 1. Baseline and boundaries

The September 18 initial release provided typed singleton app definitions, window open/focus/minimize/maximize/close, app-name search, a curated filesystem-aware terminal, shared introductory content, static reading pages, sitemap, and GitHub Pages workflows. It did not implement freeform drag/resize, full process management, session persistence, multi-workspaces, actual blog articles, interactive homelab exhibits, or Marathon.

The September 20 initial redesign implements Workbench Light, About-first entry, readable type, distinct content views, and labeled app switching. The design documents still include future requirements; this does not mark the full OS roadmap complete. See the implementation record below for tests and limitations.

Private Homebase and Home Assistant work is separate. Do not inspect or reuse their data, credentials, deployment scripts, calendars, or endpoints for JoeOS. Public project descriptions require deliberately approved content, not discovery of private material.

## 2. Requirement tracking

Statuses: **planned**, **partial**, **implemented**, **verified**, **deferred**. Implemented means code exists; verified requires dated evidence with a commit or local revision description. Deferred requires an explanation and must not masquerade as complete. Update the relevant row after each substantive task, without claiming unrelated rows were checked.

| ID | Requirement | Baseline status | Evidence needed before marking verified |
| --- | --- | --- | --- |
| VIS-01 | Central semantic theme tokens and warm default | Verified (initial theme) | September 20 record: 14 contrast checks and desktop/mobile inspection |
| VIS-02 | Readable interface and article typography | Partial | Desktop/narrow/zoom inspection, no essential microtext |
| VIS-03 | Purposeful composition without generic portfolio templates | Verified (initial views) | September 20 record; authored articles/case studies still pending |
| NAV-01 | Welcome-first entry and obvious reading path | Verified | About-first test and direct reading reload checked September 20 |
| NAV-02 | App launch from dock and keyboard launcher | Implemented | Launch/restore/no-duplicate/Escape/focus browser tests |
| WIN-01 | Focus, minimize, maximize, restore, close | Implemented | Reducer tests plus browser and focus-return tests |
| WIN-02 | Drag, resize, snap, viewport constraints | Planned | Pure geometry tests plus pointer cancellation and keyboard alternatives |
| RUN-01 | Separate process/window identity and lifecycle | Planned | Process table agrees with windows; close/restart cleanup |
| VFS-01 | Shared read-only public content filesystem | Partial | Normalized paths, not-found errors, content parity |
| TERM-01 | Shared-service command execution | Partial | Commands launch actual apps and report accurate state |
| TERM-02 | Parser, history, completion, aliases, man pages | Planned | Quoting/error/history/completion tests; no arbitrary execution |
| FIND-01 | Global published-content search | Partial | Existing app search plus ranked content/path results, keyboard behavior |
| STORE-01 | Versioned local persistence and recovery | Planned | Old/corrupt/unknown version, quota and denial tests |
| WORK-01 | Multiple workspaces and overview | Planned | Move/switch/restore behavior without duplicate processes |
| NOTE-01 | Real notifications and history | Planned | Real event, deduplication, dismissal and accessible announcements |
| WEB-01 | Static reading routes and Pages project path | Implemented | Nested reload, canonical URLs, asset paths, export |
| BLOG-01 | Authored articles, tags, archives, RSS | Planned | Publish pipeline and draft exclusion across all outputs |
| LAB-01 | Advanced authored homelab showcase | Planned | Approved case study, diagram/text parity, no private requests |
| MOBILE-01 | One foreground app and safe responsive reading | Partial | Rotation, dock clearance, virtual keyboard and narrow screens |
| A11Y-01 | Keyboard, focus, contrast, reduced motion | Partial | Automated checks plus recorded manual reading/navigation path |
| PERF-01 | Measured performance budgets and lazy apps | Planned | Repeatable report with device/profile and transfer sizes |
| GAME-01 | Optional Marathon runtime | Deferred | License, standalone prototype, hosting and performance gates |

Do not turn this table into decorative percentage progress. A count of rows does not measure project completion; requirements differ in size.

## 3. Contract checklist for subsystem work

These are implementation invariants, not a command to replace existing modules immediately. Propose exact TypeScript interfaces in the task that owns them, then record adopted names here. Existing identifiers win until a deliberate migration occurs.

### Application runtime

An app definition needs stable app ID, visible name, icon, launch policy, supported launch arguments, minimum window geometry, and a lazy view loader where appropriate. Launch arguments are validated data, not arbitrary JavaScript. Lifecycle owns initialization, running/error state, close policy, and cleanup. App errors must not crash the entire desktop.

A launch request returns a process/window identity or a typed failure. All launch surfaces use it. Singleton policy is explicit; multi-instance support cannot accidentally duplicate a singleton. A process can own multiple windows, but closing the last window follows documented app policy rather than leaving invisible orphan work.

### Window manager

Window state eventually includes ID, process ID, workspace ID, normal bounds, restored bounds, mode, minimized state, and stacking/focus order. Geometry and mode transitions are deterministic. App view state is not copied into the window geometry reducer. Maximize, snap, and restore are explicit modes/transitions, not unrelated booleans that allow contradictory combinations.

Do not persist transient pointer coordinates on every movement. Commit the final gesture to persistent state; rendering may use temporary drag state. Cancelled gestures leave a valid window. React remounts must not silently erase an app when only its position changes.

### Content and publication

Design a validated content record with stable ID, kind, slug, title, summary, approved publication state, body reference, and optional dates/tags/media. Different kinds may require different fields; do not force biography into an article schema or fabricate dates to satisfy it. Publication selects allowed records before generating routes, virtual files, search indexes, feeds, and downloadable assets.

Slugs must be unique within their route namespace. Broken internal content references fail validation with actionable messages. Published text must not be duplicated in component-local constants. Markdown/MDX rendering and media handling need an explicit trust model; do not enable raw executable content for visitor input.

### Virtual filesystem

Use one resolver for separators, relative paths, dot segments, home shorthand, and root clamping. Define case sensitivity and missing-path behavior explicitly; default to case-sensitive Linux-like names. Directory listings are deterministic. Public content is immutable; a future writable local mount is a separate adapter with separate ownership and storage limits.

### Commands

Separate parsing from dispatch and execution. A command definition owns name, help, argument contract, and handler. The handler receives explicit services rather than importing UI components. Parser failures return useful errors without changing current working directory or launching partial actions. Define the supported grammar in help; rejecting pipes is preferable to silently treating them as filenames.

### Persistence

Choose storage per data size and transactional needs. A small versioned preferences adapter may begin with localStorage; notes and richer documents may need IndexedDB. Components must not call ad hoc storage keys everywhere. Hydration must avoid mismatches and must not block direct article content. Catch write failure as well as read failure. Reset deletes only explicitly owned JoeOS keys/databases after confirmation.

## 4. Bounded construction backlog

Use one row as a task packet, or split it if its acceptance criteria cannot be verified in one coherent change. Dependencies are logical prerequisites, not a requirement to finish all earlier rows first.

| Task | Depends on | Deliverable | Explicit non-goals |
| --- | --- | --- | --- |
| A1 Theme/readability | Existing alpha | Tokens, readable scale, calm surfaces, measured contrast | Runtime rewrite, new content, font replacement |
| A2 Welcoming entry | A1 | About naming, welcome-first entry, labeled discovery and reading links | Fake boot/login, personal facts not provided |
| A3 Content-specific composition | A2 | Project index, journal list, document-style case-study layouts based on approved content | Generic bento grid, invented personality or placeholder achievements |
| B1 Geometry | Existing window reducer | Pure bounds/clamp/maximize/restore/snap functions | Pointer listeners, persistence |
| B2 Move/resize | B1 | Pointer gestures, cancellation, keyboard window menu | Multi-workspace overview |
| B3 Runtime identity | Existing registry | Separate app/process/window identities and cleanup ownership | Fake CPU/memory charts |
| C1 Preferences | A1 | Versioned theme/motion preferences and reset | Restoring game sessions, private accounts |
| C2 Layout recovery | B1, B3, C1 | Validated session geometry with migration/recovery | Silent data deletion |
| D1 Content schema | Existing shared content | Validated public records and export adapters | Fabricated articles or achievements |
| D2 Files app | D1 | Accessible navigation over shared virtual records | Access to real local/private files |
| D3 Shell grammar | Existing commands | Parser, structured errors, man/help consistency | Arbitrary executable shell |
| D4 History/completion | D3 | Bounded history and contextual completion | Cloud sync |
| D5 Global search | D1, shared launch API | Apps/content/paths with keyboard results | Private search, embedding service |
| E1 Article pipeline | D1 | Static article routes and publication checks | Inventing Joe's writing |
| E2 Discovery/feed | E1 | Tags, archive, RSS and article metadata | Analytics service |
| F1 Notifications | Runtime events | Real queue/history with deduplication and announcements | Fabricated status events |
| F2 Workspaces | B3, C2 | Ownership, switching, move action, session restore | Remote desktops |
| F3 Process Monitor | B3 | Accurate process state and safe app restart | Physical device monitoring claims |
| G1 Case-study template | D1 | Authored structure with evidence and privacy review | Reading private infrastructure exports |
| G2 Interactive exhibit | G1 plus approved content | Accessible conceptual topology and guided story | Monitoring or controls |
| H1 Optional polish | Relevant stable systems | Skippable boot/theme/Easter-egg task chosen by Joe | Effect-heavy redesign |
| H2 Marathon prototype | Explicit task plus license review | Isolated playable feasibility experiment | Default download or unlicensed assets |

Accessibility and responsive work accompany each row. Do not create a backlog item called “make everything accessible at the end.”

## 5. Browser verification scenarios

Record steps, expected result, observed result, environment, and evidence. A screenshot proves appearance at one moment; it does not prove interaction correctness. A passing unit test does not prove touch or screen-reader usability.

### Scenario 1: professional visitor

1. Open the site in a fresh session.
2. Find About and Projects without keyboard shortcuts or terminal commands.
3. Open a project and switch to direct reading mode.
4. Reload that nested URL.

Expected: clear navigation, readable content, no boot gate, no false credentials or fake completed case studies, valid assets under the project base path.

### Scenario 2: window consistency

1. Open two apps and alternate focus.
2. Minimize the front app, restore it from the dock, then maximize and restore it.
3. Close it and confirm a sensible focus destination.
4. Once move/resize exists, attempt movement beyond each edge and shrink the viewport.

Expected: no duplicate singleton, correct stacking, preserved content state, reachable controls, valid restored geometry. Testing only with a pointer is incomplete for a window-menu task.

### Scenario 3: terminal/content parity

1. Navigate virtual directories and read a published record.
2. Open the same record through Files/search when implemented.
3. Launch an app from Terminal; inspect process state when implemented.
4. Try unknown command, malformed input, missing file, and attempts above virtual root.

Expected: matching approved content, actual launch/state transitions, clear errors, and no execution outside the curated environment.

### Scenario 4: phone and keyboard

1. Test 390px and 320px widths, then landscape.
2. Switch apps, read the last paragraph, and focus an input with the virtual keyboard visible on a real device when available.
3. Use keyboard-only navigation at desktop size; open/dismiss search and move through results.
4. Inspect 200% zoom and reduced motion.

Expected: no page-wide horizontal overflow, no hidden final actions under the dock, no unsolicited keyboard on first load, no focus trap, no loss of reading access. If no real touch device was tested, say so; viewport emulation is not proof of all mobile behavior.

### Scenario 5: failure and recovery

After persistence is introduced, test corrupt JSON, supported old version, unknown future version, missing app ID, inaccessible storage, and quota failure. Confirm that direct content still loads, recovery explains the problem, and reset affects only JoeOS-owned data. Verify an app error does not erase unrelated windows.

### Scenario 6: public-data boundary

Inspect generated files, public bundles, virtual files, search data, media, and request destinations for the changed feature. Confirm drafts and unintended private details are absent. A lack of visible private data in the UI does not prove it is absent from generated assets or repository history. Never move private data into the public repository just to run this test.

## 6. Content requests for Joe

When a task needs real content, request the smallest useful packet. Do not block unrelated layout or schema work; use clearly labeled neutral fixtures outside public publication paths when tests need them.

Biography packet: approved public name, short introduction, interests Joe chooses to share, professional context, and approved contact destinations.

Project packet: title, public summary, status, problem, Joe's role, constraints, key decisions, evidence allowed for publication, outcome, and lessons. Metrics require source/context; omit unsupported claims.

Article packet: title, body, summary, tags, intended date, publication approval, and approved media. A personal story is not permission to publish family identities or schedules.

Homelab packet: public conceptual description, approved diagram level, sanitized media, the decision/lesson being explained, and explicit confirmation the material is suitable for a public repository. Do not ask Joe to upload credentials or private configuration.

## 7. Handoff and decision records

At the end of every meaningful construction task, append or link a compact record. Keep proposed and accepted decisions distinct. Reference commit IDs once committed; use “local uncommitted” otherwise. Never invent a commit, test result, or screenshot.

```markdown
### YYYY-MM-DD — Task ID: short name

Request/scope:
Revision: local uncommitted OR actual commit
Requirements affected:
Files changed:
Behavior before → after:
Decisions made and why:
Preserved contracts:
Automated checks: command, result, environment
Manual checks: scenario, observed result, limitations
Originality checks (visual tasks only): composition, justified containers, approved copy
Unfinished work / known defects:
Publication: not requested / not performed / verified URL and run
Next smallest task:
```

For a significant design change, include: problem, alternatives, choice, reason, user approval where needed, consequences, migration path, and new tests. Update DESIGN_SPEC, this plan, and the short build prompt if the choice changes their instructions. Do not append a new rule while leaving a contradictory old rule intact.

## 8. Definition of ready and done

A task is **ready** when its goal, scope, prerequisites, preservation rules, acceptance checks, and publication authority are clear. If required approved content is missing, separate content-independent implementation from publication.

A task is **done** when its requested behavior works, proportional tests pass, manual checks are recorded, documentation reflects actual status, and no required work is silently left behind. Passing lint alone is not completion. Reaching a deployment URL is not proof the new build is live. A documentation-only task is done with internally consistent, navigable documents; it does not require changing or deploying application code.

Stop and request a decision if completion would require private connectivity, unapproved public facts/media, new paid services, uncertain game redistribution, replacing the chosen stack, or materially expanding the task. Otherwise prefer the documented defaults and keep making scoped progress.

## 9. Initial decision record

### 2026-09-20 — Warm workstation direction

- Accepted direction: Linux-inspired desktop with familiar behavior, warmth, readability, and subtle hacker references. Color scheme is flexible.
- Proposed implementation default: Workbench charcoal/ivory/teal/amber tokens and the sizing values in DESIGN_SPEC. Exact colors still require rendered validation.
- Rejected direction: Windows imitation, dense SOC dashboard, unreadable microtext, and green as an unavoidable global brand constraint.
- Preserved ambition: real window/app/process systems, filesystem, command system, persistence, search, notifications, workspaces, personal publishing, and advanced authored homelab exhibit.
- Privacy invariant: no private integrations, even read-only, owner-only, or build-time.
- This task changes documentation only. Next recommended construction task: A1.

### 2026-09-20 — Reject hacker styling and generic generated layouts

- User feedback: the live black-and-green hacker aesthetic should be dropped; future construction should avoid typical AI website-building tropes.
- Decision: originality must come from purposeful workstation composition, content-specific app layouts, approved personal material, and real interactions. A palette swap does not finish the redesign.
- Remove in implementation: green glow, decorative grid, outlined slogan headline, and console-status clutter. Do not replace them with a generic startup hero/bento/CTA funnel.
- Warmth remains required; the exact palette and dark-versus-light content surfaces are flexible. Avoid manufactured nostalgia or invented personal facts.
- Scope of this update: local prompts and documentation only; no UI changes or deployment. VIS-03 and A3 track the composition work separately from A1 token/readability work.
- Verification: documentation diff/consistency checks. Actual visual acceptance requires future implementation and browser inspection.

### 2026-09-20 — A1/A2 and introductory A3: Workbench Light

- Scope: initial redesign requested by Joe, using the agreed prompts. Palette and composition changed together; no private services or new external dependencies.
- Revision: initial warm-redesign changeset; exact commit is available in repository history under `Redesign JoeOS as a warm personal workstation`.
- Requirements: VIS-01/03 and NAV-01 verified for this initial implementation. VIS-02, MOBILE-01, and A11Y-01 remain partial pending broader manual device/accessibility checks.
- Files: global theme/styles, Desktop, AppLauncher, ContentView, Terminal, reading route, metadata, app registry, initial windows, tests, and aligned design documentation. Next.js refreshed its generated declarations and TypeScript JSX configuration during the build; no dependency versions changed.
- Before → after: black/green console with a giant slogan and terminal-first entry → oatmeal desktop, paper-colored About window, content-specific project/journal/case-study views, persistent labeled dock, and direct reading links.
- Decisions: lighter content surfaces support reading; ordinary app navigation replaces status clutter; Projects uses an index and Journal a truthful empty state. Shared chrome stays consistent. No invented articles, case studies, biography, or metrics.
- Preserved: singleton launch, focus, minimize/restore, maximize/restore, close, virtual files, command execution, static reading URLs, and `/JoeOS` deployment paths. Added focus return to dock/search trigger, input focus on search opening, arrow-key selection, no-match copy, and no unsolicited terminal autofocus.
- Automated evidence: `pnpm test` passed 18 tests (4 OS/entry tests and 14 theme-contrast pair checks); `pnpm lint`, `pnpm typecheck`, and Pages-path `pnpm build` passed locally. Local Node runtime was v24; CI uses repository-configured Node 22.
- Browser evidence: production export served under `/JoeOS/`; desktop appearance, project window controls, terminal `cat about.txt` and `open blog`, search no-match/Escape focus return, phone app switching, About direct-route reload. At 390px and 320px viewport widths, document width matched viewport width. At the scrolled phone page end, final reading link was above the fixed dock. No captured browser console errors.
- Originality review: first viewport is an actual About window, not a hero funnel. The project entry, journal status section, and homelab document differ by purpose. No glass cards, glow, decorative grids, fake counters, or fabricated personal artifacts.
- Limitations: no real mobile keyboard/device or screen-reader session tested; 200% browser zoom and full performance budgets not verified. No new drag/resize/persistence or article publishing system. These remain explicit follow-up work, not completed requirements.
- Next smallest task: collect Joe's feedback on the actual visual result; then complete manual accessibility checks or implement B1 pure geometry without a runtime rewrite.
