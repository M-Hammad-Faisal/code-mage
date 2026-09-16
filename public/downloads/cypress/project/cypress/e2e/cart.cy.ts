/**
 * Shopping Cart Test Suite — SauceDemo
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 5, Page Object Model)
 *
 * Uses the shared InventoryPage and CartPage page objects.
 */

import { loginPage } from '../pages/LoginPage';
import { inventoryPage } from '../pages/InventoryPage';
import { cartPage } from '../pages/CartPage';

describe('Shopping Cart', () => {
  beforeEach(() => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory');
  });

  it('adds a product and verifies it in the cart', () => {
    inventoryPage.addToCartByName('sauce-labs-backpack');
    inventoryPage.cartBadge.should('have.text', '1');
    inventoryPage.goToCart();

    cy.url().should('include', '/cart');
    cartPage.cartItems.should('have.length', 1);
    cartPage.getItemNames().should('contain.text', 'Sauce Labs Backpack');
  });

  it('adds multiple products and verifies the cart badge count', () => {
    inventoryPage.addToCartByName('sauce-labs-backpack');
    inventoryPage.addToCartByName('sauce-labs-bike-light');
    inventoryPage.addToCartByName('sauce-labs-bolt-t-shirt');

    inventoryPage.cartBadge.should('have.text', '3');
    inventoryPage.goToCart();

    cartPage.cartItems.should('have.length', 3);
  });

  it('removes a product from the cart page', () => {
    inventoryPage.addToCartByName('sauce-labs-backpack');
    inventoryPage.goToCart();

    cartPage.removeItem('sauce-labs-backpack');
    cartPage.cartItems.should('not.exist');
  });

  it('removes a product directly from the inventory page', () => {
    inventoryPage.addToCartByName('sauce-labs-backpack');
    inventoryPage.cartBadge.should('have.text', '1');

    inventoryPage.removeFromCartByName('sauce-labs-backpack');
    inventoryPage.cartBadge.should('not.exist');
  });

  it('continue shopping returns to the inventory page', () => {
    inventoryPage.addToCartByName('sauce-labs-backpack');
    inventoryPage.goToCart();

    cy.url().should('include', '/cart');
    cartPage.continueShopping();
    cy.url().should('include', '/inventory');
  });

  it('cart persists across sort changes', () => {
    inventoryPage.addToCartByName('sauce-labs-backpack');
    inventoryPage.sortBy('hilo');

    inventoryPage.cartBadge.should('have.text', '1');
  });
});
