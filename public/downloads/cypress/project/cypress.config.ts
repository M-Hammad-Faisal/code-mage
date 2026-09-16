import { defineConfig } from 'cypress';

/**
 * Cypress config for the code-mage.dev Cypress tutorial example project.
 * Tutorial: code-mage.dev/tutorial/cypress (see chapter 8, CI/CD Integration)
 *
 * baseUrl points at SauceDemo, the site used throughout the tutorial, so
 * every spec can use cy.visit('/') instead of the full URL.
 */
export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      // no plugins required for this example project
      return config;
    },
  },

  // Cypress retries .should() assertions automatically up to this timeout.
  defaultCommandTimeout: 8000,

  // Safety net for genuinely intermittent CI failures — not a substitute
  // for fixing a flaky test (see chapter 7).
  retries: {
    runMode: 2, // retry up to 2 times in `cypress run` (CI)
    openMode: 0, // don't retry in `cypress open` (interactive)
  },

  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
});
