import BasePage from './base.page';

/**
 * InventoryPage — SauceDemo products/inventory listing.
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 5, Page Object Model
 */
class InventoryPage extends BasePage {
  get pageTitle() {
    return $('.title');
  }

  get inventoryList() {
    return $('.inventory_list');
  }

  get sortDropdown() {
    return $('[data-test="product_sort_container"]');
  }

  get cartBadge() {
    return $('[data-test="shopping-cart-badge"]');
  }

  get cartLink() {
    return $('[data-test="shopping-cart-link"]');
  }

  get burgerMenu() {
    return $('#react-burger-menu-btn');
  }

  get allProducts() {
    return $$('.inventory_item');
  }

  get allProductNames() {
    return $$('.inventory_item_name');
  }

  get allProductPrices() {
    return $$('.inventory_item_price');
  }

  async open(): Promise<void> {
    await super.open('/inventory.html');
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectByAttribute('value', option);
  }

  async addToCart(productName: string): Promise<void> {
    const products = await this.allProducts;
    for (const product of products) {
      const name = await product.$('.inventory_item_name').getText();
      if (name === productName) {
        await product.$('[data-test^="add-to-cart"]').click();
        return;
      }
    }
    throw new Error(`Product not found: "${productName}"`);
  }

  async removeFromCart(productName: string): Promise<void> {
    const products = await this.allProducts;
    for (const product of products) {
      const name = await product.$('.inventory_item_name').getText();
      if (name === productName) {
        await product.$('[data-test^="remove"]').click();
        return;
      }
    }
    throw new Error(`Product not found: "${productName}"`);
  }

  async getProductNames(): Promise<string[]> {
    const nameEls = await this.allProductNames;
    const names: string[] = [];
    for (const el of nameEls) {
      names.push(await el.getText());
    }
    return names;
  }

  async getProductPrices(): Promise<number[]> {
    const priceEls = await this.allProductPrices;
    const prices: number[] = [];
    for (const el of priceEls) {
      prices.push(parseFloat((await el.getText()).replace('$', '')));
    }
    return prices;
  }

  async getItemCount(): Promise<number> {
    const products = await this.allProducts;
    return products.length;
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getCartCount(): Promise<number> {
    const badge = this.cartBadge;
    if (!(await badge.isDisplayed())) return 0;
    return parseInt(await badge.getText(), 10);
  }
}

export default new InventoryPage();
