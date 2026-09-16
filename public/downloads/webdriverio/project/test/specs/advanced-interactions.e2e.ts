/**
 * Advanced Interactions & Browser Control
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 6, Advanced Interactions
 *
 * Demonstrates browser.execute() for direct JS execution, multi-window/tab
 * handling via window handles, native <select> dropdowns, scrolling, and
 * reading localStorage — the patterns chapter 6 covers beyond basic
 * click-and-type.
 *
 * Run: npx wdio run wdio.conf.ts --spec test/specs/advanced-interactions.e2e.ts
 */

describe('Advanced Interactions', () => {
  before(async () => {
    await browser.url('/');
    await $('[data-test="username"]').setValue('standard_user');
    await $('[data-test="password"]').setValue('secret_sauce');
    await $('[data-test="login-button"]').click();
    await expect(browser).toHaveUrl(expect.stringContaining('/inventory'));
  });

  it('sorts products via the native select dropdown and verifies ordering', async () => {
    // `before` already logged in and landed on /inventory.html via the
    // app's own client-side redirect — direct navigation to that path
    // 404s (no real static route on this GitHub Pages-hosted SPA), so
    // every test in this file relies on staying in that same session.
    await $('[data-test="product-sort-container"]').selectByAttribute('value', 'lohi');
    await expect($('[data-test="product-sort-container"]')).toHaveValue('lohi');

    const priceEls = await $$('.inventory_item_price');
    const prices: number[] = [];
    for (const el of priceEls) {
      prices.push(parseFloat((await el.getText()).replace('$', '')));
    }

    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  it('scrolls the last product into view and confirms visibility', async () => {
    const lastProduct = (await $$('.inventory_item')).at(-1)!;
    await lastProduct.scrollIntoView({ block: 'center' });
    await expect(lastProduct).toBeDisplayed();
  });

  it('executes JavaScript to read cart contents from localStorage', async () => {
    await $('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // SauceDemo persists the cart in localStorage — read it directly since
    // WDIO has no native command for browser storage
    const rawCart = await browser.execute(() => localStorage.getItem('cart-contents'));
    expect(rawCart).not.toBeNull();
  });

  it('executes JavaScript to read a value not exposed by the WDIO API', async () => {
    const scrollY = await browser.execute(() => window.scrollY);
    expect(typeof scrollY).toBe('number');

    const itemCount = await browser.execute(() => {
      return document.querySelectorAll('.inventory_item').length;
    });
    expect(itemCount).toBe(6);
  });

  it('opens a new tab, switches window handles, and returns to the original', async () => {
    const handlesBefore = await browser.getWindowHandles();
    expect(handlesBefore).toHaveLength(1);

    // Footer social links open in a new tab — capture handles before clicking.
    // SauceDemo's data-test is "social-x" (rebranded from Twitter), linking to x.com.
    await $('[data-test="social-x"]').click();

    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length > handlesBefore.length,
      { timeout: 8000, timeoutMsg: 'New tab never opened after clicking the X link' }
    );

    const handlesAfter = await browser.getWindowHandles();
    const newTab = handlesAfter.find((h) => !handlesBefore.includes(h))!;
    await browser.switchToWindow(newTab);

    await expect(browser).toHaveUrl(expect.stringContaining('x.com'));

    await browser.closeWindow();
    await browser.switchToWindow(handlesBefore[0]);

    await expect(browser).toHaveUrl(expect.stringContaining('saucedemo.com'));
  });

  it('opens a fresh tab directly with browser.newWindow()', async () => {
    const handlesBefore = await browser.getWindowHandles();

    // A fresh tab has no session, and /inventory.html isn't a real static
    // route on this GitHub Pages-hosted SPA (it 404s without going through
    // client-side login first) — open the root URL instead, which is real.
    await browser.newWindow('https://www.saucedemo.com/', {
      windowName: 'SauceDemoSecondTab',
    });

    const handlesAfter = await browser.getWindowHandles();
    expect(handlesAfter.length).toBeGreaterThan(handlesBefore.length);

    await expect(browser).toHaveUrl(expect.stringContaining('saucedemo.com'));

    await browser.closeWindow();
    await browser.switchToWindow(handlesBefore[0]);
  });
});
