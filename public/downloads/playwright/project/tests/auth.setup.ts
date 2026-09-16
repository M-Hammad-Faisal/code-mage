/**
 * Auth Setup — SauceDemo
 * Corresponds to: ch07-flaky-tests.mdx
 * This is the "setup" project referenced in playwright.config.ts. It logs
 * in once via LoginPage and writes the resulting storageState to
 * playwright/.auth/user.json, so the "chromium-authenticated" project
 * (which lists "setup" as a dependency) can start every test already
 * logged in — no repeated login flow, no login-related flakiness.
 */

import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate as standard_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Make sure the login actually landed before saving state.
  await expect(page).toHaveURL('/inventory.html');
  await inventoryPage.expectOnPage();

  await page.context().storageState({ path: authFile });
});
