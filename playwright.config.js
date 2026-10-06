// Fidelity tests: the deployed app must render pixel-identical to the
// original Claude Design artifact (reference/artifact-bundle.html).
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120000,
  workers: 1,
  reporter: [['list']],
  use: {
    browserName: 'chromium',
    baseURL: 'http://localhost:4173',
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    // Optional: point at a preinstalled Chromium instead of Playwright's download.
    launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
  },
  webServer: {
    command: 'node server.js',
    url: 'http://localhost:4173/healthz',
    env: { PORT: '4173' },
    reuseExistingServer: true,
  },
});
