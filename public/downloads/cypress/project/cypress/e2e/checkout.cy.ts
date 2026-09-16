/**
 * Checkout Test Suite — SauceDemo
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 5, Page Object Model)
 *
 * Full checkout flow using the shared CheckoutPage page object:
 * happy path (shipping info -> overview -> finish) plus validation errors.
 */

import { loginPage } from '../pages/LoginPage';
import { inventoryPage } from '../pages/InventoryPage';
import { cartPage } from '../pages/CartPage';
import { checkoutPage } from '../pages/CheckoutPage';

describe('Checkout', () => {
  beforeEach(() => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');
    inventoryPage.addToCartByName('sauce-labs-backpack');
    inventoryPage.goToCart();
    cartPage.proceedToCheckout();
    cy.url().should('include', '/checkout-step-one.html');
  });

  it('completes the full purchase flow', () => {
    checkoutPage.fillShippingInfo('Ada', 'Lovelace', '12345');
    checkoutPage.continue();

    cy.url().should('include', '/checkout-step-two.html');
    checkoutPage.overviewItems.should('have.length', 1);
    checkoutPage.totalLabel.should('be.visible');

    checkoutPage.finish();

    cy.url().should('include', '/checkout-complete.html');
    checkoutPage.completeHeader.should('have.text', 'Thank you for your order!');
  });

  it('returns to the products page after order completion', () => {
    checkoutPage.fillShippingInfo('Ada', 'Lovelace', '12345');
    checkoutPage.continue();
    checkoutPage.finish();

    checkoutPage.backToProducts();
    cy.url().should('include', '/inventory.html');
  });

  it('shows an error when first name is missing', () => {
    checkoutPage.fillShippingInfo('', 'Lovelace', '12345');
    checkoutPage.continue();

    cy.url().should('include', '/checkout-step-one.html');
    checkoutPage.errorMessage.should('be.visible').and('contain.text', 'First Name is required');
  });

  it('shows an error when last name is missing', () => {
    checkoutPage.fillShippingInfo('Ada', '', '12345');
    checkoutPage.continue();

    checkoutPage.errorMessage.should('be.visible').and('contain.text', 'Last Name is required');
  });

  it('shows an error when postal code is missing', () => {
    checkoutPage.fillShippingInfo('Ada', 'Lovelace', '');
    checkoutPage.continue();

    checkoutPage.errorMessage.should('be.visible').and('contain.text', 'Postal Code is required');
  });

  it('calculates tax and total correctly on the overview step', () => {
    checkoutPage.fillShippingInfo('Ada', 'Lovelace', '12345');
    checkoutPage.continue();

    cy.get('[data-test="subtotal-label"]')
      .invoke('text')
      .then((subtotalText) => {
        const subtotal = parseFloat(subtotalText.replace('Item total: $', ''));

        cy.get('[data-test="tax-label"]')
          .invoke('text')
          .then((taxText) => {
            const tax = parseFloat(taxText.replace('Tax: $', ''));

            cy.get('[data-test="total-label"]')
              .invoke('text')
              .then((totalText) => {
                const total = parseFloat(totalText.replace('Total: $', ''));
                // Allow a small rounding tolerance
                expect(total).to.be.closeTo(subtotal + tax, 0.02);
              });
          });
      });
  });

  it('can cancel out of checkout back to the cart', () => {
    checkoutPage.cancelButton.click();
    cy.url().should('include', '/cart.html');
  });
});
