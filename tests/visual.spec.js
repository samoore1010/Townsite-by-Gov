// Visual baselines: every screen of the served app must match the owner-approved
// screenshots in tests/baselines/ pixel-for-pixel.
//   npm run test:visual      compare
//   npm run design:approve   regenerate baselines (only after the owner approves a design change)

const { test, expect } = require('@playwright/test');

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  phone: { width: 390, height: 844 },
};
const PERSONAS = ['resident', 'applicant', 'planning', 'engineering', 'fire', 'water', 'leadership'];
const SHOT = { fullPage: true, animations: 'disabled', caret: 'hide', maxDiffPixels: 0, threshold: 0 };

async function open(browser, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await context.addInitScript(() => {
    try { localStorage.setItem('civicpath-v61-tour-seen', '1'); } catch (e) {}
  });
  const page = await context.newPage();
  await page.goto('/');
  await page.waitForSelector('#persona-select', { timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  await dismissTour(page);
  return { context, page };
}

async function dismissTour(page) {
  const close = page.getByRole('button', { name: 'Explore on my own' });
  if (await close.count()) { await close.first().click(); await page.waitForTimeout(300); }
}

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
}

for (const [vp, viewport] of Object.entries(VIEWPORTS)) {
  test(`persona home screens (${vp})`, async ({ browser }) => {
    const { context, page } = await open(browser, viewport);
    try {
      for (const persona of PERSONAS) {
        await page.selectOption('#persona-select', persona);
        await page.waitForTimeout(800);
        await dismissTour(page);
        await settle(page);
        await expect(page).toHaveScreenshot(`${vp}-persona-${persona}.png`, SHOT);
      }
    } finally {
      await context.close();
    }
  });
}

test('applicant project workspace sections (desktop)', async ({ browser }) => {
  const { context, page } = await open(browser, VIEWPORTS.desktop);
  try {
    await page.selectOption('#persona-select', 'applicant');
    await page.waitForTimeout(800);
    await dismissTour(page);
    await page.getByText('Saguaro Commons', { exact: true }).first().click();
    await page.waitForTimeout(800);
    const rail = page.locator('nav[aria-label="Project sections"] button, nav[aria-label="Project sections"] a');
    const count = await rail.count();
    for (let i = 0; i < count; i++) {
      await rail.nth(i).click();
      await page.waitForTimeout(700);
      await settle(page);
      await expect(page).toHaveScreenshot(`desktop-workspace-section-${String(i).padStart(2, '0')}.png`, SHOT);
    }
  } finally {
    await context.close();
  }
});
