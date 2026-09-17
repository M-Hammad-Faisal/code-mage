/**
 * Tabs & Downloads Test Suite — SauceDemo
 * Tutorial: code-mage.dev/tutorial/cypress
 *
 * Cypress can't drive a second tab (see the tutorial's Tabs, Windows &
 * Multi-Origin chapter for why) — the first test here checks what Cypress
 * actually can check for a target="_blank" link: its href and target
 * attributes. The download test is a real download against SauceDemo's
 * order confirmation PDF button.
 *
 * The download test needs one thing added to your cypress.config.ts before
 * it'll run — SauceDemo's PDF filename is timestamped, so there's no fixed
 * name to assert against. Add this task to setupNodeEvents:
 *
 *   import fs from 'fs';
 *   import path from 'path';
 *
 *   setupNodeEvents(on, config) {
 *     on('task', {
 *       findDownload(prefix: string) {
 *         const dir = path.join(config.projectRoot, 'cypress', 'downloads');
 *         if (!fs.existsSync(dir)) return null;
 *         const matches = fs.readdirSync(dir)
 *           .filter((f) => f.startsWith(prefix))
 *           .map((f) => ({ name: f, mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
 *           .sort((a, b) => b.mtime - a.mtime);
 *         return matches.length > 0 ? matches[0].name : null;
 *       },
 *       clearDownloads() {
 *         const dir = path.join(config.projectRoot, 'cypress', 'downloads');
 *         if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
 *         return null;
 *       },
 *     });
 *     return config;
 *   },
 *
 * Prerequisites:
 *   npm install --save-dev cypress
 *   Set baseUrl to https://www.saucedemo.com in cypress.config.ts
 *
 * Run: npx cypress run --spec cypress/e2e/tabs-and-downloads.cy.ts
 */

function login() {
  cy.visit('/');
  cy.get('[data-test="username"]').type('standard_user');
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
}

describe('Tabs (what Cypress can actually verify)', () => {
  it('the X (Twitter) footer link has the correct href and target', () => {
    login();

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
    login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');

    cy.get('[data-test="generate-pdf-order"]').click();

    // The filename is timestamped (swag-labs-order-<timestamp>.pdf), so we
    // find it by prefix via the task instead of asserting an exact name.
    cy.wait(1000); // give the download a moment to land on disk
    cy.task('findDownload', 'swag-labs-order-').then((filename) => {
      expect(filename, 'a PDF matching swag-labs-order-* should exist').to.be.a('string');
      cy.readFile(`cypress/downloads/${filename}`, 'binary', { timeout: 10000 }).then(
        (contents) => {
          expect(contents.length).to.be.greaterThan(100);
        }
      );
    });
  });
});
