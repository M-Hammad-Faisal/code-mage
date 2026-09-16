# WebdriverIO

## 2026-09-16 — verified via github.com/webdriverio/webdriverio releases + webdriver.io blog

**Current: v9** (v9.31.6, ~Sept 2026). Requires Node.js ≥18 (v20 recommended); dropped Node 16.

### Confirmed still accurate in our tutorial (`content/tutorials/webdriverio/`)
- `$`, `$$`, `waitForDisplayed`, `click`, `setValue` — all current, non-deprecated. `setValue` remains recommended for text input.
- `expect-webdriverio` syntax (`toBeDisplayed()`, `toHaveText()`, `toHaveUrl()`, `toHaveValue()`) — current, matches v5.x used with WDIO v9.
- Page Object Model guidance (class-based pages, getters returning `$()`) — still WDIO's recommended pattern.
- Retry guidance (`this.retries(2)` Mocha-native, `mochaOpts.retries`) — still accurate; confirmed no official `wdio-retry-service` package exists.
- CI/CD: GitHub Actions workflow, headless Chrome flags (`--no-sandbox`, `--disable-dev-shm-usage`), Allure reporter, matrix sharding — all still standard.

### Fixed this pass — real breaking changes
- **Automatic driver management since v8.14** — removed instructions to manually `npm install --save-dev wdio-chromedriver-service` / `wdio-geckodriver-service`. WDIO downloads and starts the matching driver binary itself now; those service packages are deprecated/unmaintained. Fixed in `02-installation-setup.mdx` and `08-ci-cd.mdx`.
- Version claim corrected: "WDIO v8 (current)" → "v9 (current)" in `01-introduction.mdx`.
- Removed broken `ts-jest` import in a Mocha-based TS-paths snippet (`02-installation-setup.mdx`) — replaced with `tsconfig-paths/register`.
- Removed leftover unused `mochawesome/addContext` import inside the Allure section (`08-ci-cd.mdx`) — `mochawesome` isn't used anywhere else in the tutorial.
- Intro chapter's roadmap pitched an Appium/mobile chapter that doesn't exist — rewrote to match the actual 7 topics and note Appium is out of scope.
- CI action versions bumped: see [github-actions.md](github-actions.md).

### Newer features NOT yet covered — candidates for new content
- **WebDriver Bidi protocol** — v9 uses Bidi by default for all sessions (opt-out via `wdio:enforceWebDriverClassic` capability). Not mentioned anywhere; candidate for `01-introduction.mdx` architecture section.
- **v9 breaking change**: direct element property access removed — must use `getElement()`/`getElements()`. Our `$()`/`$$()` chaining patterns are unaffected, but worth a footnote for readers upgrading older codebases.
- **`setViewport` command** (v9) — replaces manual CDP viewport hacks; could supplement the CDP section in `06-advanced-interactions.mdx`.
- A full **Appium/mobile testing chapter** — pitched by the intro but never delivered. Either write it or keep the current honest scoping note.

### Sources
- https://github.com/webdriverio/webdriverio/releases
- https://openjsf.org/blog/webdriverio-v9
- https://webdriver.io/blog/2023/07/31/driver-management/ (driver auto-management)
- https://webdriver.io/blog/2024/08/15/webdriverio-v9-release/
