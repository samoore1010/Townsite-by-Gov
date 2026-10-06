# Unpacking a new Claude Design export into /design

Claude Design publishes a single self-unpacking HTML file (the "bundle"). It contains a JSON manifest of assets (runtime script, React, fonts; base64, often gzip-compressed), a JSON template (the page markup and app logic), and a list of external resources (React CDN URLs mapped to bundled copies).

To refresh the repo from a new bundle:

1. Save the new bundle as `reference/artifact-bundle.html`.
2. Run `node scripts/unpack-bundle.js reference/artifact-bundle.html` (writes `design/index.html` and `design/assets/...`, replacing the old export).
3. `npm run test:import` (the unpacked app must render pixel-identical to the bundle; if not, stop and report).
4. `npm run design:approve` (re-seals checksums and regenerates baselines), then `npm test`.
5. Commit as "Design import: <what changed>".

The unpacker does exactly three mechanical things and nothing else: decodes each asset to a file, replaces each asset's id in the template with its file path, and injects `window.__resources` mapping the external React URLs to the local copies. It never alters markup, styles, or logic.
