import BasePage from './base.page';

/**
 * LoginPage — SauceDemo login form.
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 5, Page Object Model
 */
class LoginPage extends BasePage {
  // Locators as getters — evaluated fresh each time, lazy until accessed
  get usernameInput() {
    return $('[data-test="username"]');
  }

  get passwordInput() {
    return $('[data-test="password"]');
  }

  get loginButton() {
    return $('[data-test="login-button"]');
  }

  get errorMessage() {
    return $('[data-test="error"]');
  }

  get errorCloseButton() {
    return $('[data-test="error-button"]');
  }

  async open(): Promise<void> {
    await super.open('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async getErrorText(): Promise<string> {
    await this.errorMessage.waitForDisplayed();
    return this.errorMessage.getText();
  }

  async dismissError(): Promise<void> {
    await this.errorCloseButton.click();
    await this.errorMessage.waitForDisplayed({ reverse: true });
  }

  async expectErrorContaining(text: string): Promise<void> {
    await expect(this.errorMessage).toBeDisplayed();
    await expect(this.errorMessage).toHaveText(expect.stringContaining(text));
  }
}

// Export a singleton — no need to instantiate in every test
export default new LoginPage();
