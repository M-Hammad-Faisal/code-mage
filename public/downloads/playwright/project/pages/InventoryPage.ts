/**
 * InventoryPage — Page Object Model
 * From ch05-page-object-model.mdx, extracted into its own file so
 * tests/cart.spec.ts, selectors.spec.ts, and others can share it.
 */

import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    // SauceDemo's "Products" title is a <span data-test="title">, not a
    // native heading element, so getByRole('heading', ...) would not find
    // it — the data-test attribute is the stable selector here.
    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addToCart(productName: string) {
    // SauceDemo's product cards are plain <div class="inventory_item">
    // elements with no ARIA list/listitem role, so the container is
    // reached via its class rather than getByRole('listitem').
    await this.inventoryItems
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeFromCart(productName: string) {
    await this.inventoryItems
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async expectOnPage() {
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.pageTitle).toBeVisible();
  }
}
