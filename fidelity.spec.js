// Renders the same screens from two sources in the same browser and requires
// pixel-identical output:
//   reference: reference/artifact-bundle.html (the original Claude Design artifact)
//   served:    the app as served by server.js (what deploys to Railway)
// Any difference in layout, color, type, spacing, or styling fails the test.

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const REFERENCE_URL = 'file://' + path.join(__dirname, '..', 'reference', 'artifact-bundle.html');
const OUT = path.join(__dirname, '..', 'test-results', 'fidelity');

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  phone: { width: 390, height: 844 },
};

const PERSONAS = ['resident', 'applicant', 'planning', 'engineering', 'fire', 'water', 'leadership'];

async function open(browser, source, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  // Skip the first-run guided tour so both sources start from the same screen.
  await context.addInitScript(() => {
    try { localStorage.setItem('civicpath-v61-tour-seen', '1'); } catch (e) {}
  });
  const page = await context.newPage();
  await page.goto(source === 'reference' ? REFERENCE_URL : '/');
  await page.waitForSelector('#persona-select', { timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  const tourClose = page.getByRole('button', { name: 'Explore on my own' });
  if (await tourClose.count()) { await tourClose.first().click(); await page.waitForTimeout(400); }
  return { context, page };
}

async function shot(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  return page.screenshot({ fullPage: true, animations: 'disabled', caret: 'hide' });
}

async function compare(name, a, b) {
  if (!a.equals(b)) {
    fs.mkdirSync(OUT, { recursive: true });
    fs.writeFileSync(path.join(OUT, `${name}.reference.png`), a);
    fs.writeFileSync(path.join(OUT, `${name}.served.png`), b);
  }
  expect(a.equals(b), `${name}: served render differs from the Claude Design reference (see test-results/fidelity)`).toBe(true);
}

// Runs the same steps against both sources and compares each screen.
async function parity(browser, name, viewport, steps) {
  const ref = await open(browser, 'reference', viewport);
  const srv = await open(browser, 'served', viewport);
  try {
    for (const [label, step] of steps) {
      await step(ref.page);
      await step(srv.page);
      await compare(`${name}--${label}`, await shot(ref.page), await shot(srv.page));
    }
  } finally {
    await ref.context.close();
    await srv.context.close();
  }
}

const selectPersona = (p) => async (page) => {
  await page.selectOption('#persona-select', p);
  await page.waitForTimeout(800);
  const tourClose = page.getByRole('button', { name: 'Explore on my own' });
  if (await tourClose.count()) { await tourClose.first().click(); await page.waitForTimeout(300); }
};

for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
  test(`persona home screens match the reference (${vpName})`, async ({ browser }) => {
    await parity(browser, `personas-${vpName}`, viewport,
      PERSONAS.map((p) => [p, selectPersona(p)]));
  });
}

test('applicant project workspace sections match the reference (desktop)', async ({ browser }) => {
  const ref = await open(browser, 'reference', VIEWPORTS.desktop);
  const srv = await open(browser, 'served', VIEWPORTS.desktop);
  try {
    for (const { page } of [ref, srv]) {
      await selectPersona('applicant')(page);
      await page.getByText('Saguaro Commons', { exact: true }).first().click();
      await page.waitForTimeout(800);
    }
    const rail = (page) => page.locator('nav[aria-label="Project sections"] button, nav[aria-label="Project sections"] a');
    const count = await rail(srv.page).count();
    expect(count).toBe(await rail(ref.page).count());
    for (let i = 0; i < count; i++) {
      for (const { page } of [ref, srv]) { await rail(page).nth(i).click(); await page.waitForTimeout(700); }
      await compare(`workspace-section-${i}`, await shot(ref.page), await shot(srv.page));
    }
  } finally {
    await ref.context.close();
    await srv.context.close();
  }
});
