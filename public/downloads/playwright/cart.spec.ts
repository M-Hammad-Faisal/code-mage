/**
 * Cart Test Suite — SauceDemo
 * Tutorial: code-mage.vercel.app/tutorial/playwright
 *
 * Prerequisites:
 *   npm init playwright@latest
 *   Set baseURL to https://www.saucedemo.com in playwright.config.ts
 *
 * Run: npx playwright test cart.spec.ts
 */

import { test, expect, type Page, type Locator } from '@playwright/test';

// ---------------------------------------------------------------------------
// Page Objects
// ---------------------------------------------------------------------------

class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginAs(username: string, password: string = 'secret_sauce') {
    await this.page.goto('/');
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page).toHaveURL('/inventory.html');
  }
}

class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addToCart(productName: string) {
    await this.page
      .getByRole('listitem')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeFromCart(productName: string) {
    await this.page
      .getByRole('listitem')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async expectCartCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async expectItemInCart(productName: string) {
    await expect(this.page.locator('.cart_item').filter({ hasText: productName })).toBeVisible();
  }

  async expectItemNotInCart(productName: string) {
    await expect(
      this.page.locator('.cart_item').filter({ hasText: productName })
    ).not.toBeVisible();
  }

  async expectCartCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeItem(productName: string) {
    await this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }
}

// ---------------------------------------------------------------------------
// Test Data
// ---------------------------------------------------------------------------

const USERS = {
  standard: 'standard_user',
  problem: 'problem_user',
} as const;

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTshirt: 'Sauce Labs Bolt T-Shirt',
} as const;

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Shopping Cart', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Log in and land on inventory before each test
    await loginPage.loginAs(USERS.standard);
  });

  // ── Adding Items ───────────────────────────────────────────────────────────

  test('add single item updates cart badge', async () => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.expectCartCount(1);
  });

  test('add multiple items updates cart badge correctly', async () => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.addToCart(PRODUCTS.bikeLight);
    await inventoryPage.addToCart(PRODUCTS.boltTshirt);
    await inventoryPage.expectCartCount(3);
  });

  test('add button changes to remove after adding', async ({ page }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);

    const button = page
      .getByRole('listitem')
      .filter({ hasText: PRODUCTS.backpack })
      .getByRole('button');

    await expect(button).toHaveText('Remove');
  });

  // ── Removing Items ─────────────────────────────────────────────────────────

  test('remove item from inventory page updates badge', async () => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.expectCartCount(1);

    await inventoryPage.removeFromCart(PRODUCTS.backpack);
    await inventoryPage.expectCartCount(0);
  });

  test('remove item from cart page removes it from list', async () => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.addToCart(PRODUCTS.bikeLight);
    await inventoryPage.goToCart();

    await cartPage.expectCartCount(2);
    await cartPage.removeItem(PRODUCTS.backpack);
    await cartPage.expectCartCount(1);
    await cartPage.expectItemNotInCart(PRODUCTS.backpack);
    await cartPage.expectItemInCart(PRODUCTS.bikeLight);
  });

  // ── Cart Page Content ──────────────────────────────────────────────────────

  test('cart page shows added items', async () => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.addToCart(PRODUCTS.bikeLight);
    await cartPage.goto();

    await cartPage.expectItemInCart(PRODUCTS.backpack);
    await cartPage.expectItemInCart(PRODUCTS.bikeLight);
    await cartPage.expectCartCount(2);
  });

  test('empty cart shows no items', async () => {
    await cartPage.goto();
    await cartPage.expectCartCount(0);
  });

  // ── Cart Persistence ───────────────────────────────────────────────────────

  test('cart persists after navigating away and back', async ({ page }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await page.goto('/about.html').catch(() => {}); // may 404, that's fine
    await cartPage.goto();
    await cartPage.expectItemInCart(PRODUCTS.backpack);
  });

  // ── Continue Shopping ──────────────────────────────────────────────────────

  test('continue shopping returns to inventory', async ({ page }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await cartPage.goto();
    await cartPage.continueShoppingButton.click();
    await expect(page).toHaveURL('/inventory.html');
  });

  // ── Checkout Entry ─────────────────────────────────────────────────────────

  test('checkout button leads to checkout page', async ({ page }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await cartPage.goto();
    await cartPage.checkoutButton.click();
    await expect(page).toHaveURL('/checkout-step-one.html');
  });
});
