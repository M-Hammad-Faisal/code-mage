/**
 * CartPage — Page Object Model
 * From ch05-page-object-model.mdx, extracted into its own file so
 * tests/cart.spec.ts and tests/checkout.spec.ts can share it.
 */

import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
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

  async removeItem(productName: string) {
    await this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async expectCartItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
