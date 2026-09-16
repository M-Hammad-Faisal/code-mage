/**
 * Selector Strategy — SauceDemo
 * Corresponds to: ch03-selectors.mdx
 * Demonstrates: getByRole, getByPlaceholder (SauceDemo's stand-in for
 * getByLabel per ch03), getByText, getByTestId-equivalent data-test
 * locators, .filter(), .nth(), and locator chaining — in the hierarchy
 * order the chapter teaches.
 *
 * Note: SauceDemo's product cards are plain <div class="inventory_item">
 * elements with no ARIA list/listitem role, and the "Products" title is a
 * <span data-test="title">, not a heading. So this file reaches for
 * data-test/class locators exactly where ch03 says to — as the stable
 * fallback once the ARIA-role rung of the hierarchy doesn't apply.
 */

import { test, expect } from '@playwright/test';

test.describe('Selector strategy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/inventory.html');
  });

  // ── getByRole ──────────────────────────────────────────────────────────────

  test('getByRole finds interactive elements by accessible name', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
  });

  // ── getByPlaceholder (SauceDemo uses placeholders instead of proper labels,
  //    per ch03 — this is the recommended fallback below getByLabel) ─────────

  test('getByPlaceholder finds the login inputs on the login page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

  // ── getByText ──────────────────────────────────────────────────────────────

  test('getByText finds a specific product name, exact and partial', async ({ page }) => {
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Backpack').first()).toBeVisible();
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });

  // ── getByTestId-equivalent (SauceDemo uses data-test, addressed via
  //    a plain attribute locator since getByTestId() expects the default
  //    data-testid attribute name) ────────────────────────────────────────────

  test('data-test attribute locator finds the cart link and sort dropdown', async ({ page }) => {
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
  });

  // ── .filter() ──────────────────────────────────────────────────────────────

  test('.filter() narrows the product list down to one card by visible text', async ({ page }) => {
    const backpackCard = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(backpackCard).toBeVisible();
    await expect(backpackCard.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  });

  // ── .nth() ─────────────────────────────────────────────────────────────────

  test('.nth() selects a specific product card by position', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
    await expect(items.nth(0)).toBeVisible();
    await expect(items.nth(5)).toBeVisible();
  });

  // ── Chaining: filter() + child locator, the pattern used constantly
  //    on SauceDemo's product list per ch03 ──────────────────────────────────

  test('chained locator adds a specific product to the cart', async ({ page }) => {
    await page
      .locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Backpack' })
      .getByRole('button', { name: 'Add to cart' })
      .click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('.first() picks the first matching Add to cart button', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
