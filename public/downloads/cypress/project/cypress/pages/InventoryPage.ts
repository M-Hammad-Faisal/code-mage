/**
 * InventoryPage — shared Page Object for the SauceDemo /inventory.html screen.
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 5, Page Object Model)
 */

class InventoryPage {
  get pageTitle() {
    return cy.get('[data-test="title"]');
  }

  get inventoryItems() {
    return cy.get('.inventory_item');
  }

  get inventoryItemNames() {
    return cy.get('.inventory_item_name');
  }

  get cartBadge() {
    return cy.get('[data-test="shopping-cart-badge"]');
  }

  get cartLink() {
    return cy.get('[data-test="shopping-cart-link"]');
  }

  get sortDropdown() {
    // Note: SauceDemo's data-test attribute is hyphenated (product-sort-container)
    // even though its CSS class is still the underscored product_sort_container.
    return cy.get('[data-test="product-sort-container"]');
  }

  get menuButton() {
    return cy.get('#react-burger-menu-btn');
  }

  get logoutLink() {
    return cy.get('#logout_sidebar_link');
  }

  visit() {
    // GitHub Pages serves /inventory.html through a client-side SPA
    // redirect trick (a real 404 status on the initial response, then a
    // script bounces through / and pushes the route back). Cypress fails
    // cy.visit() on a non-2xx status by default, so failOnStatusCode: false
    // lets the redirect finish instead of erroring out immediately.
    cy.visit('/inventory.html', { failOnStatusCode: false });
    return this;
  }

  addToCartByName(productName: string) {
    // Convert product name to the data-test format SauceDemo uses,
    // e.g. "Sauce Labs Backpack" -> "sauce-labs-backpack"
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    cy.get(`[data-test="add-to-cart-${slug}"]`).click();
    return this;
  }

  removeFromCartByName(productName: string) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    cy.get(`[data-test="remove-${slug}"]`).click();
    return this;
  }

  sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    this.sortDropdown.select(option);
    return this;
  }

  goToCart() {
    this.cartLink.click();
    return this;
  }

  logout() {
    this.menuButton.click();
    this.logoutLink.click();
    return this;
  }
}

export const inventoryPage = new InventoryPage();
