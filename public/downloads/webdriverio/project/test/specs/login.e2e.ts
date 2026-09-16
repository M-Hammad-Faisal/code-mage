/**
 * Login Test Suite — SauceDemo
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 5, Page Object Model
 *
 * Full login suite: happy path + every error state. Uses the shared
 * LoginPage object from test/pages/login.page.ts instead of an inline
 * page object class — selectors live in one place.
 *
 * Run: npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
 */

import loginPage from '../pages/login.page';

const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
} as const;

describe('Login', () => {
  beforeEach(async () => {
    await loginPage.open();
  });

  // ── Happy Path ─────────────────────────────────────────────────────────

  it('standard user can log in successfully', async () => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'));
    await expect($('.title')).toHaveText('Products');
    await expect($$('.inventory_item')).toBeElementsArrayOfSize(6);
  });

  it('problem user can still log in (known UI bugs downstream)', async () => {
    await loginPage.login(USERS.problem.username, USERS.problem.password);

    await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'));
  });

  it('performance glitch user eventually logs in', async () => {
    await loginPage.login(USERS.performanceGlitch.username, USERS.performanceGlitch.password);

    await browser.waitUntil(async () => (await browser.getUrl()).includes('/inventory.html'), {
      timeout: 10_000,
      timeoutMsg: 'Expected to reach /inventory.html within 10s',
    });
  });

  // ── Error States ───────────────────────────────────────────────────────

  it('locked out user sees error message', async () => {
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    await loginPage.expectErrorContaining('Sorry, this user has been locked out');
  });

  it('wrong password shows error', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.expectErrorContaining('Username and password do not match');
  });

  it('wrong username shows error', async () => {
    await loginPage.login('not_a_user', 'secret_sauce');
    await loginPage.expectErrorContaining('Username and password do not match');
  });

  it('empty username shows required error', async () => {
    await loginPage.login('', 'secret_sauce');
    await loginPage.expectErrorContaining('Username is required');
  });

  it('empty password shows required error', async () => {
    await loginPage.login('standard_user', '');
    await loginPage.expectErrorContaining('Password is required');
  });

  it('both fields empty shows username required first', async () => {
    await loginPage.login('', '');
    await loginPage.expectErrorContaining('Username is required');
  });

  // ── UI State ───────────────────────────────────────────────────────────

  it('login form is visible on page load', async () => {
    await expect(loginPage.usernameInput).toBeDisplayed();
    await expect(loginPage.passwordInput).toBeDisplayed();
    await expect(loginPage.loginButton).toBeDisplayed();
  });

  it('error message can be dismissed', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeDisplayed();
    await loginPage.dismissError();
    await expect(loginPage.errorMessage).not.toBeDisplayed();
  });
});
