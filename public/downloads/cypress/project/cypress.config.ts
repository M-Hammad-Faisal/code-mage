import { defineConfig } from 'cypress';
import fs from 'fs';
import path from 'path';

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
      on('task', {
        // SauceDemo's order-receipt PDF filename is timestamped, so tests
        // can't assert an exact name — this finds the newest file matching
        // a prefix instead. Used by tests/tabs-and-downloads.cy.ts.
        findDownload(prefix: string) {
          const dir = path.join(config.projectRoot, 'cypress', 'downloads');
          if (!fs.existsSync(dir)) return null;
          const matches = fs
            .readdirSync(dir)
            .filter((f) => f.startsWith(prefix))
            .map((f) => ({ name: f, mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
            .sort((a, b) => b.mtime - a.mtime);
          return matches.length > 0 ? matches[0].name : null;
        },
        clearDownloads() {
          const dir = path.join(config.projectRoot, 'cypress', 'downloads');
          if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
          }
          return null;
        },
      });
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
