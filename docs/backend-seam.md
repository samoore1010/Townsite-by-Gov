# Backend seam

The prototype is front-end only. All demo state lives in the browser, saved through a single storage key, so a backend can be connected without touching the design.

## How the app stores state today

In `design/index.html` the app's logic class reads and writes one object:

- Load: `localStorage.getItem('civicpath-cholla-v4')`
- Save: `localStorage.setItem('civicpath-cholla-v4', JSON.stringify({ schemaVersion: 4, revision, persona, route, state }))`
- First-run tour flag: `localStorage` key `civicpath-v61-tour-seen`

`state` holds every project, requirement, comment, correction request, decision, meeting, and document in the demo.

## How to connect a backend without changing `/design`

1. Add API routes to the server (for example `GET /api/state` and `PUT /api/state`), backed by a database.
2. Add a small script **outside** `/design` (for example `server/public/storage-bridge.js`) that the server injects before the app loads. It replaces `window.localStorage` reads and writes for the key `civicpath-cholla-v4` with calls to the API (load on start, save on change).
3. Have `server.js` insert one `<script src="/storage-bridge.js">` tag into the HTML response at serve time. The file on disk in `/design` stays unchanged, so the design is untouched.

Multi-user data, authentication, and per-persona permissions are larger changes. They should be designed first (in Claude Design for any screen changes), then implemented behind the same seam.
