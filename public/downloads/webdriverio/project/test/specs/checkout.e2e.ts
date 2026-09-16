/**
 * Checkout Test Suite — SauceDemo
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 5, Page Object Model
 *
 * Full checkout suite using the shared CheckoutPage object: happy path
 * through to order confirmation, plus validation errors for missing
 * shipping fields.
 *
 * Run: npx wdio run wdio.conf.ts --spec test/specs/checkout.e2e.ts
 */

import loginPage from '../pages/login.page';
import inventoryPage from '../pages/inventory.page';
import cartPage from '../pages/cart.page';
import checkoutPage from '../pages/checkout.page';

describe('Checkout Flow', () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(browser).toHaveUrl(expect.stringContaining('/inventory'));
  });

  // Same reasoning as cart.e2e.ts: reset via the UI, never by
  // re-navigating to a client-routed URL directly.
  afterEach(async () => {
    await cartPage.clearCart();
  });

  it('completes a full purchase end to end', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);

    await inventoryPage.goToCart();
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain('Sauce Labs Backpack');

    await cartPage.proceedToCheckout();
    await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one'));

    await checkoutPage.fillShippingInfo({
      firstName: 'Hammad',
      lastName: 'Faisal',
      postalCode: '54000',
    });

    await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-two'));
    await expect(checkoutPage.summaryTotal).toBeDisplayed();

    const total = await checkoutPage.getSummaryTotal();
    expect(total).toBeGreaterThan(0);

    await checkoutPage.finish();

    await expect(browser).toHaveUrl(expect.stringContaining('/checkout-complete'));
    const confirmation = await checkoutPage.getConfirmationMessage();
    expect(confirmation).toBe('Thank you for your order!');

    // Leaves us on the confirmation page — return to inventory via the
    // real in-app "Back to Products" link before the next test runs,
    // since afterEach's reset doesn't navigate anywhere on its own.
    await checkoutPage.backHomeButton.click();
    await expect(browser).toHaveUrl(expect.stringContaining('/inventory'));
  });

  it('shows an error when the first name is missing', async () => {
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingInfo({
      firstName: '',
      lastName: 'Doe',
      postalCode: '54000',
    });

    await expect(checkoutPage.errorMessage).toBeDisplayed();
    await expect(checkoutPage.errorMessage).toHaveText(
      expect.stringContaining('First Name is required')
    );
  });

  it('shows an error when the last name is missing', async () => {
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingInfo({
      firstName: 'Jane',
      lastName: '',
      postalCode: '54000',
    });

    await expect(checkoutPage.errorMessage).toBeDisplayed();
    await expect(checkoutPage.errorMessage).toHaveText(
      expect.stringContaining('Last Name is required')
    );
  });

  it('shows an error when the postal code is missing', async () => {
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingInfo({
      firstName: 'Jane',
      lastName: 'Doe',
      postalCode: '',
    });

    await expect(checkoutPage.errorMessage).toBeDisplayed();
    await expect(checkoutPage.errorMessage).toHaveText(
      expect.stringContaining('Postal Code is required')
    );
  });

  it('overview page shows a non-zero total before finishing', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingInfo({
      firstName: 'Hammad',
      lastName: 'Faisal',
      postalCode: '54000',
    });

    await expect(checkoutPage.summarySubtotal).toBeDisplayed();
    const total = await checkoutPage.getSummaryTotal();
    expect(total).toBeGreaterThan(0);
  });
});
