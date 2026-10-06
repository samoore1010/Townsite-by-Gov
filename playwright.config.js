// Import fidelity check: tests/import.spec.js renders the served app and the
// Claude Design bundle side by side and requires pixel-identical screens.
// Run only when importing a new Claude Design export (npm run test:import).
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
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
