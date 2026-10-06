# Instructions for coding agents (Claude Code and any other LLM agent)

Read this before changing anything in this repository.

## The one rule

**`/design` is a sealed export from Claude Design. Never edit, reformat, regenerate, re-implement, migrate, or "clean up" any file in it.**

That includes: markup, inline styles, colors, fonts, spacing, animations, the template syntax (`<sc-if>`, `<sc-for>`, `{{ }}` bindings, `style-hover` attributes), `assets/dc-runtime.js`, and the vendored React files. Do not port the app to Next.js, Vite, Tailwind, or any other framework. Do not upgrade React. Do not run a formatter over `/design`.

Visual fidelity to the Claude Design original is a hard requirement. Two checks enforce it:

1. `npm run verify:design` checks every file in `/design` against `design.lock.json` (SHA-256).
2. `npm run test:fidelity` renders the app as served and the original artifact (`reference/artifact-bundle.html`) in the same browser and requires pixel-identical screenshots for every persona and project section, on desktop and phone.

Run `npm test` before every commit. Both must pass. Never edit `design.lock.json` or `reference/` to make a check pass.

## Where you may work

- `server.js`: the static server; add API routes here (or in new files under `/server`).
- New backend code: new folders such as `/server`, `/db`, `/api`.
- `/tests`: add tests; do not weaken the fidelity tests.
- `/docs`, `README.md`.

## Connecting a backend

Read `docs/backend-seam.md`. The app keeps all state in one object, saved and loaded through one storage key. Backend integration happens at that seam, outside `/design`, so markup and styles never change.

## Changing the design

Design changes are made in Claude Design, never in code:

1. Export the new version from Claude Design.
2. Replace the contents of `/design` wholesale with the new export, and replace `reference/artifact-bundle.html` with the new bundle.
3. Run `npm run lock:design` to re-seal, then `npm test`.
4. Commit the design update as its own commit, separate from any code change.
