/**
 * Cart Test Suite — SauceDemo
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 5, Page Object Model
 *
 * Full cart suite using the shared InventoryPage and CartPage objects:
 * adding items, viewing the cart, removing items, and the checkout entry
 * point.
 *
 * Run: npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
 */

import loginPage from '../pages/login.page';
import inventoryPage from '../pages/inventory.page';
import cartPage from '../pages/cart.page';

describe('Cart', () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(browser).toHaveUrl(expect.stringContaining('/inventory'));
  });

  // SauceDemo never clears the cart on its own, and re-visiting
  // /inventory.html directly 404s on this site (see cart.page.ts's
  // clearCart() for why) — so tests reset via the UI after each run
  // instead of navigating back to a "fresh" page.
  afterEach(async () => {
    await cartPage.clearCart();
  });

  it('adding a product updates the cart badge', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  it('adding multiple products accumulates the cart badge count', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');

    expect(await inventoryPage.getCartCount()).toBe(3);
  });

  it('cart page lists every item that was added', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Fleece Jacket');

    await inventoryPage.goToCart();
    await expect(browser).toHaveUrl(expect.stringContaining('/cart.html'));

    const names = await cartPage.getCartItemNames();
    expect(names).toEqual(
      expect.arrayContaining(['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'])
    );
    expect(await cartPage.getItemCount()).toBe(2);
  });

  it('removing an item from the cart updates the count', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();

    expect(await cartPage.getItemCount()).toBe(2);

    await cartPage.removeItem('Sauce Labs Backpack');

    expect(await cartPage.getItemCount()).toBe(1);
    const remaining = await cartPage.getCartItemNames();
    expect(remaining).toEqual(['Sauce Labs Bike Light']);
  });

  it('continue shopping returns to the inventory page', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    await cartPage.continueShopping();

    await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'));
  });

  it('checkout button navigates to the checkout flow', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    await expect(cartPage.checkoutButton).toBeClickable();
    await cartPage.proceedToCheckout();

    await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one'));
  });

  it('cart is empty by default with no badge shown', async () => {
    await expect($('[data-test="shopping-cart-badge"]')).not.toBeDisplayed();

    await inventoryPage.goToCart();
    expect(await cartPage.getItemCount()).toBe(0);
  });
});
