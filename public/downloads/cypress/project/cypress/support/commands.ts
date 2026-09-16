/**
 * Custom Cypress commands.
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 6, Network Requests & Advanced Interactions)
 */

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace Cypress {
    interface Chainable {
      /** Logs in via the UI and waits for the inventory page to load. */
      login(username: string, password: string): Chainable<void>;
      /** Logs in once per unique (username, password) pair and caches the session. */
      loginWithSession(username: string, password: string): Chainable<void>;
      /** Adds a product to the cart by its data-test slug, e.g. "sauce-labs-backpack". */
      addToCart(productSlug: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
  cy.url().should('include', '/inventory');
});

Cypress.Commands.add('loginWithSession', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory');
  });
});

Cypress.Commands.add('addToCart', (productSlug: string) => {
  cy.get(`[data-test="add-to-cart-${productSlug}"]`).click();
});

export {};
