/**
 * CheckoutPage — shared Page Object for the SauceDemo checkout flow:
 * /checkout-step-one.html -> /checkout-step-two.html -> /checkout-complete.html
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 5, Page Object Model)
 */

class CheckoutPage {
  // ── Step One: shipping info ───────────────────────────────────────────────

  get firstNameInput() {
    return cy.get('[data-test="firstName"]');
  }

  get lastNameInput() {
    return cy.get('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return cy.get('[data-test="postalCode"]');
  }

  get continueButton() {
    return cy.get('[data-test="continue"]');
  }

  get cancelButton() {
    return cy.get('[data-test="cancel"]');
  }

  get errorMessage() {
    return cy.get('[data-test="error"]');
  }

  fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    // cy.type() rejects an empty string — skip fields left blank so tests
    // can exercise the "X is required" validation errors.
    if (firstName) this.firstNameInput.type(firstName);
    if (lastName) this.lastNameInput.type(lastName);
    if (postalCode) this.postalCodeInput.type(postalCode);
    return this;
  }

  continue() {
    this.continueButton.click();
    return this;
  }

  // ── Step Two: order overview ──────────────────────────────────────────────

  get overviewItems() {
    return cy.get('.cart_item');
  }

  get subtotalLabel() {
    return cy.get('[data-test="subtotal-label"]');
  }

  get taxLabel() {
    return cy.get('[data-test="tax-label"]');
  }

  get totalLabel() {
    return cy.get('[data-test="total-label"]');
  }

  get finishButton() {
    return cy.get('[data-test="finish"]');
  }

  finish() {
    this.finishButton.click();
    return this;
  }

  // ── Step Three: complete ──────────────────────────────────────────────────

  get completeHeader() {
    return cy.get('[data-test="complete-header"]');
  }

  get completeText() {
    return cy.get('[data-test="complete-text"]');
  }

  get backHomeButton() {
    return cy.get('[data-test="back-to-products"]');
  }

  backToProducts() {
    this.backHomeButton.click();
    return this;
  }
}

export const checkoutPage = new CheckoutPage();
