# JoeOS architecture

JoeOS should evolve as a collection of cooperating subsystems, not a single oversized desktop component.

## Layers

1. **Content domain** — authored public records for personal blog posts, interests, projects, accomplishments, experience, homelab case studies, and contact information.
2. **Kernel services** — event bus, process table, application lifecycle, filesystem, persistence, permissions-like capabilities, notifications, command execution.
3. **Window compositor** — geometry, focus, z-order, snapping, workspaces, pointer and keyboard interaction.
4. **Applications** — Terminal, Files, Projects, Identity, Journal, Homelab Showcase, Process Monitor, Settings, Search; optional Marathon runtime after feasibility validation.
5. **Shell** — desktop, panels, dock, launcher, workspace overview, session restore.
6. **Web surface** — metadata, semantic content routes, accessibility fallbacks, static export and performance instrumentation.

## State ownership

Domain content is immutable at runtime. Session state belongs to kernel services. Ephemeral interaction state stays within components. Persistent state uses a versioned storage adapter so IndexedDB can replace localStorage without changing consumers. Every subsystem should be testable without rendering the entire desktop.

## Proposed source map

```text
app/                    Next.js routes and metadata
components/desktop/     shell and compositor views
components/apps/        application UIs
lib/content/            portfolio content schema and records
lib/kernel/             event bus, processes, lifecycle, persistence
lib/os/                 registry, commands, filesystem, shared types
lib/window-manager/     geometry, constraints, workspaces, reducer
public/                 icons, manifest, social card, downloadable assets
tests/                  unit, integration, accessibility, end-to-end
```

## Architectural constraints

- Commands call typed services; they do not manipulate React components directly.
- Apps launch through the registry, never through switch statements scattered across the UI.
- Window identity and process identity are separate so multi-window apps remain possible.
- Filesystem paths resolve through one normalized API used by Terminal, Files, and Search.
- Persisted payloads include a schema version and migration path.
- No runtime, build job, proxy, embedded dashboard, or owner mode may connect to Joe's homelab, Home Assistant, home network, or private services. Read-only connections are also excluded. Private administration stays in separate tools.
- Homelab content is intentionally authored for publication. Diagrams, screenshots, and interactive explanations describe accomplishments and design decisions; they do not monitor or control infrastructure. Simulations must be labeled.
- Journal and case studies share typed content records with Files, Terminal, and Search. Each article has a stable static URL, title, summary, publication date, tags, and optional update date; unpublished drafts are excluded from the public build. Provide archives and RSS.
- Static semantic routes remain available for core portfolio content even if the desktop runtime fails.

## Product priorities

JoeOS supports both a personal blog about Joe's life and interests and a professional introduction to his work. Readers must be able to reach articles, accomplishments, projects, and biography without learning terminal commands. The Linux/SOC aesthetic conveys personality; it does not imply a connection to real infrastructure. The initial public release replaces illustrative infrastructure telemetry with actual browser-local window counts and explicit privacy labels.

## Implemented foundation and next slice

`lib/content/pages.ts` supplies the reading routes, content windows, and virtual text files. `lib/os/windows.ts` owns singleton window lifecycle and stacking. `lib/os/commands.ts` calls explicit launch/navigation callbacks and reads the window registry. `ps` is labeled a window registry, not a complete process table. The shell uses normal landmark sections rather than pretending every non-modal window is a modal dialog.

Next: separate process and window identities, add validated geometry/drag/resize/snap and keyboard movement, and versioned session persistence. Then multi-workspaces, notifications, Files, full search, and authored blog/case-study schemas. The initial launcher searches apps only, windows do not yet drag or resize, and no session data is persisted. Mobile shows the focused app with dock switching; desktop layouts remain separate from this mobile presentation.
