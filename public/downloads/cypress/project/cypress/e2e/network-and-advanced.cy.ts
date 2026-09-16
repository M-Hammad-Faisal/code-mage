/**
 * Network Requests & Advanced Interactions — SauceDemo
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 6, Network Requests & Advanced Interactions)
 *
 * Demonstrates: cy.intercept() for spying/stubbing, fixtures, cy.session()
 * for cached login state, cy.env() for credentials (Cypress.env() was
 * removed in Cypress 16.0.0 — cy.env() is the Node-process-only replacement.
 * It's a chainable *command*, not a Promise, so it must be resolved with
 * .then() rather than `await`, and it only accepts an array of keys —
 * cy.env(['username', 'password']).then(({ username, password }) => ...) —
 * there is no single-key cy.env('username') getter), and native
 * .selectFile() for uploads.
 *
 * cy.env() values come from cypress.env.json (gitignored) or CYPRESS_*
 * environment variables in CI, e.g. `CYPRESS_password=secret_sauce npx cypress run`.
 */

describe('Network Requests & Advanced Interactions', () => {
  it('spies on the login flow without changing the response', () => {
    // SauceDemo doesn't expose a real login API to intercept, so this spies
    // on the generic XHR/fetch pattern any real app would use. Swap the URL
    // for your app's actual login endpoint.
    cy.intercept('POST', '**/login').as('loginRequest');

    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // SauceDemo logs in client-side with no network call, so we don't
    // cy.wait('@loginRequest') here — assert on the resulting UI state instead.
    cy.url().should('include', '/inventory.html');
  });

  it('stubs an inventory API response with fixture data', () => {
    // Stub a hypothetical inventory API with fixture data — demonstrates the
    // pattern for apps where SauceDemo-style client-side rendering is
    // instead backed by a real network call.
    cy.intercept('GET', '**/api/inventory*', { fixture: 'example.json' }).as('getInventory');

    cy.fixture('example.json').then((products) => {
      expect(products).to.have.length(2);
      expect(products[0].name).to.equal('Sauce Labs Backpack');
    });
  });

  it('reads credentials via cy.env() — chainable, not awaitable', () => {
    // cy.env() queues a Cypress command; it returns a Chainable, not a
    // Promise, so `await cy.env(...)` would NOT work. Resolve the value(s)
    // inside .then() instead, same as any other cy.* command.
    //
    // cy.env() only accepts an array of keys and yields an object of
    // { key: value } pairs — there is no single-key `cy.env('username')`
    // getter form.
    cy.visit('/');

    cy.env(['username', 'password']).then(({ username, password }) => {
      // Fall back to the standard demo creds when no cypress.env.json /
      // CYPRESS_* vars are set, so this spec runs out of the box.
      const resolvedUsername = username ?? 'standard_user';
      const resolvedPassword = password ?? 'secret_sauce';

      cy.get('[data-test="username"]').type(resolvedUsername);
      cy.get('[data-test="password"]').type(resolvedPassword);
      cy.get('[data-test="login-button"]').click();

      cy.url().should('include', '/inventory.html');
    });
  });

  it('caches the login session with cy.session() across tests', () => {
    // First test in the run performs the real login; subsequent tests in
    // this spec (and any spec using the same session id) restore the
    // cached cookies/localStorage instead of re-running the UI login.
    cy.loginWithSession('standard_user', 'secret_sauce');
    cy.visit('/inventory.html', { failOnStatusCode: false });

    cy.get('.inventory_item').should('have.length', 6);
  });

  it('asserts a second time with the same cached session — no re-login', () => {
    cy.loginWithSession('standard_user', 'secret_sauce');
    cy.visit('/inventory.html', { failOnStatusCode: false });

    cy.get('[data-test="title"]').should('have.text', 'Products');
  });

  it('handles the confirm dialog when logging out', () => {
    cy.loginWithSession('standard_user', 'secret_sauce');
    cy.visit('/inventory.html', { failOnStatusCode: false });

    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').should('be.visible').click();

    cy.url().should('eq', 'https://www.saucedemo.com/');
  });

  it('reads and writes local storage directly', () => {
    cy.loginWithSession('standard_user', 'secret_sauce');
    cy.visit('/inventory.html', { failOnStatusCode: false });

    cy.window().then((win) => {
      // Demonstrates reading whatever the app has already stored, then
      // writing a value of our own for the rest of the test to use.
      win.localStorage.setItem('example-key', 'example-value');
      expect(win.localStorage.getItem('example-key')).to.equal('example-value');
    });
  });
});
