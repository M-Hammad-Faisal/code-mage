/**
 * Flaky Tests & Retry Strategies
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 7, Flaky Tests
 *
 * Demonstrates the patterns chapter 7 teaches for eliminating flakiness:
 * Mocha-native this.retries(n) as a last resort, condition-based waitFor*
 * calls instead of fixed browser.pause() sleeps, gating actions on a
 * stable landmark before interacting, and browser.waitUntil() for custom
 * conditions.
 *
 * Run: npx wdio run wdio.conf.ts --spec test/specs/flaky-and-retry.e2e.ts
 */

describe('Flaky Tests and Retry Strategies', () => {
  beforeEach(async () => {
    await browser.url('/');
    await $('[data-test="username"]').setValue('standard_user');
    await $('[data-test="password"]').setValue('secret_sauce');
    await $('[data-test="login-button"]').click();
    await expect($('.inventory_list')).toBeDisplayed();
  });

  // Several tests below add items to the cart. SauceDemo never clears the
  // cart on its own, so reset via the app's own menu option between tests
  // rather than assuming a fresh cart — logging back in doesn't clear it,
  // and re-visiting /inventory.html directly 404s (see docs/research/saucedemo-site-map.md).
  afterEach(async () => {
    if (!(await $('#react-burger-menu-btn').isExisting())) return; // not logged in — nothing to reset
    await $('#react-burger-menu-btn').click();
    await $('[data-test="reset-sidebar-link"]').waitForClickable();
    await $('[data-test="reset-sidebar-link"]').click();
    await $('#react-burger-cross-btn').click();
    await browser.waitUntil(
      async () => !(await $('[data-test="shopping-cart-badge"]').isExisting()),
      { timeout: 5000, timeoutMsg: 'Cart badge still present after Reset App State' }
    );
  });

  it('logs in the performance_glitch_user with Mocha-native retries', async function () {
    // this.retries() is Mocha's own API — WDIO doesn't ship a separate
    // retry service. Use it sparingly, only for tests known to be
    // legitimately slow rather than as a substitute for fixing timing bugs.
    this.retries(2);

    await browser.url('/');
    await $('[data-test="username"]').setValue('performance_glitch_user');
    await $('[data-test="password"]').setValue('secret_sauce');
    await $('[data-test="login-button"]').click();

    await browser.waitUntil(async () => (await browser.getUrl()).includes('/inventory.html'), {
      timeout: 10_000,
      timeoutMsg: 'performance_glitch_user did not reach inventory within 10s',
    });
  });

  it('uses waitForDisplayed instead of a fixed sleep after adding to cart', async () => {
    await $('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // GOOD — waits exactly as long as needed, no browser.pause()
    const badge = $('[data-test="shopping-cart-badge"]');
    await badge.waitForDisplayed({ timeout: 5000 });
    await expect(badge).toHaveText('1');
  });

  it('gates the next action on a stable landmark instead of a race condition', async () => {
    // beforeEach already logged in and landed us on /inventory.html via the
    // app's own client-side redirect — re-visiting that path directly here
    // would 404 (it's not a real static route on this GitHub Pages-hosted
    // SPA). Assert a stable landmark is present before acting, rather than
    // clicking immediately after navigation (which risks acting before
    // the page's event listeners are bound)
    await expect($('.inventory_list')).toBeDisplayed();
    await $('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect($('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  it('gates a post-navigation assertion on the URL change, not a fixed wait', async () => {
    await $('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await $('[data-test="shopping-cart-link"]').click();

    // RELIABLE — the URL assertion itself retries until navigation completes
    await expect(browser).toHaveUrl(expect.stringContaining('/cart.html'));
    await expect($('[data-test="checkout"]')).toBeDisplayed();
  });

  it('uses browser.waitUntil() for a custom condition not covered by waitFor*', async () => {
    await $('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await $('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await $('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    await browser.waitUntil(
      async () => {
        const badge = $('[data-test="shopping-cart-badge"]');
        if (!(await badge.isDisplayed())) return false;
        return (await badge.getText()) === '3';
      },
      {
        timeout: 8000,
        timeoutMsg: 'Cart badge never showed 3 items after adding 3 products',
        interval: 300,
      }
    );
  });

  it('re-queries elements after a DOM mutation instead of reusing stale references', async () => {
    await $('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Re-query the badge after the DOM re-renders rather than holding onto
    // a reference captured before the click
    const badge = $('[data-test="shopping-cart-badge"]');
    await badge.waitForDisplayed();
    const count = await badge.getText();
    expect(count).toBe('1');
  });
});
