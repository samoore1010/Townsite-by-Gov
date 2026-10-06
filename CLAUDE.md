# Instructions for coding agents (Claude Code and any other LLM agent)

Read this before changing anything. `docs/PROJECT.md` explains what Townsite is and the settled product decisions.

The UI lives in `/design` (page markup, styles, and app logic exported from Claude Design). Three rules cover all work:

## 1. Importing a new Claude Design export: 100% fidelity

When the owner brings in a new export from Claude Design, implement it exactly. Do not adjust, "fix," reformat, or improve anything in it.

1. Save the bundle as `reference/artifact-bundle.html`.
2. `node scripts/unpack-bundle.js reference/artifact-bundle.html` (regenerates `/design`; see `docs/UNPACKING.md`).
3. `npm run test:import` (first time: `npx playwright install chromium`). It renders the app and the Claude Design bundle side by side and requires every screen to be pixel-identical. If anything differs, stop and report to the owner. Do not edit anything to make it pass.
4. Commit on its own: "Design import: <what changed>".

## 2. Design changes the owner asks for directly

When the owner explicitly asks for a change to how the app looks, make it.

- Change only what was asked. No incidental restyling, reformatting, refactoring, or library upgrades.
- Keep the existing code style and template syntax (`<sc-if>`, `<sc-for>`, `{{ }}` bindings, `style-hover`, inline styles). Do not convert the app to another framework unless the owner asks for exactly that.

## 3. Everything else (backend, server, data, deployment, docs)

Do not change how the app looks. Leave `/design` alone unless the owner asked for a design change. If the work seems to require a visual change, ask the owner first. Backend integration goes through the storage seam in `docs/backend-seam.md`.

## Commands

| Command | What it does |
|---|---|
| `npm start` | Run the app at http://localhost:3000 |
| `npm run test:import` | Compare the app to the Claude Design bundle (imports only) |
