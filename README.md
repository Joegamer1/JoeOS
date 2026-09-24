# JoeOS

JoeOS is my personal website, built with Next.js, React, and TypeScript to look and work like a Linux desktop. I wanted a place for my projects and writing that I could also keep building as a project of its own.

You can open apps, switch between windows, use the terminal, or read the content as ordinary web pages. Projects such as [daedalOS](https://github.com/DustinBrett/daedalOS) got me interested in how much of a desktop could work in a browser.

[Open JoeOS](https://joegamer1.github.io/JoeOS/)

## Current state

The project is at `0.1.0-alpha`. These parts work:

- App registry and singleton windows: open, focus, minimize, restore, maximize, and close
- App search with Cmd/Ctrl+K
- A browser-local terminal with `help`, `ls`, `cd`, `pwd`, `cat`, `open`, `clear`, `whoami`, `neofetch`, and `ps`
- Shared content for apps, virtual files, and direct reading pages
- A mobile layout that shows one app at a time
- Tests and a GitHub Pages deployment workflow

Dragging, resizing, snapping, multiple workspaces, session persistence, and terminal history are still planned. The journal has no published posts yet. More about me and my projects will be added as I work on the site.

## Design and structure

I chose a light desktop with paper-colored windows, dark text, and teal and clay accents. The About window opens first, and the dock keeps the other sections close by. On a phone, app switching takes the place of overlapping windows.

The content lives in `lib/content/pages.ts`. The reading pages, content apps, and virtual files all use it. Window state and terminal commands live in `lib/os`, separate from the desktop components.

The next system work is window geometry, followed by dragging, resizing, and snapping. Later work includes process management, persisted sessions, notifications, a fuller filesystem, and published articles.

- [Architecture](docs/ARCHITECTURE.md)
- [Design specification](docs/DESIGN_SPEC.md)
- [Construction plan and progress](docs/CONSTRUCTION_PLAN.md)
- [AI implementation brief](CODEX_BUILD_PROMPT.md)

I also have [notes on running Marathon in the browser](docs/MARATHON.md). That is an idea to investigate later; it isn't part of the app yet.

## Run locally

Use Node.js 22 and pnpm 11.19.0, as pinned in `package.json`.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`.

## Checks

```bash
pnpm test
pnpm typecheck
pnpm lint
GITHUB_ACTIONS=true GITHUB_REPOSITORY=Joegamer1/JoeOS pnpm build
```

## Deployment

JoeOS uses Next.js static export. Pushes to `main` run the checks and deploy `out/` to GitHub Pages. In **Settings → Pages**, the source is **GitHub Actions**.

The Actions build handles the `/JoeOS` base path. Custom domain settings and rollback steps are in [DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Privacy

JoeOS has no connection to my homelab, Home Assistant, or private services. The homelab section is for writeups and diagrams I choose to publish. See [SECURITY.md](SECURITY.md) for the rules that apply to code, content, and builds.

## License

The source is available to read. No reuse license has been added.
