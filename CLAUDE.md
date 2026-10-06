# Instructions for coding agents (Claude Code and any other LLM agent)

Read this before changing anything in this repository. Then read `docs/PROJECT.md` for what Townsite is, the settled decisions, and current status.

## The design rule, in one sentence

**Never change how the app looks unless the owner explicitly asked for that specific change, and never let a visual change merge without the owner seeing and approving it.**

The UI lives in `/design` (page markup, styles, and app logic exported from Claude Design). It is not frozen. It is protected by two checks:

- `design.lock.json`: SHA-256 checksums of every file in `/design` (`npm run verify:design`).
- `tests/baselines/`: approved screenshots of every persona and project screen, desktop and phone (`npm run test:visual`, pixel-exact).

Both always describe the **last state the owner approved**. They change only through the approval step below.

## Three kinds of work

### 1. Importing a design from Claude Design (exact fidelity required)

When the owner brings in a new export from Claude Design, it must be implemented with 100% fidelity. Do not adjust, "fix," reformat, or improve anything in it.

1. Save the bundle as `reference/artifact-bundle.html`.
2. `node scripts/unpack-bundle.js reference/artifact-bundle.html` (regenerates `/design`; see `docs/UNPACKING.md`).
3. `npm run test:import`: renders the unpacked app and the Claude Design bundle side by side; every screen must be pixel-identical. If anything differs, stop and report. Do not edit to make it pass.
4. `npm run design:approve` (re-seals the checksums and regenerates the baseline screenshots), then `npm test`.
5. Commit on its own: "Design import: <what changed in Claude Design>".

### 2. Design changes the owner asks for directly

You may edit `/design` when the owner explicitly asks for a design change. Rules:

- Change only what was asked. No incidental restyling, reformatting, refactoring, library upgrades, or framework migration.
- Keep the existing code style and template syntax (`<sc-if>`, `<sc-for>`, `{{ }}` bindings, `style-hover`, inline styles). Do not convert the app to another framework unless the owner asks for exactly that.
- Work on a branch. Run `npm run test:visual`. It will fail on the screens you changed; that is expected. Show the owner the before/after images from `test-results/` (or the Playwright report) and list every screen that changed, including any you did not intend to change.
- Only after the owner approves: `npm run design:approve` (or the owner runs the "Approve design" workflow in GitHub Actions), `npm test`, commit "Design change: <what>", merge.
- If the owner rejects it, discard the branch.

Note: after a direct change, `/design` no longer matches `reference/artifact-bundle.html`, so `test:import` is expected to fail until the next Claude Design import. `test:visual` against approved baselines is the ongoing check.

### 3. Everything else (backend, server, data, deployment, tests, docs)

Must not change any pixel. `npm test` must pass unchanged, with no baseline or lock updates. If non-design work seems to require a visual change, stop and ask the owner. Backend integration goes through the storage seam in `docs/backend-seam.md`.

## Baselines and environments

CI (GitHub Actions, Ubuntu 24.04, the pinned Playwright version) is the referee. If baselines generated locally fail in CI with no design change, regenerate them with the "Approve design" workflow so they come from the CI environment. Never loosen the comparison to work around this.

## Never

- Update `design.lock.json` or `tests/baselines/` without the owner's approval of the visual result.
- Edit `reference/artifact-bundle.html` except to replace it with a new Claude Design export.
- Weaken, skip, or delete the visual tests or raise their tolerance.

## Commands

| Command | What it does |
|---|---|
| `npm start` | Run the app at http://localhost:3000 |
| `npm test` | Checksums + visual baselines (run before every commit) |
| `npm run test:visual` | Compare every screen to approved baselines |
| `npm run test:import` | Compare the app to the Claude Design bundle (imports only) |
| `npm run design:approve` | Re-seal checksums and regenerate baselines (only after owner approval) |
