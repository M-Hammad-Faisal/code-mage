/**
 * Assertions with expect-webdriverio
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 4, Assertions
 *
 * Demonstrates expect-webdriverio's auto-retrying matchers: toBeDisplayed,
 * toHaveText, toHaveUrl, toHaveValue, toBeEnabled, toBeClickable,
 * toHaveAttr, toHaveLength, and negative assertions with .not.
 *
 * Run: npx wdio run wdio.conf.ts --spec test/specs/assertions.e2e.ts
 */

describe('Assertions: Login and Inventory', () => {
  it('asserts on every aspect of the login-to-inventory flow', async () => {
    await browser.url('/');
    await expect(browser).toHaveTitle('Swag Labs');
    await expect(browser).toHaveUrl('https://www.saucedemo.com/');

    // Element state before login
    await expect($('[data-test="username"]')).toBeDisplayed();
    await expect($('[data-test="username"]')).toBeEnabled();
    await expect($('[data-test="password"]')).toBeDisplayed();
    await expect($('[data-test="login-button"]')).toBeClickable();

    // Value assertions
    await $('[data-test="username"]').setValue('standard_user');
    await expect($('[data-test="username"]')).toHaveValue('standard_user');

    await $('[data-test="password"]').setValue('secret_sauce');
    await $('[data-test="login-button"]').click();

    // Post-login URL and absence of error
    await expect(browser).toHaveUrl(expect.stringContaining('/inventory'), {
      message: 'Should have redirected to inventory after login',
    });
    await expect($('[data-test="error"]')).not.toExist();
    await expect($('.inventory_list')).toBeDisplayed();

    // Count assertion
    const products = await $$('.inventory_item');
    await expect(products).toHaveLength(6);

    // Text assertions — exact and partial
    const firstProduct = products[0];
    await expect(firstProduct.$('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(firstProduct.$('.inventory_item_name')).toHaveText(
      expect.stringContaining('Backpack')
    );
    await expect(firstProduct.$('.inventory_item_price')).toHaveText(
      expect.stringMatching(/^\$\d+\.\d{2}$/)
    );

    // Attribute assertions
    await expect(firstProduct.$('[data-test^="add-to-cart"]')).toBeClickable();

    // Negative assertion — cart badge not shown until an item is added
    await expect($('[data-test="shopping-cart-badge"]')).not.toBeDisplayed();

    await firstProduct.$('[data-test^="add-to-cart"]').click();
    await expect($('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Button swap after adding to cart
    await expect(firstProduct.$('[data-test^="remove"]')).toBeDisplayed();
    await expect(firstProduct.$('[data-test^="add-to-cart"]')).not.toExist();
  });

  it('asserts href and attribute values on footer links', async () => {
    await browser.url('/');
    await $('[data-test="username"]').setValue('standard_user');
    await $('[data-test="password"]').setValue('secret_sauce');
    await $('[data-test="login-button"]').click();
    await expect($('.inventory_list')).toBeDisplayed();

    await expect($('[data-test="social-x"]')).toHaveAttr('target', '_blank');
    await expect($('[data-test="social-x"]')).toHaveHref(expect.stringContaining('x.com'));
  });

  it('asserts on error state for the locked out user', async () => {
    await browser.url('/');
    await $('[data-test="username"]').setValue('locked_out_user');
    await $('[data-test="password"]').setValue('secret_sauce');
    await $('[data-test="login-button"]').click();

    const error = $('[data-test="error"]');
    await expect(error).toBeDisplayed();
    await expect(error).toHaveText(
      expect.stringContaining('Sorry, this user has been locked out'),
      { message: 'Locked out user should see a specific error message' }
    );
    await expect(browser).not.toHaveUrl(expect.stringContaining('/inventory'));
  });

  it('asserts checkbox-style state and page title across navigation', async () => {
    await browser.url('/');
    await $('[data-test="username"]').setValue('standard_user');
    await $('[data-test="password"]').setValue('secret_sauce');
    await $('[data-test="login-button"]').click();

    await expect(browser).toHaveTitle(expect.stringContaining('Swag'));

    await $('[data-test="product-sort-container"]').selectByAttribute('value', 'lohi');
    await expect($('[data-test="product-sort-container"]')).toHaveValue('lohi');
  });
});
