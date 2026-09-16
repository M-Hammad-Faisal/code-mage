/**
 * Selectors & Commands — SauceDemo
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 3, Selectors & Commands)
 *
 * Demonstrates: data-test attribute selectors (priority #1), cy.contains(),
 * chaining/traversal, within(), aliases, and why brittle selectors
 * (id, deep CSS class chains, XPath) should be avoided.
 */

describe('Selectors & Commands', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });

  it('finds elements with data-test attributes — the preferred selector', () => {
    // data-test is priority #1: stable across CSS/markup refactors
    cy.get('[data-test="title"]').should('have.text', 'Products');
    cy.get('[data-test="shopping-cart-link"]').should('be.visible');
  });

  it('uses cy.contains() to find elements by visible text', () => {
    // Find any element containing this text
    cy.contains('Products').should('be.visible');

    // Find a specific element type containing this text — more precise
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible');

    // Scoped within a parent — avoids matching the same text elsewhere on the page
    cy.get('.inventory_item').first().contains('Add to cart').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
  });

  it('scopes queries to a single item with within()', () => {
    // within() is essential when the same selector (e.g. ".inventory_item_name")
    // appears once per product — it prevents cross-item false matches.
    cy.get('.inventory_item')
      .first()
      .within(() => {
        cy.get('.inventory_item_name').should('be.visible');
        cy.get('[data-test^="add-to-cart"]').click();
      });

    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
  });

  it('traverses the DOM with first/last/eq/find/parent', () => {
    cy.get('.inventory_item').first().should('be.visible');
    cy.get('.inventory_item').last().should('be.visible');
    cy.get('.inventory_item').eq(2).should('be.visible'); // 0-based index

    cy.get('.inventory_item').first().find('.inventory_item_name').should('exist');
    cy.get('[data-test="shopping-cart-link"]').parent().should('exist');
  });

  it('reuses a query with an alias instead of repeating cy.get()', () => {
    cy.get('.inventory_item').as('products');

    cy.get('@products').should('have.length', 6);
    cy.get('@products').first().find('.inventory_item_name').should('be.visible');
  });

  it('sorts products using the select dropdown', () => {
    cy.get('[data-test="product-sort-container"]').select('lohi');

    cy.get('.inventory_item_price')
      .first()
      .invoke('text')
      .then((firstPrice) => {
        const price = parseFloat(firstPrice.replace('$', ''));
        // Lowest price first after sorting low to high
        expect(price).to.be.lessThan(50);
      });
  });

  it('avoids brittle selectors — prefers data-test over CSS class chains', () => {
    // Fragile: relies on exact class names and DOM nesting, breaks on any
    // markup refactor. Shown here only to contrast with the stable version below.
    // cy.get('.inventory_list > .inventory_item:nth-child(1) > .inventory_item_name')

    // Stable: survives markup and styling changes
    cy.get('[data-test="item-4-title-link"]').should('exist');
  });
});
