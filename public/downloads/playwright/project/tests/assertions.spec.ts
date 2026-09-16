/**
 * Assertions — SauceDemo
 * Corresponds to: ch04-assertions.mdx
 * Demonstrates: toBeVisible, toHaveText, toHaveCount, toHaveClass (both the
 * exact-string form and the regex form), toBeChecked, toHaveAttribute, and
 * soft assertions (expect.soft).
 */

import { test, expect } from '@playwright/test';

test.describe('Assertions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/inventory.html');
  });

  // ── toBeVisible ────────────────────────────────────────────────────────────

  test('toBeVisible confirms the products title rendered', async ({ page }) => {
    // "Products" is rendered as <span data-test="title">, not a heading
    // element, so it's reached via the data-test attribute (ch03's
    // recommended fallback once no ARIA role applies).
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

  // ── toHaveText ─────────────────────────────────────────────────────────────

  test('toHaveText confirms exact cart badge text after adding an item', async ({ page }) => {
    await page
      .locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Backpack' })
      .getByRole('button', { name: 'Add to cart' })
      .click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  // ── toHaveCount ────────────────────────────────────────────────────────────

  test('toHaveCount confirms the inventory list has exactly 6 products', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  // ── toHaveClass — exact string form ───────────────────────────────────────

  test('toHaveClass exact-string form matches the whole class attribute', async ({ page }) => {
    // toHaveClass with a string requires the class attribute to equal this
    // exactly. The sort <select> only ever carries this one class, so it's
    // a safe target for the exact-match form.
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await expect(sortDropdown).toHaveClass('product_sort_container');
  });

  // ── toHaveClass — regex form for partial matching ─────────────────────────

  test('toHaveClass regex form matches when only one class needs checking', async ({ page }) => {
    const inventoryList = page.locator('.inventory_list');
    await expect(inventoryList).toHaveClass(/inventory_list/);
  });

  // ── toBeChecked ────────────────────────────────────────────────────────────

  test('toBeChecked reflects checkbox state before and after clicking', async ({ page }) => {
    // SauceDemo itself has no native checkbox anywhere in its UI, so this
    // test proves the assertion against a manufactured, visibly-positioned
    // checkbox input added to the live page — demonstrating
    // toBeChecked()/not.toBeChecked() exactly as ch04 teaches.
    await page.evaluate(() => {
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = 'demo-checkbox';
      input.style.position = 'fixed';
      input.style.top = '0';
      input.style.left = '0';
      input.style.zIndex = '9999';
      // SauceDemo's global stylesheet resets native inputs to 0x0, so an
      // explicit size is needed for this manufactured checkbox to render.
      input.style.width = '20px';
      input.style.height = '20px';
      input.style.appearance = 'auto';
      document.body.appendChild(input);
    });

    const checkbox = page.locator('#demo-checkbox');
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  // ── toHaveAttribute ────────────────────────────────────────────────────────

  test('toHaveAttribute confirms the logo image has an alt attribute', async ({ page }) => {
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveAttribute(
      'data-test',
      'shopping-cart-link'
    );
  });

  // ── Soft assertions ────────────────────────────────────────────────────────

  test('soft assertions check every part of a product card without stopping', async ({ page }) => {
    const item = page.locator('.inventory_item').first();

    await expect.soft(item.locator('.inventory_item_name')).toBeVisible();
    await expect.soft(item.locator('.inventory_item_desc')).toBeVisible();
    await expect.soft(item.locator('.inventory_item_price')).toBeVisible();
    await expect.soft(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();

    // All four checks run and are reported even if one fails.
  });

  // ── Custom error message ──────────────────────────────────────────────────

  test('custom error message clarifies an ambiguous assertion', async ({ page }) => {
    await page
      .locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Backpack' })
      .getByRole('button', { name: 'Add to cart' })
      .click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]'),
      'Cart badge should show 1 item after adding one product'
    ).toHaveText('1');
  });
});
