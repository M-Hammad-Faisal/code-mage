/**
 * BasePage — shared behaviour for every page object.
 * Tutorial: code-mage.dev/tutorial/webdriverio — Chapter 5, Page Object Model
 */
export default class BasePage {
  /**
   * Navigate to a path relative to baseUrl.
   * Use '/' for root or '/inventory.html' for sub-paths.
   */
  async open(path: string = '/'): Promise<void> {
    await browser.url(path);
  }

  /**
   * Wait until the browser stops navigating.
   * Useful after click() triggers a page transition.
   */
  async waitForPageLoad(): Promise<void> {
    await browser.waitUntil(
      async () => {
        const state = await browser.execute(() => document.readyState);
        return state === 'complete';
      },
      { timeout: 10000, timeoutMsg: 'Page did not finish loading within 10s' }
    );
  }
}
