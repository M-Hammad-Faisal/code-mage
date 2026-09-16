/**
 * CartPage — shared Page Object for the SauceDemo /cart.html screen.
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 5, Page Object Model)
 */

class CartPage {
  get cartItems() {
    return cy.get('.cart_item');
  }

  get itemNames() {
    return cy.get('.inventory_item_name');
  }

  get checkoutButton() {
    return cy.get('[data-test="checkout"]');
  }

  get continueShoppingButton() {
    return cy.get('[data-test="continue-shopping"]');
  }

  removeItem(productName: string) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    cy.get(`[data-test="remove-${slug}"]`).click();
    return this;
  }

  getItemNames() {
    return this.itemNames;
  }

  proceedToCheckout() {
    this.checkoutButton.click();
    return this;
  }

  continueShopping() {
    this.continueShoppingButton.click();
    return this;
  }
}

export const cartPage = new CartPage();
