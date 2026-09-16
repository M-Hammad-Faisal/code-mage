# Cypress

## 2026-09-16 — verified via docs.cypress.io/app/references/changelog + npm + GitHub releases

**Current: 16.1.0** (2026-09-15). **16.0.0** landed 2026-09-01 as a breaking major ("faster tests, less flake").

### Confirmed still accurate in our tutorial (`content/tutorials/cypress/`)
- `cypress.config.js/ts` is correct — `cypress.json` has been obsolete since Cypress 10.
- Config keys used (`baseUrl`, `defaultCommandTimeout`, `retries.runMode/openMode`, `video`, `screenshotsFolder`, `setupNodeEvents`, `reporter`, `env`) all still valid.
- Selector guidance (`data-test`/`data-testid`, avoid `id`/XPath) — unchanged, still best practice.
- No official POM API — plain ES6/TS classes with getters (never storing elements in variables) remains the documented community pattern; Cypress docs still lean toward custom commands for reusable flows.
- `cy.intercept()` syntax — unchanged.
- `cy.session()` — accurate, still the recommended session-caching pattern.

### Fixed this pass — real breaking changes
- **`Cypress.env()` was fully removed in 16.0.0** (deprecated in 15.10, Feb 2026). Verified directly against the changelog before editing. Our `06-network-and-advanced.mdx` used `Cypress.env('username')` for credentials — swapped to `cy.env()` (the Node-process-only replacement for sensitive values; `Cypress.expose()` is the new browser-readable alternative for public config, not appropriate for credentials).
- **File uploads**: `.selectFile()` has been native since Cypress 9.3 — removed the outdated `cypress-file-upload` plugin recommendation (that plugin is now effectively unmaintained).
- **Node.js requirement**: Cypress 16 dropped Node 20 support, now requires Node 22.x, 24.x, or ≥26.x. Bumped our prerequisite text and CI `node-version` from `'20'` to `'22'`.
- **Electron deprecated** as the default headless browser (16.0.0) — added a note recommending explicit `--browser chrome` in CI.
- Selector typo `shopping_cart_badge` (underscore) → `shopping-cart-badge` (hyphen), matching the rest of the tutorial.
- CI action versions bumped: see [github-actions.md](github-actions.md).

### Newer features NOT yet covered — candidates for new content
- **HTTP/2 (and HTTP/3) support by default** in Chrome/Chromium/Edge (16.0.0) — faster, more realistic network behavior.
- **`manageBrowserMemory`** config (replaces `experimentalMemoryManagement`, now default `true`) — prevents crashes on long runs.
- **Cookie/storage commands now retry like queries** (16.0.0) — directly relevant to the network chapter's cookie/localStorage section.
- **`cy.prompt()`** (AI-powered plain-English testing, beta) and **`cypress tap`** (AI agent CI integration) — new in the 15.x/16.x line, not mentioned anywhere.
- Component testing version floors moved (Angular 21+, Vite 8+, Next.js 15.0.4+/16+) — not relevant since we have no component-testing chapter.

### Sources
- https://docs.cypress.io/app/references/changelog
- https://www.npmjs.com/package/cypress?activeTab=versions
