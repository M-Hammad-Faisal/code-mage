import BasePage from './base.page';

/**
 * CartPage — SauceDemo shopping cart.
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 5, Page Object Model
 */
class CartPage extends BasePage {
  get cartItems() {
    return $$('.cart_item');
  }

  get cartItemNames() {
    return $$('.inventory_item_name');
  }

  get checkoutButton() {
    return $('[data-test="checkout"]');
  }

  get continueShoppingButton() {
    return $('[data-test="continue-shopping"]');
  }

  async open(): Promise<void> {
    await super.open('/cart.html');
  }

  async getCartItemNames(): Promise<string[]> {
    const items = await this.cartItems;
    const names: string[] = [];
    for (const item of items) {
      names.push(await item.$('.inventory_item_name').getText());
    }
    return names;
  }

  async getItemCount(): Promise<number> {
    const items = await this.cartItems;
    return items.length;
  }

  async removeItem(productName: string): Promise<void> {
    const items = await this.cartItems;
    for (const item of items) {
      const name = await item.$('.inventory_item_name').getText();
      if (name === productName) {
        await item.$('[data-test^="remove"]').click();
        return;
      }
    }
    throw new Error(`Item not found in cart: "${productName}"`);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Resets the cart via SauceDemo's own "Reset App State" menu option and
   * returns to the inventory page, so the next test always starts from a
   * known, clean state regardless of where the previous test ended up.
   *
   * SauceDemo never clears the cart on its own (not on logout, not between
   * sessions), and reloading a client-routed URL like /cart.html or
   * /inventory.html 404s on this GitHub Pages-hosted SPA — so the app's
   * built-in reset plus real in-app navigation is the only reliable way
   * to get back to a clean inventory page between tests.
   */
  async clearCart(): Promise<void> {
    // The reset link lives in the same header menu on every authenticated
    // page, so open it first regardless of where we currently are.
    await $('#react-burger-menu-btn').click();
    await $('[data-test="reset-sidebar-link"]').waitForClickable();
    await $('[data-test="reset-sidebar-link"]').click();
    await $('#react-burger-cross-btn').click();

    // Reset only clears state — it never navigates. If we're not already
    // on the inventory page, get there via a real in-app link rather than
    // a raw browser.url() call (which 404s on this site).
    const url = await browser.getUrl();
    if (!url.includes('/inventory.html')) {
      if (url.includes('/checkout-complete')) {
        await $('[data-test="back-to-products"]').click();
      } else if (url.includes('/checkout-step-')) {
        await $('[data-test="cancel"]').click();
        if ((await browser.getUrl()).includes('/cart.html')) {
          await this.continueShoppingButton.click();
        }
      } else if (url.includes('/cart.html')) {
        await this.continueShoppingButton.click();
      } else if (url.includes('/inventory-item.html')) {
        await $('[data-test="back-to-products"]').click();
      }
    }

    await $('.inventory_list').waitForDisplayed({ timeout: 5000 });

    // SauceDemo's own "Reset App State" has a real bug: it correctly
    // clears cart-contents in localStorage (and the header badge), but
    // occasionally leaves ONE product card's button still showing
    // "Remove" instead of "Add to cart" — a desync between global cart
    // state and that card's local component state, not something our
    // test can fix by waiting longer. Sweep up any leftover "Remove"
    // buttons directly as a fallback.
    let staleRemoveButtons = await $$('[data-test^="remove-"]');
    while (staleRemoveButtons.length > 0) {
      await staleRemoveButtons[0].click();
      staleRemoveButtons = await $$('[data-test^="remove-"]');
    }

    await browser.waitUntil(async () => (await $$('[data-test^="add-to-cart-"]')).length === 6, {
      timeout: 5000,
      timeoutMsg: 'Not all 6 products show "Add to cart" even after sweeping stale Remove buttons',
    });
  }
}

export default new CartPage();
