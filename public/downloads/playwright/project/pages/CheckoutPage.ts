/**
 * CheckoutPage — Page Object Model
 * From ch05-page-object-model.mdx, extracted into its own file so
 * tests/checkout.spec.ts can share it. Covers checkout-step-one and
 * checkout-step-two (the confirmation heading lives on checkout-complete).
 */

import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationHeader: Locator;
  readonly errorMessage: Locator;
  readonly summaryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationHeader = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryItems = page.locator('.cart_item');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectItemInSummary(productName: string) {
    await expect(this.summaryItems.filter({ hasText: productName })).toBeVisible();
  }

  async expectOrderConfirmed() {
    await expect(this.page).toHaveURL('/checkout-complete.html');
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.page.getByText('Your order has been dispatched')).toBeVisible();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
