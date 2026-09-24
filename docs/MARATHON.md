# Marathon (1994): optional browser app feasibility

Status: researched candidate, not implemented or tested in JoeOS. Research date: 2026-09-17.

## Feasibility and candidate routes

Running the original Marathon in a browser is technically feasible. [Systemless](https://github.com/benletchford/systemless) is a Rust runtime for classic Macintosh software with a WebAssembly execution path; its project advertises a [Marathon browser demo](https://systemless.org/marathon). It runs original application code without a Mac ROM or System installation. This is the first candidate to evaluate for the original 1994 executable. The existence of the demo does not establish embedding permission, a reusable browser package, or performance in JoeOS.

[Aleph One](https://github.com/Aleph-One-Marathon/alephone) is another possible route: its modern engine supports [Marathon](https://aleph-one-marathon.github.io/games/marathon.html). A browser build would require a separate port/build assessment; this research did not verify a supported drop-in WebAssembly release. It should not be described as running the original 1994 executable.

## Proposed JoeOS experience

- Launch from an optional Games app or `open marathon`; downloads begin only after launch.
- Run in an isolated game surface within the JoeOS window manager, with fullscreen, input capture/release, volume, controls, and an obvious return to the website.
- Pause or suspend appropriately when minimized; release resources when closed. Keep game input separate from desktop shortcuts.
- Persist saves locally on the visitor's device with export/reset controls. No connection to Joe's infrastructure.
- Keep biography, articles, and projects immediately usable without loading the game. Offer a clear unsupported-device fallback and prioritize desktop keyboard play initially.

## Prototype acceptance gates

1. Identify a reproducible browser runtime build and verify its licensing, game archive requirements, and redistribution terms. Systemless's runtime is GPL-3.0-or-later and does not ship games. Engine licensing and game-data licensing must be evaluated separately; free downloads do not by themselves establish redistribution rights. Consult the [Marathon data repository](https://github.com/Aleph-One-Marathon/data-marathon) and original distribution notices before hosting assets.
2. Demonstrate launch, playable first-level input, audio, pause/resume, and save/reload in a standalone browser prototype. Test actual target browsers before choosing a runtime.
3. Measure download size, memory, responsiveness, and cleanup; integrate only after the standalone test works.
4. Verify hosting requirements against GitHub Pages, including asset paths and any isolation headers needed by the selected build. If required headers cannot be supplied, consider an independently hosted game origin with suitable headers. Do not change the main site's host preemptively.
5. Verify iframe policy and permissions if embedding another host; a working public demo is not proof that embedding is supported. Prefer a reproducible deployment when distribution terms permit it.

I want to finish the core content and desktop services before trying a standalone Marathon prototype.
