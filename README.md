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
| `design/` | The sealed Claude Design export: page markup and app logic (`index.html`), Claude Design runtime, React 18, fonts. **Do not edit.** |
| `design.lock.json` | SHA-256 checksums of every file in `design/` |
| `reference/artifact-bundle.html` | The original published artifact, used as the visual reference |
| `server.js` | Dependency-free static server (Railway runs this) |
| `scripts/verify-design.js` | Checksum verification and re-sealing |
| `tests/fidelity.spec.js` | Pixel-identical comparison of served app vs. reference |
| `docs/backend-seam.md` | How to connect a backend without touching the design |
| `CLAUDE.md` | Rules for coding agents |

## Fidelity checks

```bash
npm run verify:design   # design files unchanged
npm run test:fidelity   # served app renders pixel-identical to the reference
npm test                # both
```

The first time, install the test browser with `npx playwright install chromium`.

## Deploy on Railway

1. In Railway: **New Project → Deploy from GitHub repo →** select this repository.
2. Railway detects Node and runs `npm start`. The server listens on Railway's `PORT`.
3. Optional: set the health check path to `/healthz`.
4. Under **Settings → Networking**, generate a domain or attach your own.

No environment variables are required.

## Updating the design

Make changes in Claude Design, then follow the steps in `CLAUDE.md` under "Changing the design."
