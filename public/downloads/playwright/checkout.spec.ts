/**
 * Full E2E Checkout Flow — SauceDemo
 * Tutorial: code-mage.vercel.app/tutorial/playwright
 *
 * This file covers the complete purchase flow:
 *   Login → Browse → Add to Cart → Checkout → Confirm
 *
 * Two complete E2E scenarios:
 *   1. Happy path — standard user completes a purchase
 *   2. Validation path — missing checkout fields show errors
 *
 * Prerequisites:
 *   npm init playwright@latest
 *   Set baseURL to https://www.saucedemo.com in playwright.config.ts
 *
 * Run: npx playwright test checkout.spec.ts
 */

import { test, expect, type Page, type Locator } from '@playwright/test';

// ---------------------------------------------------------------------------
// Page Objects
// ---------------------------------------------------------------------------

class LoginPage {
  constructor(private page: Page) {}

  async loginAs(username: string, password = 'secret_sauce') {
    await this.page.goto('/');
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page).toHaveURL('/inventory.html');
  }
}

class InventoryPage {
  readonly cartLink: Locator;

  constructor(private page: Page) {
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addToCart(productName: string) {
    await this.page
      .getByRole('listitem')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL('/cart.html');
  }
}

class CartPage {
  readonly checkoutButton: Locator;

  constructor(private page: Page) {
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectItemInCart(productName: string) {
    await expect(this.page.locator('.cart_item').filter({ hasText: productName })).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }
}

class CheckoutStepOnePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}

class CheckoutStepTwoPage {
  readonly finishButton: Locator;
  readonly summaryItems: Locator;
  readonly totalLabel: Locator;

  constructor(private page: Page) {
    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryItems = page.locator('.cart_item');
    this.totalLabel = page.locator('.summary_total_label');
  }

  async expectOnPage() {
    await expect(this.page).toHaveURL('/checkout-step-two.html');
  }

  async expectItemInSummary(productName: string) {
    await expect(this.page.locator('.cart_item').filter({ hasText: productName })).toBeVisible();
  }

  async finish() {
    await this.finishButton.click();
  }
}

class OrderConfirmationPage {
  constructor(private page: Page) {}

  async expectOrderComplete() {
    await expect(this.page).toHaveURL('/checkout-complete.html');
    await expect(
      this.page.getByRole('heading', { name: 'Thank you for your order!' })
    ).toBeVisible();
    await expect(this.page.getByText('Your order has been dispatched')).toBeVisible();
  }
}

// ---------------------------------------------------------------------------
// Test Data
// ---------------------------------------------------------------------------

const CUSTOMER = {
  firstName: 'Hammad',
  lastName: 'Faisal',
  postalCode: '54000',
} as const;

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
} as const;

// ---------------------------------------------------------------------------
// E2E Test 1: Complete Happy Path
//
// Scenario: A standard user browses the store, adds two items to the cart,
// fills in checkout details, reviews the order, and completes the purchase.
//
// What this covers:
//   - Login
//   - Adding multiple items to cart
//   - Cart contents verification
//   - Filling checkout form
//   - Order summary review
//   - Order confirmation
// ---------------------------------------------------------------------------

test('E2E: complete purchase flow from login to order confirmation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOne = new CheckoutStepOnePage(page);
  const checkoutStepTwo = new CheckoutStepTwoPage(page);
  const confirmation = new OrderConfirmationPage(page);

  // Step 1 — Login
  await loginPage.loginAs('standard_user');

  // Step 2 — Add two products to cart
  await inventoryPage.addToCart(PRODUCTS.backpack);
  await inventoryPage.addToCart(PRODUCTS.bikeLight);

  // Step 3 — Go to cart and verify items
  await inventoryPage.goToCart();
  await cartPage.expectItemInCart(PRODUCTS.backpack);
  await cartPage.expectItemInCart(PRODUCTS.bikeLight);

  // Step 4 — Proceed to checkout
  await cartPage.proceedToCheckout();

  // Step 5 — Fill shipping info
  await checkoutStepOne.fillForm(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
  await checkoutStepOne.continue();

  // Step 6 — Review order summary
  await checkoutStepTwo.expectOnPage();
  await checkoutStepTwo.expectItemInSummary(PRODUCTS.backpack);
  await checkoutStepTwo.expectItemInSummary(PRODUCTS.bikeLight);

  // Step 7 — Finish order
  await checkoutStepTwo.finish();

  // Step 8 — Confirm order complete
  await confirmation.expectOrderComplete();
});

// ---------------------------------------------------------------------------
// E2E Test 2: Checkout Form Validation
//
// Scenario: A user reaches the checkout form and attempts to proceed
// with missing fields. The form should show appropriate error messages
// for each missing required field.
//
// What this covers:
//   - Login
//   - Adding an item (required to access checkout)
//   - Checkout form validation for each missing field
//   - Error message content
// ---------------------------------------------------------------------------

test('E2E: checkout form shows validation errors for missing fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOne = new CheckoutStepOnePage(page);

  // Setup — log in and reach checkout
  await loginPage.loginAs('standard_user');
  await inventoryPage.addToCart(PRODUCTS.backpack);
  await inventoryPage.goToCart();
  await cartPage.proceedToCheckout();

  // Validation 1 — all fields empty
  await checkoutStepOne.continue();
  await checkoutStepOne.expectError('First Name is required');

  // Validation 2 — first name filled, rest empty
  await checkoutStepOne.fillForm('Hammad', '', '');
  await checkoutStepOne.continue();
  await checkoutStepOne.expectError('Last Name is required');

  // Validation 3 — first and last name filled, postal code empty
  await checkoutStepOne.fillForm('Hammad', 'Faisal', '');
  await checkoutStepOne.continue();
  await checkoutStepOne.expectError('Postal Code is required');

  // All fields filled — should proceed without error
  await checkoutStepOne.fillForm(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
  await checkoutStepOne.continue();
  await expect(page).toHaveURL('/checkout-step-two.html');
});
