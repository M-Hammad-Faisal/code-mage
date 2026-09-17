/**
 * Backs the updated Tabs/Downloads content in ch07-advanced-interactions.mdx.
 *
 * SauceDemo has no popup and no iframe anywhere in the app, so this file
 * only exercises what's real: a genuine target="_blank" link (the footer
 * social icons) and a real file download (the order confirmation PDF).
 * See docs/research/saucedemo-site-map.md in the main repo for how these
 * were confirmed.
 */

import fs from 'fs';
import path from 'path';
import loginPage from '../pages/login.page';
import inventoryPage from '../pages/inventory.page';
import cartPage from '../pages/cart.page';
import checkoutPage from '../pages/checkout.page';

describe('New tabs', () => {
  it('the X (Twitter) footer link opens in a new tab', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

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
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo({
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
    });
    await checkoutPage.finish();
    await expect(await checkoutPage.getConfirmationMessage()).toBe('Thank you for your order!');

    await $('[data-test="generate-pdf-order"]').click();

    // SauceDemo's PDF filename is timestamped, so poll for any .pdf landing
    // in the download directory instead of a fixed name.
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
