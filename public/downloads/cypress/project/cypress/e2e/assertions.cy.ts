/**
 * Assertions & Matchers — SauceDemo
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 4, Assertions & Matchers)
 *
 * Demonstrates: should(), and() chaining, chai-jquery DOM assertions,
 * implicit vs. explicit subjects, expect() inside .then(), and cy.wrap().
 */

describe('Login Assertions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('verifies the login page structure', () => {
    // Title assertion
    cy.title().should('eq', 'Swag Labs');

    // URL is at root
    cy.url().should('include', 'saucedemo.com');

    // Chained assertions with .and() — reads better than repeated .should()
    cy.get('[data-test="username"]')
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled')
      .and('have.attr', 'placeholder', 'Username');

    cy.get('[data-test="password"]').should('be.visible').and('have.attr', 'type', 'password');

    cy.get('[data-test="login-button"]').should('be.visible').and('have.value', 'Login');
  });

  it('shows correct error for wrong credentials', () => {
    cy.get('[data-test="username"]').type('wrong_user');
    cy.get('[data-test="password"]').type('wrong_pass');
    cy.get('[data-test="login-button"]').click();

    // Negative assertion — URL should NOT have changed
    cy.url().should('not.include', '/inventory');

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match');

    // The error-message-container class lives on the wrapping <div>,
    // not on the [data-test="error"] element itself
    cy.get('[data-test="error"]').parent().should('have.class', 'error-message-container');
  });

  it('successfully logs in and lands on inventory', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory');
    cy.title().should('eq', 'Swag Labs');

    // Implicit assertion: cy.get() already asserts existence before this
    // .should('have.length', 6) checks the count explicitly
    cy.get('.inventory_item').should('have.length', 6);

    // Cart is empty — element genuinely doesn't exist yet
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });

  it('uses expect() inside .then() for non-element values', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // .should() operates on DOM subjects; for computed/derived values,
    // pull the value out with .then() and assert with Chai's expect()
    cy.get('.inventory_item_price')
      .first()
      .invoke('text')
      .then((priceText) => {
        const price = parseFloat(priceText.replace('$', ''));
        expect(price).to.be.greaterThan(0);
        expect(price).to.be.lessThan(100);
      });

    cy.get('.inventory_item').then(($items) => {
      expect($items).to.have.length(6);
      expect($items.first().text()).to.include('Sauce Labs');
    });
  });

  it('wraps a plain value to use the .should() API via cy.wrap()', () => {
    const cartCount = 3;
    cy.wrap(cartCount).should('equal', 3);

    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.get('.inventory_item_price')
      .first()
      .invoke('text')
      .then((text) => {
        cy.wrap(text).should('match', /^\$\d+\.\d{2}$/);
      });
  });

  it('asserts checkbox, attribute, and disabled/enabled state', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .should('be.visible')
      .and('not.be.disabled');

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Button text/attribute changes to "Remove" after adding to cart
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
  });
});
