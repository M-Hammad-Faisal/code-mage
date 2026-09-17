/**
 * Backs ch08-tabs-windows-dialogs.mdx and ch09-frames-downloads-uploads.mdx.
 *
 * SauceDemo has no native dialogs (alert/confirm/prompt), no popup windows,
 * and no iframes anywhere in the app — confirmed by a full manual walkthrough
 * (see docs/research/saucedemo-site-map.md in the main repo). Those chapters
 * cover the real Playwright APIs for those cases, but this project only
 * exercises what SauceDemo actually has: a real target="_blank" link (the
 * footer social icons) and a real file download (the PDF button on the order
 * confirmation page).
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('New tabs', () => {
  test('the X (Twitter) footer link opens in a new tab', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('[data-test="social-x"]').click(),
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/x\.com\/saucelabs/);
    await newPage.close();

    // the original tab is untouched — still on the inventory page
    await expect(page).toHaveURL(/inventory\.html/);
  });
});

test.describe('File downloads', () => {
  test('downloads the order confirmation PDF', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.continue();
    await checkoutPage.finish();
    await checkoutPage.expectOrderConfirmed();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-test="generate-pdf-order"]').click(),
    ]);

    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    await download.saveAs(`./test-results/${download.suggestedFilename()}`);
  });
});
