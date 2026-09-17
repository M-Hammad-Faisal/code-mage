/**
 * Tabs & Downloads Test Suite — SauceDemo
 * Tutorial: code-mage.dev/tutorial/webdriverio
 *
 * SauceDemo has no popup and no iframe anywhere in the app, so this file
 * only exercises what's real: a genuine target="_blank" link (the footer
 * social icons) and a real file download (the order confirmation PDF).
 *
 * The download test needs one thing added to your wdio.conf.ts capabilities
 * before it'll run — Chrome's download behavior has to be pointed at a
 * known folder instead of prompting:
 *
 *   import path from 'path';
 *
 *   capabilities: [{
 *     browserName: 'chrome',
 *     'goog:chromeOptions': {
 *       prefs: {
 *         'download.default_directory': path.join(process.cwd(), 'test-downloads'),
 *         'download.prompt_for_download': false,
 *       },
 *     },
 *   }],
 *
 * Prerequisites:
 *   npm init wdio@latest
 *   Set baseUrl to https://www.saucedemo.com in wdio.conf.ts
 *
 * Run: npx wdio run wdio.conf.ts --spec test/specs/tabs-and-downloads.e2e.ts
 */

import fs from 'fs';
import path from 'path';

async function login() {
  await browser.url('/');
  await $('[data-test="username"]').setValue('standard_user');
  await $('[data-test="password"]').setValue('secret_sauce');
  await $('[data-test="login-button"]').click();
}

describe('New tabs', () => {
  it('the X (Twitter) footer link opens in a new tab', async () => {
    await login();

    const originalHandle = await browser.getWindowHandle();
    await $('[data-test="social-x"]').click();

    await browser.waitUntil(async () => (await browser.getWindowHandles()).length === 2, {
      timeout: 5000,
      timeoutMsg: 'expected a second tab to open',
    });

    await browser.switchWindow('x.com');
    await expect(browser).toHaveUrl(expect.stringContaining('x.com/saucelabs'));

    await browser.closeWindow();
    await browser.switchToWindow(originalHandle);

    // the original tab is untouched — still on the inventory page
    await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
  });
});

describe('File downloads', () => {
  const downloadDir = path.join(process.cwd(), 'test-downloads');

  before(() => {
    if (fs.existsSync(downloadDir)) {
      fs.rmSync(downloadDir, { recursive: true, force: true });
    }
    fs.mkdirSync(downloadDir, { recursive: true });
  });

  it('downloads the order confirmation PDF', async () => {
    await login();
    await $('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await $('[data-test="shopping-cart-link"]').click();
    await $('[data-test="checkout"]').click();
    await $('[data-test="firstName"]').setValue('John');
    await $('[data-test="lastName"]').setValue('Doe');
    await $('[data-test="postalCode"]').setValue('12345');
    await $('[data-test="continue"]').click();
    await $('[data-test="finish"]').click();

    await expect($('.complete-header')).toHaveText('Thank you for your order!');

    await $('[data-test="generate-pdf-order"]').click();

    // SauceDemo's PDF filename is timestamped, so poll for any .pdf landing
    // in the download directory instead of asserting a fixed name.
    await browser.waitUntil(
      () =>
        fs.existsSync(downloadDir) && fs.readdirSync(downloadDir).some((f) => f.endsWith('.pdf')),
      { timeout: 10000, timeoutMsg: 'expected a PDF to be downloaded within 10s' }
    );

    const downloaded = fs.readdirSync(downloadDir).find((f) => f.endsWith('.pdf'));
    expect(downloaded).toBeDefined();
    const size = fs.statSync(path.join(downloadDir, downloaded!)).size;
    expect(size).toBeGreaterThan(100);
  });
});
