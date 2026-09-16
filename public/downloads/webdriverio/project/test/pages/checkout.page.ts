import BasePage from './base.page';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * CheckoutPage — SauceDemo checkout flow (steps one, two, and confirmation).
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 5, Page Object Model
 */
class CheckoutPage extends BasePage {
  // Step one — shipping information
  get firstNameInput() {
    return $('[data-test="firstName"]');
  }

  get lastNameInput() {
    return $('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return $('[data-test="postalCode"]');
  }

  get continueButton() {
    return $('[data-test="continue"]');
  }

  get cancelButton() {
    return $('[data-test="cancel"]');
  }

  get errorMessage() {
    return $('[data-test="error"]');
  }

  // Step two — order overview
  get summaryTotal() {
    return $('.summary_total_label');
  }

  get summarySubtotal() {
    return $('.summary_subtotal_label');
  }

  get finishButton() {
    return $('[data-test="finish"]');
  }

  // Confirmation
  get confirmationHeader() {
    return $('.complete-header');
  }

  get confirmationText() {
    return $('.complete-text');
  }

  get backHomeButton() {
    return $('[data-test="back-to-products"]');
  }

  async fillShippingInfo(info: ShippingInfo): Promise<void> {
    await this.firstNameInput.setValue(info.firstName);
    await this.lastNameInput.setValue(info.lastName);
    await this.postalCodeInput.setValue(info.postalCode);
    await this.continueButton.click();
  }

  async getSummaryTotal(): Promise<number> {
    const text = await this.summaryTotal.getText();
    const match = text.match(/\$(\d+\.\d{2})/);
    if (!match) throw new Error(`Could not parse total from: "${text}"`);
    return parseFloat(match[1]);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async getConfirmationMessage(): Promise<string> {
    await this.confirmationHeader.waitForDisplayed();
    return this.confirmationHeader.getText();
  }
}

export default new CheckoutPage();
