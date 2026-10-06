// Visual tests. tests/visual.spec.js: served app vs owner-approved baselines.
// tests/import.spec.js: served app vs the Claude Design bundle (design imports).
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  // Approved baseline screenshots live here (owner-approved state of the UI).
  snapshotPathTemplate: 'tests/baselines/{arg}{ext}',
  expect: { toHaveScreenshot: { maxDiffPixels: 0, threshold: 0, animations: 'disabled' } },
  timeout: 120000,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    browserName: 'chromium',
    baseURL: process.env.FIDELITY_BASE_URL || 'http://localhost:4173',
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    // Optional: point at a preinstalled Chromium instead of Playwright's download.
    launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
  },
  webServer: process.env.FIDELITY_BASE_URL ? undefined : {
    command: 'node server.js',
    url: 'http://localhost:4173/healthz',
    env: { PORT: '4173' },
    reuseExistingServer: true,
  },
});
