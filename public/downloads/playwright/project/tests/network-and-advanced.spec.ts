/**
 * Network Interception & Structural Assertions — SauceDemo
 * Corresponds to: ch06-advanced.mdx
 * Demonstrates: page.route() for request interception/mocking against a
 * real SauceDemo network call (the product image assets), plus
 * locator.ariaSnapshot() / toMatchAriaSnapshot() for structural
 * assertions — confirmed current APIs as of Playwright 1.63 per
 * docs/research/playwright.md in the code-mage repo.
 */

import { test, expect } from '@playwright/test';

test.describe('Network interception with page.route()', () => {
  test('blocks product image requests and the page still renders', async ({ page }) => {
    let blockedImageRequests = 0;

    await page.route('**/assets/*.jpg', async (route) => {
      blockedImageRequests++;
      await route.abort();
    });

    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/inventory.html');

    // The product grid still renders even though every image request
    // was aborted — proof that route() intercepts before the network call.
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    expect(blockedImageRequests).toBeGreaterThan(0);
  });

  test('mocks a product image response with a substitute image', async ({ page }) => {
    // Fulfill every product image request with a 1x1 transparent PNG instead
    // of letting the real asset load. Useful for isolating tests from a
    // slow or unreliable CDN.
    const onePixelPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      'base64'
    );

    await page.route('**/assets/*.jpg', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'image/png',
        body: onePixelPng,
      });
    });

    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.inventory_item_img').first()).toBeVisible();
  });
});

test.describe('Structural assertions with ariaSnapshot', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('sort dropdown matches its expected accessibility structure', async ({ page }) => {
    const sortDropdown = page.locator('[data-test="product-sort-container"]');

    // toMatchAriaSnapshot checks the accessibility tree, not the DOM/CSS —
    // it survives class renames and markup changes as long as the
    // accessible roles, names, and selected state stay the same.
    await expect(sortDropdown).toMatchAriaSnapshot(`
      - combobox "Sort products":
        - option "Name (A to Z)" [selected]
        - option "Name (Z to A)"
        - option "Price (low to high)"
        - option "Price (high to low)"
    `);
  });

  test('ariaSnapshot() can be read directly for debugging or custom checks', async ({ page }) => {
    const cartLink = page.locator('[data-test="shopping-cart-link"]');
    const snapshot = await cartLink.ariaSnapshot();

    // An empty cart has an aria-label of "Cart, empty" — ariaSnapshot()
    // returns that structure as a YAML string you can log or assert on.
    expect(snapshot).toContain('Cart, empty');
  });
});
