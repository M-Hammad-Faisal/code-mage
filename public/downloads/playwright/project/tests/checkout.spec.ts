/**
 * Checkout Test Suite — SauceDemo
 * Corresponds to: ch05-page-object-model.mdx
 * Demonstrates: full checkout suite using pages/CheckoutPage.ts — happy
 * path plus form validation errors for missing first name, last name,
 * and zip/postal code.
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const USER = { username: 'standard_user', password: 'secret_sauce' };

const CUSTOMER = {
  firstName: 'Hammad',
  lastName: 'Faisal',
  postalCode: '54000',
} as const;

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
} as const;

test.describe('Checkout', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(USER.username, USER.password);
    await inventoryPage.expectOnPage();
  });

  // ── Happy Path ─────────────────────────────────────────────────────────────

  test('E2E: complete purchase flow from login to order confirmation', async ({ page }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.addToCart(PRODUCTS.bikeLight);

    await inventoryPage.goToCart();
    await cartPage.expectItemInCart(PRODUCTS.backpack);
    await cartPage.expectItemInCart(PRODUCTS.bikeLight);
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL('/checkout-step-one.html');
    await checkoutPage.fillShippingInfo(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
    await checkoutPage.continue();

    await expect(page).toHaveURL('/checkout-step-two.html');
    await checkoutPage.expectItemInSummary(PRODUCTS.backpack);
    await checkoutPage.expectItemInSummary(PRODUCTS.bikeLight);

    await checkoutPage.finish();
    await checkoutPage.expectOrderConfirmed();
  });

  // ── Form Validation ────────────────────────────────────────────────────────

  test('E2E: checkout form shows validation errors for missing fields', async ({ page }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // All fields empty
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage('First Name is required');

    // First name only
    await checkoutPage.fillShippingInfo(CUSTOMER.firstName, '', '');
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage('Last Name is required');

    // First and last name, no postal code
    await checkoutPage.fillShippingInfo(CUSTOMER.firstName, CUSTOMER.lastName, '');
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage('Postal Code is required');

    // All fields filled — proceeds without error
    await checkoutPage.fillShippingInfo(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
    await checkoutPage.continue();
    await expect(page).toHaveURL('/checkout-step-two.html');
  });

  test('missing zip code alone blocks checkout', async () => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingInfo(CUSTOMER.firstName, CUSTOMER.lastName, '');
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage('Postal Code is required');
  });
});
