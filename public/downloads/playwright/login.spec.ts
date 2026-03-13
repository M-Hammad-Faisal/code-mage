/**
 * Login Test Suite — SauceDemo
 * Tutorial: code-mage.vercel.app/tutorial/playwright
 *
 * Prerequisites:
 *   npm init playwright@latest
 *   Set baseURL to https://www.saucedemo.com in playwright.config.ts
 *
 * Run: npx playwright test login.spec.ts
 */

import { test, expect } from '@playwright/test';
import { type Page, type Locator } from '@playwright/test';

// ---------------------------------------------------------------------------
// Page Object — LoginPage
// ---------------------------------------------------------------------------

class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectErrorContaining(text: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }
}

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

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ── Happy Path ─────────────────────────────────────────────────────────────

  test('standard user can log in successfully', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('performance glitch user eventually logs in', async ({ page }) => {
    await loginPage.login(USERS.performanceGlitch.username, USERS.performanceGlitch.password);
    await expect(page).toHaveURL('/inventory.html', { timeout: 10_000 });
  });

  // ── Error States ───────────────────────────────────────────────────────────

  test('locked out user sees error message', async () => {
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    await loginPage.expectErrorContaining('Sorry, this user has been locked out');
  });

  test('wrong password shows error', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.expectErrorContaining('Username and password do not match');
  });

  test('wrong username shows error', async () => {
    await loginPage.login('not_a_user', 'secret_sauce');
    await loginPage.expectErrorContaining('Username and password do not match');
  });

  test('empty username shows required error', async () => {
    await loginPage.login('', 'secret_sauce');
    await loginPage.expectErrorContaining('Username is required');
  });

  test('empty password shows required error', async () => {
    await loginPage.login('standard_user', '');
    await loginPage.expectErrorContaining('Password is required');
  });

  test('both fields empty shows username required first', async () => {
    await loginPage.login('', '');
    await loginPage.expectErrorContaining('Username is required');
  });

  // ── UI State ───────────────────────────────────────────────────────────────

  test('login form is visible on page load', async () => {
    await expect.soft(loginPage.usernameInput).toBeVisible();
    await expect.soft(loginPage.passwordInput).toBeVisible();
    await expect.soft(loginPage.loginButton).toBeVisible();
  });

  test('error message can be dismissed', async ({ page }) => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();
    await page.locator('[data-test="error-button"]').click();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });
});
