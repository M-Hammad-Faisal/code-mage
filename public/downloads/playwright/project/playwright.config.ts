/**
 * Playwright config — matches the keys taught in ch08-ci-cd.mdx (and ch02's
 * baseline config from ch02-installation-setup.mdx), plus the "setup" project
 * + dependencies pattern from ch07-flaky-tests.mdx for storageState auth reuse.
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [['blob'], ['list']]
    : [['html'], ['list'], ['allure-playwright', { resultsDir: 'allure-results' }]],

  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      // Opt into this project (npx playwright test --project=chromium-authenticated)
      // for specs that need to start already logged in via storageState.
      name: 'chromium-authenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
