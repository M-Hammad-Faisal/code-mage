/**
 * Flaky Tests & Stability Patterns — SauceDemo
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 7, Flaky Tests & Stability Patterns)
 *
 * Demonstrates: retries config (see cypress.config.ts), avoiding cy.wait(ms)
 * in favor of condition-based retryable assertions, asserting on navigation
 * before asserting on the destination page, and test isolation with beforeEach.
 */

import { loginPage } from '../pages/LoginPage';
import { inventoryPage } from '../pages/InventoryPage';

describe('Flaky Tests & Stability Patterns', () => {
  beforeEach(() => {
    // Each test sets up its own state — no test depends on another having run.
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory');
  });

  it('waits for the actual condition instead of a fixed cy.wait(ms)', () => {
    // BAD (do not do this):
    //   cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    //   cy.wait(2000)
    //   cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')

    // GOOD — Cypress retries the assertion itself until it passes or
    // defaultCommandTimeout (8000ms in cypress.config.ts) is reached.
    inventoryPage.addToCartByName('sauce-labs-backpack');
    inventoryPage.cartBadge.should('have.text', '1');
  });

  it('asserts on navigation before asserting on the destination page', () => {
    inventoryPage.addToCartByName('sauce-labs-backpack');

    inventoryPage.goToCart();

    // Assert on the URL first — this is itself a retryable assertion that
    // waits for navigation to complete, preventing a race against the DOM
    // of the page we just left.
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 1);
  });

  it('scopes selectors with within() to avoid ambiguous matches', () => {
    cy.get('.inventory_item')
      .first()
      .within(() => {
        cy.get('.inventory_item_name').should('not.be.empty');
        cy.get('[data-test^="add-to-cart"]').should('be.visible').click();
      });

    inventoryPage.cartBadge.should('have.text', '1');
  });

  it('prefers data-test selectors over ambiguous cy.contains() text matches', () => {
    // Fragile — would also match this same text in a banner or tooltip
    // if SauceDemo ever added one:
    //   cy.contains('Sauce Labs Backpack').click()

    // Precise — scoped to a specific element type + text
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible');

    // Most precise — data-test attribute, independent of copy changes
    cy.get('[data-test="item-4-title-link"]').should('be.visible');
  });

  it('retries automatically on the assertion, not the click', () => {
    // The click on `.click()` happens once. It's the *assertion* after it
    // that Cypress polls — so write the assertion for the state you
    // actually expect, and let the retry mechanism do the waiting.
    inventoryPage.sortBy('lohi');

    cy.get('.inventory_item_price')
      .first()
      .invoke('text')
      .should((priceText) => {
        const price = parseFloat(priceText.replace('$', ''));
        expect(price).to.be.lessThan(50);
      });
  });

  it('is resilient to CI retries because state is set up fresh every time', () => {
    // With retries.runMode: 2 in cypress.config.ts, this whole test body
    // re-runs from beforeEach on failure — safe because beforeEach performs
    // a full fresh login and no state leaks in from a previous attempt.
    inventoryPage.addToCartByName('sauce-labs-backpack');
    inventoryPage.addToCartByName('sauce-labs-bike-light');
    inventoryPage.cartBadge.should('have.text', '2');
  });
});
