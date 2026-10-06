# Deploying Townsite on Railway

The app is a static site served by `server.js` (Node 18+, no dependencies at runtime).

## First deploy

1. Make sure the code is on `main` (Railway deploys the default branch).
2. Railway → **New Project → Deploy from GitHub repo →** `samoore1010/Townsite-by-Gov`.
3. Railway detects Node from `package.json` and runs `npm start`. The server listens on Railway's `PORT`. No environment variables are needed.
4. Service **Settings → Healthcheck path:** `/healthz`.
5. **Settings → Networking → Generate Domain** (or add a custom domain).

## After deploying: verify fidelity against the live site

Run the visual tests against the deployed URL instead of the local server:

```bash
npx playwright install chromium
FIDELITY_BASE_URL=https://<your-railway-domain> npx playwright test tests/visual.spec.js
```

(`playwright.config.js` reads `FIDELITY_BASE_URL` when set; otherwise it starts the local server.)

## Every later deploy

Pushes to `main` redeploy automatically. CI (`.github/workflows/fidelity.yml`) runs the checksum and visual checks on every push; do not merge if they fail.
