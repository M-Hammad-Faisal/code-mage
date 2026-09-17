/**
 * Tabs & Downloads Test Suite — SauceDemo
 * Tutorial: code-mage.dev/tutorial/playwright
 *
 * SauceDemo has no native dialogs, popups, or iframes — this file only
 * covers what the app actually has: a real target="_blank" link (footer
 * social icons) and a real file download (the order confirmation PDF).
 *
 * Prerequisites:
 *   npm init playwright@latest
 *   Set baseURL to https://www.saucedemo.com in playwright.config.ts
 *
 * Run: npx playwright test tabs-and-downloads.spec.ts
 */

import { test, expect } from '@playwright/test';

async function login(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test('the X (Twitter) footer link opens in a new tab', async ({ page, context }) => {
  await login(page);

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

test('downloads the order confirmation PDF', async ({ page }) => {
  await login(page);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();

  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-test="generate-pdf-order"]').click(),
  ]);

  expect(download.suggestedFilename()).toMatch(/\.pdf$/);
  await download.saveAs(`./test-results/${download.suggestedFilename()}`);
});
