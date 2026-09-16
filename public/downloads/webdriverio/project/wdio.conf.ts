import type { Options } from '@wdio/types';

// ---------------------------------------------------------------------------
// WDIO Configuration — SauceDemo Example Project
// Tutorial: code-mage.dev/tutorial/webdriverio
//
// No manual driver-service installs needed — WDIO v9 auto-manages browser
// drivers (Chrome, Firefox, Edge, Safari) since v8.14, downloading and
// starting the matching driver binary for whatever's in `capabilities`.
// ---------------------------------------------------------------------------

export const config: Options.Testrunner = {
  runner: 'local',

  // Base URL — every browser.url('/') call resolves against this
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',

  // Test files to run
  specs: ['./test/specs/**/*.e2e.ts'],
  exclude: [],

  // How many browser sessions run in parallel
  maxInstances: parseInt(process.env.MAX_INSTANCES ?? '2', 10),

  // Browser capabilities — no chromedriver install required, WDIO handles it
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: process.env.CI
          ? [
              '--headless',
              '--no-sandbox',
              '--disable-dev-shm-usage',
              '--disable-gpu',
              '--window-size=1280,800',
            ]
          : [],
      },
    },
  ],

  logLevel: 'info',
  bail: 0,

  // Automatic waiting — how long WDIO retries before an element interaction fails
  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // Test framework
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  // Reporter
  reporters: [
    [
      'spec',
      {
        symbols: {
          passed: '✓',
          failed: '✗',
        },
      },
    ],
  ],

  // Hooks
  afterTest: async (test, context, { passed }) => {
    if (!passed) {
      const name = test.title.replace(/\s+/g, '-').toLowerCase();
      await browser.saveScreenshot(`./test-results/screenshots/fail-${name}.png`);
    }
  },
};
