/**
 * Login Test Suite — SauceDemo
 * Corresponds to: ch02-installation-setup.mdx, ch05-page-object-model.mdx
 * Demonstrates: LoginPage POM (imported, not inlined), happy path, and all
 * SauceDemo error states — locked_out_user, wrong password, empty fields.
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
} as const;

test.describe('Login', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  // ── Happy Path ─────────────────────────────────────────────────────────────

  test('standard user can log in successfully', async () => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectOnPage();
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('problem user can still log in (UI bugs come later, not at login)', async () => {
    await loginPage.login(USERS.problem.username, USERS.problem.password);
    await inventoryPage.expectOnPage();
  });

  test('performance glitch user eventually logs in', async ({ page }) => {
    await loginPage.login(USERS.performanceGlitch.username, USERS.performanceGlitch.password);
    await expect(page).toHaveURL('/inventory.html', { timeout: 10_000 });
  });

  // ── Error States ───────────────────────────────────────────────────────────

  test('locked out user sees error message', async () => {
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    await loginPage.expectErrorMessage('Sorry, this user has been locked out');
  });

  test('wrong password shows error', async () => {
    await loginPage.login(USERS.standard.username, 'wrong_password');
    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('wrong username shows error', async () => {
    await loginPage.login('not_a_real_user', USERS.standard.password);
    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('empty username shows required error', async () => {
    await loginPage.login('', USERS.standard.password);
    await loginPage.expectErrorMessage('Username is required');
  });

  test('empty password shows required error', async () => {
    await loginPage.login(USERS.standard.username, '');
    await loginPage.expectErrorMessage('Password is required');
  });

  test('both fields empty shows username required first', async () => {
    await loginPage.login('', '');
    await loginPage.expectErrorMessage('Username is required');
  });

  test('error message can be dismissed', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.dismissError();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });
});
