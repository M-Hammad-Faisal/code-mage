/**
 * LoginPage — shared Page Object for the SauceDemo login screen.
 * Tutorial: code-mage.dev/tutorial/cypress (chapter 5, Page Object Model)
 *
 * Plain ES6 class with getters that call cy.get() fresh every access —
 * never store the result of cy.get() in a variable (see chapter 5's
 * "Critical Mistake" section).
 */

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
    // cy.type() rejects an empty string, so only type when there's
    // something to type — this lets tests exercise the "required field"
    // validation errors by passing '' for username/password.
    if (username) this.usernameInput.type(username);
    if (password) this.passwordInput.type(password);
    this.loginButton.click();
    return this;
  }

  expectErrorContaining(text: string) {
    this.errorMessage.should('be.visible').and('contain.text', text);
    return this;
  }
}

export const loginPage = new LoginPage();
