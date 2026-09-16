/**
 * Flaky Test Prevention & Retry Configuration — SauceDemo
 * Corresponds to: ch07-flaky-tests.mdx
 * Demonstrates: web-first assertions that avoid manual waits,
 * test.describe.configure({ retries }), and a storageState-based test
 * that relies on the "chromium-authenticated" project + "setup"
 * dependency defined in playwright.config.ts (see tests/auth.setup.ts).
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Race-condition-safe navigation', () => {
  test('waits for the inventory page to be ready before interacting with it', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // STABLE — wait for a specific element on the destination page instead
    // of assuming the click above already finished navigating.
    await expect(inventoryPage.pageTitle).toBeVisible();
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);
  });
});

test.describe('State isolation', () => {
  test.beforeEach(async ({ page }) => {
    // Each test starts with a clean localStorage cart — never rely on
    // state left behind by a previous test. page.localStorage is the
    // native WebStorage API (since 1.61) — prefer it over
    // page.evaluate(() => localStorage.clear()), since it avoids
    // injecting a script into the page just to touch storage.
    await page.goto('/');
    await page.localStorage.clear();
  });

  test('cart is empty on a fresh session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectCartCount(0);
  });
});

test.describe('Retry configuration for a slower user flow', () => {
  // These tests exercise performance_glitch_user, which SauceDemo
  // deliberately slows down — retrying makes sense here specifically
  // because the flakiness is a known, documented property of this test
  // user, not a hidden bug.
  test.describe.configure({ retries: 1 });

  test('performance glitch user eventually reaches inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('performance_glitch_user', 'secret_sauce');

    await expect(page).toHaveURL('/inventory.html', { timeout: 10_000 });
    // performance_glitch_user is deliberately slow to render content even
    // after the URL has already changed, so this waits with a longer,
    // explicit timeout instead of the page object's default 5s check.
    await expect(inventoryPage.pageTitle).toBeVisible({ timeout: 10_000 });
  });
});

// ---------------------------------------------------------------------------
// storageState-based auth test
//
// Run with: npx playwright test --project=chromium-authenticated
// The "chromium-authenticated" project in playwright.config.ts depends on
// the "setup" project (tests/auth.setup.ts), which logs in once and saves
// playwright/.auth/user.json. Any test tagged for that project starts
// already authenticated — no login step inside the test itself.
// ---------------------------------------------------------------------------

test.describe('Authenticated via storageState', () => {
  test('starts already logged in when run under chromium-authenticated', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // No login call here — storageState from auth.setup.ts already has a
    // valid session. Going straight to the inventory page proves it.
    await inventoryPage.goto();
    await inventoryPage.expectOnPage();
  });
});
