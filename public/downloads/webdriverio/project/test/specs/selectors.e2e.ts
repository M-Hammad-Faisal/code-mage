/**
 * Selectors & Commands
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 3, Writing Tests
 *
 * Demonstrates the selector strategies and element commands from chapter 3:
 * CSS, data-test attributes, text and ARIA selectors, element chaining
 * with $$, and the waitForDisplayed/waitForExist/waitForClickable family.
 *
 * Run: npx wdio run wdio.conf.ts --spec test/specs/selectors.e2e.ts
 */

describe('Selectors and Commands', () => {
  beforeEach(async () => {
    await browser.url('/');
    await $('[data-test="username"]').setValue('standard_user');
    await $('[data-test="password"]').setValue('secret_sauce');
    await $('[data-test="login-button"]').click();
    await $('.inventory_list').waitForDisplayed({ timeout: 8000 });
  });

  // SauceDemo never clears the cart on its own — reset via the app's own
  // menu option so tests that add items don't leak state into the next
  // test (see docs/research/saucedemo-site-map.md for why direct
  // navigation/reload can't be used to get a "fresh" page instead).
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

  it('finds elements via data-test attribute selectors', async () => {
    const sortDropdown = await $('[data-test="product-sort-container"]');
    await expect(sortDropdown).toExist();

    const cartLink = await $('[data-test="shopping-cart-link"]');
    await expect(cartLink).toBeDisplayed();
  });

  it('finds elements via partial attribute selectors', async () => {
    // ^= matches an attribute value that STARTS WITH the given string —
    // useful because each add-to-cart button has a product-specific suffix
    const addButtons = await $$('[data-test^="add-to-cart"]');
    await expect(addButtons).toBeElementsArrayOfSize(6);
  });

  it('finds elements via text content selectors', async () => {
    // Exact text match
    const addBackpackBtn = await $('button=Add to cart');
    await expect(addBackpackBtn).toBeDisplayed();

    // Partial text match
    const productsHeader = await $('*=Products');
    await expect(productsHeader).toBeDisplayed();
  });

  it('finds elements via ARIA selectors', async () => {
    const menuButton = await $('aria/Open Menu');
    await expect(menuButton).toExist();
  });

  it('chains $ inside $$ to scope a query to one product card', async () => {
    const products = await $$('.inventory_item');
    const firstProduct = products[0];

    const name = await firstProduct.$('.inventory_item_name').getText();
    const price = await firstProduct.$('.inventory_item_price').getText();

    expect(name.length).toBeGreaterThan(0);
    expect(price.startsWith('$')).toBe(true);
  });

  it('waits for an element to exist before interacting', async () => {
    const cartBadgeBeforeAdd = $('[data-test="shopping-cart-badge"]');
    await expect(cartBadgeBeforeAdd).not.toExist();

    await $('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    const cartBadge = $('[data-test="shopping-cart-badge"]');
    await cartBadge.waitForExist({ timeout: 5000 });
    await expect(cartBadge).toHaveText('1');
  });

  it('waits for an element to be displayed', async () => {
    await $('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    const cartBadge = $('[data-test="shopping-cart-badge"]');
    await cartBadge.waitForDisplayed({ timeout: 5000 });
    await expect(cartBadge).toBeDisplayed();
  });

  it('waits for an element to become clickable', async () => {
    const checkoutTrigger = $('[data-test="shopping-cart-link"]');
    await checkoutTrigger.waitForClickable({ timeout: 5000 });
    await checkoutTrigger.click();

    await expect(browser).toHaveUrl(expect.stringContaining('/cart.html'));

    const checkoutButton = $('[data-test="checkout"]');
    await checkoutButton.waitForClickable({ timeout: 5000 });
    await expect(checkoutButton).toBeClickable();
  });

  it('waits for an element to disappear using reverse: true', async () => {
    await $('[data-test="username"]');
    // Trigger the error banner, then dismiss it and wait for it to go away
    await browser.url('/');
    await $('[data-test="login-button"]').click();

    const error = $('[data-test="error"]');
    await error.waitForDisplayed({ timeout: 5000 });
    await $('[data-test="error-button"]').click();
    await error.waitForDisplayed({ timeout: 5000, reverse: true });
    await expect(error).not.toBeDisplayed();
  });

  it('reads text and attributes across a collection of elements', async () => {
    const nameEls = await $$('.inventory_item_name');
    const names: string[] = [];
    for (const el of nameEls) {
      names.push(await el.getText());
    }

    expect(names).toContain('Sauce Labs Backpack');
    expect(names).toHaveLength(6);
  });
});
