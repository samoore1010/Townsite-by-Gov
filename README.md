# Townsite

A single system of record for real property development approvals in one city, from pre-application to certificate of occupancy. This repository contains the interactive demo designed in Claude Design: a fictional city (Cholla Ridge, Arizona), fictional people and projects, and sample fees and time frames.

> Illustrative workflow. Not a legal or permitting determination. Not affiliated with any government.

## Run locally

Requires Node 18 or later.

```bash
npm install
npm start          # http://localhost:3000
```

## Repository layout

| Path | What it is |
|---|---|
| `design/` | The UI: Claude Design export (markup and app logic in `index.html`, Claude Design runtime, React 18, fonts). Changes follow `CLAUDE.md`. |
| `design.lock.json` | Checksums of the owner-approved `design/` |
| `tests/baselines/` | Owner-approved screenshots of every screen |
| `reference/artifact-bundle.html` | The latest Claude Design bundle, used to verify imports |
| `server.js` | Dependency-free static server (Railway runs this) |
| `scripts/verify-design.js` | Checksum verification and re-sealing |
| `tests/visual.spec.js` | Served app vs. approved baselines |
| `tests/import.spec.js` | Served app vs. Claude Design bundle (imports) |
| `scripts/unpack-bundle.js` | Unpacks a Claude Design bundle into `design/` |
| `docs/backend-seam.md` | How to connect a backend without touching the design |
| `CLAUDE.md` | Rules for coding agents |

## Visual checks

```bash
npm test                 # checksums + approved baselines (run before every commit)
npm run test:import      # Claude Design imports: app vs. bundle, pixel-identical
npm run design:approve   # after the owner approves a visual change
```

The first time, install the test browser with `npx playwright install chromium`. Design change rules are in `CLAUDE.md`.

## Deploy on Railway

1. In Railway: **New Project → Deploy from GitHub repo →** select this repository.
2. Railway detects Node and runs `npm start`. The server listens on Railway's `PORT`.
3. Optional: set the health check path to `/healthz`.
4. Under **Settings → Networking**, generate a domain or attach your own.

No environment variables are required.

## Updating the design

See `CLAUDE.md` (imports from Claude Design and direct changes).
