# JoeOS implementation rules

Read README.md, docs/DESIGN_SPEC.md, docs/CONSTRUCTION_PLAN.md, docs/ARCHITECTURE.md, SECURITY.md, and CODEX_BUILD_PROMPT.md before substantial changes. This is an ambitious long-term browser operating environment, not a disposable portfolio mockup. DESIGN_SPEC.md is the visual/interaction source of truth; CONSTRUCTION_PLAN.md tracks bounded work and verification, not automatic authorization to perform it.

- Keep Next.js static export and `/JoeOS` project-path deployment working.
- Never connect to private infrastructure, including Home Assistant, even read-only or at build time. No owner/admin mode.
- Publish only intentionally authored content. Never invent biography, credentials, achievements, testimonials, or live metrics.
- Keep content shared between semantic routes, apps, and virtual files. Add OS behavior in testable services/reducers, not a monolithic desktop component.
- Build a complete vertical slice; document remaining roadmap items honestly.
- Apply DESIGN_SPEC.md's anti-template rules to visual/copy work. Do not substitute a generic hero/bento/CTA landing page for the workstation, or treat a palette swap as a distinctive design. Remove the black-and-green hacker treatment; keep familiar, accessible controls.
- Run `pnpm test`, `pnpm lint`, `pnpm typecheck`, and a Pages-path production build before shipping.
- No game runtime/data bundling until its licenses, hosting constraints, and performance are verified.
