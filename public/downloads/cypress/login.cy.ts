/**
 * Login Test Suite — SauceDemo
 * Tutorial: code-mage.dev/tutorial/cypress
 *
 * Prerequisites:
 *   npm install --save-dev cypress
 *   Set baseUrl to https://www.saucedemo.com in cypress.config.ts
 *
 * Run: npx cypress run --spec cypress/e2e/login.cy.ts
 */

// ---------------------------------------------------------------------------
// Page Object — LoginPage
// ---------------------------------------------------------------------------

class LoginPage {
  get usernameInput() {
    return cy.get('[data-test="username"]');
  }

  get passwordInput() {
    return cy.get('[data-test="password"]');
  }

  get loginButton() {
    return cy.get('[data-test="login-button"]');
  }

  get errorMessage() {
    return cy.get('[data-test="error"]');
  }

  get errorCloseButton() {
    return cy.get('[data-test="error-button"]');
  }

  visit() {
    cy.visit('/');
    return this;
  }

  login(username: string, password: string) {
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.loginButton.click();
    return this;
  }

  expectErrorContaining(text: string) {
    this.errorMessage.should('be.visible').and('contain.text', text);
    return this;
  }
}

const loginPage = new LoginPage();

// ---------------------------------------------------------------------------
// Test Data
// ---------------------------------------------------------------------------

const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
} as const;

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Login', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  // ── Happy Path ─────────────────────────────────────────────────────────────

  it('standard user can log in successfully', () => {
    loginPage.login(USERS.standard.username, USERS.standard.password);

    cy.url().should('include', '/inventory.html');
    cy.contains('.title', 'Products').should('be.visible');
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('performance glitch user eventually logs in', () => {
    loginPage.login(USERS.performanceGlitch.username, USERS.performanceGlitch.password);
    cy.url({ timeout: 10_000 }).should('include', '/inventory.html');
  });

  // ── Error States ───────────────────────────────────────────────────────────

  it('locked out user sees error message', () => {
    loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    loginPage.expectErrorContaining('Sorry, this user has been locked out');
  });

  it('wrong password shows error', () => {
    loginPage.login('standard_user', 'wrong_password');
    loginPage.expectErrorContaining('Username and password do not match');
  });

  it('wrong username shows error', () => {
    loginPage.login('not_a_user', 'secret_sauce');
    loginPage.expectErrorContaining('Username and password do not match');
  });

  it('empty username shows required error', () => {
    loginPage.login('', 'secret_sauce');
    loginPage.expectErrorContaining('Username is required');
  });

  it('empty password shows required error', () => {
    loginPage.login('standard_user', '');
    loginPage.expectErrorContaining('Password is required');
  });

  it('both fields empty shows username required first', () => {
    loginPage.login('', '');
    loginPage.expectErrorContaining('Username is required');
  });

  // ── UI State ───────────────────────────────────────────────────────────────

  it('login form is visible on page load', () => {
    loginPage.usernameInput.should('be.visible');
    loginPage.passwordInput.should('be.visible');
    loginPage.loginButton.should('be.visible');
  });

  it('error message can be dismissed', () => {
    loginPage.login('', '');
    loginPage.errorMessage.should('be.visible');
    loginPage.errorCloseButton.click();
    loginPage.errorMessage.should('not.exist');
  });
});
