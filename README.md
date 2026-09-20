# JoeOS

A browser-native personal website where I utilize Next.js, React, and TypeScript to recreate a native Linux Desktop environmen as my personal website.

JoeOS is an ambitious personal website for my life, blog, interests, accomplishments, and professional work, presented through a purpose-built Linux desktop. It is inspired by the depth and delight of projects such as Dustin Brett's daedalOS, while deliberately establishing its own visual language: modern Linux workstation meets SOC-esque/"hacker" tropes.

The first slice establishes the art direction, a real interactive terminal, application registry, virtual filesystem seed, responsive mobile layout, and static-export deployment. The long-term project is designed to become a coherent browser operating environment.

## Product principles

- **Convincing systems, not decorative chrome.** Windows, processes, files, commands, search, and applications should share real state.
- **One content graph, many interfaces.** A project is the same object whether opened from Files, Terminal, Search, or Projects.
- **Technical depth serves discovery.** The spectacle invites exploration; the content proves the work.
- **Linux/SOC, not Windows cosplay.** Dense telemetry, restrained phosphor accents, purposeful geometry, and excellent typography define JoeOS.
- **Accessible underneath the illusion.** Keyboard navigation, reduced motion, semantic HTML, focus management, readable contrast, and crawlable content are release requirements.
- **Mobile is a reinterpretation.** Small screens become a command center/app switcher rather than a shrunken desktop.

## Architecture roadmap

| System | Direction |
| --- | --- |
| Window manager | Multi-instance windows, focus/z-order, drag, resize, snap, minimize/maximize, constraints, keyboard controls |
| App runtime | Typed registry, lifecycle hooks, capability declarations, deep links, lazy loading |
| Virtual filesystem | Typed nodes, mounts, permissions-like metadata, shared content adapters, IndexedDB persistence |
| Terminal | Parser, quoted arguments, pipes where useful, history, autocomplete, aliases, man pages, filesystem-aware commands |
| Process manager | Runtime process table, app/window relationship, resource simulation, kill/restart actions |
| Shell | Launcher, global search, command palette, notifications, quick settings, keyboard shortcut service |
| Workspaces | Multiple desktops, window assignment, overview mode, persistent layouts |
| Homelab showcase | Authored case studies, explanatory diagrams, selected screenshots, lessons learned, and accomplishments; no private connections |
| Journal | Personal and technical blogging, article routes, tags, archives, RSS, and direct reading mode |
| Persistence | Versioned local schema, migrations, saved preferences, sessions, layouts, notes, and recovery mode |
| Web platform | Static-first SEO routes, accessibility escape hatch, responsive mobile shell, performance budgets |

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for system boundaries and [`CODEX_BUILD_PROMPT.md`](CODEX_BUILD_PROMPT.md) for the master implementation brief.

## Start locally

Requirements: Node.js 22 and pnpm 11.19.0 (pinned in `package.json`).

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Then open `http://localhost:3000`. Useful checks:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

## GitHub Pages

The project uses Next.js static export, so GitHub Pages is practical as long as product data remains build-time or browser-local. Every push to `main` builds and deploys `out/` through GitHub Actions. In repository **Settings → Pages**, select **GitHub Actions** as the source if it is not selected automatically.

Project Pages base paths are handled during Actions builds from `GITHUB_REPOSITORY`. For a future custom domain, set the repository variable `PAGES_BASE_PATH` to `/` and update `SITE_URL`; see [deployment notes](docs/DEPLOYMENT.md). Blog posts and case studies can be published at build time. A future public feature requiring request-time APIs may warrant another host; connecting to private infrastructure is outside the product's scope on every host.

## Security and privacy

JoeOS never connects to Joe's homelab, Home Assistant, home network, or private services—not even through a read-only proxy or owner-only mode. Homelab content is intentionally authored for public presentation. Never publish secrets or private infrastructure details. See [`SECURITY.md`](SECURITY.md).

An optional [Marathon (1994) feasibility brief](docs/MARATHON.md) describes a future browser game app. It has not been implemented.

## Current status

JoeOS is at `0.1.0-alpha`: a tested foundation, not the completed OS.

- Working: typed app registry; reducer-based singleton windows with focus, minimize/restore, maximize, and close; app search (Cmd/Ctrl+K); browser-local terminal (`help`, `ls`, `cd`, `pwd`, `cat`, `open`, `clear`, `whoami`, `neofetch`, `ps`); shared public content and read-only virtual files; static reading routes; mobile active-app layout; automated tests and deployment.
- Planned: dragging, resizing, snapping, multi-instance apps, full process lifecycle, persisted sessions, notifications, workspaces, command parsing/history/autocomplete, global content search, authored articles/RSS, interactive homelab case studies, and deeper accessibility testing. These are roadmap commitments, not claims of shipped features.
- No fake live telemetry, credentials, private integration endpoints, or game assets are included. Biography, article, and accomplishment sections explicitly identify content not yet published.

Repository: [Joegamer1/JoeOS](https://github.com/Joegamer1/JoeOS). Target site: [JoeOS on GitHub Pages](https://joegamer1.github.io/JoeOS/).

## License

Source available for portfolio review. Add a license before accepting outside contributions or reuse.
