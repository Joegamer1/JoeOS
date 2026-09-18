# JoeOS implementation rules

Read README.md, docs/ARCHITECTURE.md, SECURITY.md, and CODEX_BUILD_PROMPT.md before substantial changes. This is an ambitious long-term browser operating environment, not a disposable portfolio mockup.

- Keep Next.js static export and `/JoeOS` project-path deployment working.
- Never connect to private infrastructure, including Home Assistant, even read-only or at build time. No owner/admin mode.
- Publish only intentionally authored content. Never invent biography, credentials, achievements, testimonials, or live metrics.
- Keep content shared between semantic routes, apps, and virtual files. Add OS behavior in testable services/reducers, not a monolithic desktop component.
- Build a complete vertical slice; document remaining roadmap items honestly.
- Run `pnpm test`, `pnpm lint`, `pnpm typecheck`, and a Pages-path production build before shipping.
- No game runtime/data bundling until its licenses, hosting constraints, and performance are verified.
