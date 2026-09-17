/**
 * Backs ch08-tabs-windows-multi-origin.mdx and ch09-file-downloads.mdx.
 *
 * Cypress can't drive a second tab, so the "tabs" test here checks what
 * Cypress actually can check for a target="_blank" link: its href and
 * target attributes. The download test is a real download, verified
 * against the live site — see docs/research/saucedemo-site-map.md in the
 * main repo for how these were confirmed.
 */

import { loginPage } from '../pages/LoginPage';
import { inventoryPage } from '../pages/InventoryPage';
import { cartPage } from '../pages/CartPage';
import { checkoutPage } from '../pages/CheckoutPage';

describe('Tabs (what Cypress can actually verify)', () => {
  it('the X (Twitter) footer link has the correct href and target', () => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');

    cy.get('[data-test="social-x"]')
      .should('have.attr', 'href', 'https://x.com/saucelabs')
      .and('have.attr', 'target', '_blank');
  });
});

describe('File downloads', () => {
  before(() => {
    cy.task('clearDownloads');
  });

  it('downloads the order confirmation PDF', () => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');
    inventoryPage.addToCartByName('Sauce Labs Backpack');
    inventoryPage.goToCart();
    cartPage.proceedToCheckout();
    checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    checkoutPage.continue();
    checkoutPage.finish();

    checkoutPage.completeHeader.should('have.text', 'Thank you for your order!');

    cy.get('[data-test="generate-pdf-order"]').click();

    // The filename is timestamped (swag-labs-order-<timestamp>.pdf), so we
    // find it by prefix via a task instead of asserting an exact name. The
    // download isn't instant — a fixed 1s wait was flaky in practice (the
    // PDF sometimes takes longer to land), so this polls with retries
    // instead of trusting one fixed delay.
    function findDownloadWithRetry(attemptsLeft: number): Cypress.Chainable<string> {
      return cy.task('findDownload', 'swag-labs-order-').then((filename) => {
        if (filename) return cy.wrap(filename as string);
        if (attemptsLeft <= 0) {
          throw new Error(
            'a PDF matching swag-labs-order-* never appeared within the retry window'
          );
        }
        cy.wait(500);
        return findDownloadWithRetry(attemptsLeft - 1);
      });
    }

    findDownloadWithRetry(10).then((filename) => {
      cy.readFile(`cypress/downloads/${filename}`, 'binary', { timeout: 10000 }).then(
        (contents) => {
          expect(contents.length).to.be.greaterThan(100);
        }
      );
    });
  });
});
