/**
 * Cart Test Suite — SauceDemo
 * Corresponds to: ch05-page-object-model.mdx
 * Demonstrates: full cart suite using pages/InventoryPage.ts and
 * pages/CartPage.ts — add items, remove items, cart badge count, and
 * persistence across navigation.
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

const USER = { username: 'standard_user', password: 'secret_sauce' };

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTshirt: 'Sauce Labs Bolt T-Shirt',
} as const;

test.describe('Shopping Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(USER.username, USER.password);
    await inventoryPage.expectOnPage();
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
      .locator('.inventory_item')
      .filter({ hasText: PRODUCTS.backpack })
      .getByRole('button', { name: 'Remove' });

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

    await cartPage.expectCartItemCount(2);
    await cartPage.removeItem(PRODUCTS.backpack);
    await cartPage.expectCartItemCount(1);
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
    await cartPage.expectCartItemCount(2);
  });

  test('empty cart shows no items', async () => {
    await cartPage.goto();
    await cartPage.expectCartItemCount(0);
  });

  // ── Cart Persistence ───────────────────────────────────────────────────────

  test('cart persists after navigating to the cart page and back', async () => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await cartPage.goto();
    await cartPage.expectItemInCart(PRODUCTS.backpack);

    await cartPage.continueShoppingButton.click();
    await inventoryPage.expectOnPage();
    await inventoryPage.expectCartCount(1);
  });

  test('cart persists after a full page reload', async ({ page }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await page.reload();
    await inventoryPage.expectCartCount(1);
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
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL('/checkout-step-one.html');
  });
});
