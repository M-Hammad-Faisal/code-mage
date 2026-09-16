# WDIO SauceDemo Example Project

A complete, runnable WebdriverIO v9 test project for [SauceDemo](https://www.saucedemo.com), from the WebdriverIO tutorial at [code-mage.dev/tutorial/webdriverio](https://code-mage.dev/tutorial/webdriverio).

## Requirements

- Node.js 18 or later (20 recommended)
- Chrome installed locally

No manual driver installs are needed — WDIO auto-manages browser drivers (Chrome, Firefox, Edge, Safari) since v8.14. It downloads and starts the matching driver binary for whatever's in `capabilities`.

## Install

```bash
npm install
```

## Run

Run the full suite (headed on your machine):

```bash
npx wdio run wdio.conf.ts
```

Or via the npm script:

```bash
npm test
```

Run headless (also automatic when `CI=true`):

```bash
npx wdio run wdio.conf.ts --headless
```

Run a single spec:

```bash
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

Run several specs:

```bash
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts,test/specs/cart.e2e.ts
```

## Project Structure

```
wdio.conf.ts             — WDIO config: baseUrl, chrome capability, mocha framework, spec reporter
tsconfig.json             — TypeScript config with @pages path alias
package.json
test/
  pages/
    base.page.ts           — shared BasePage: open() and waitForPageLoad()
    login.page.ts           — LoginPage POM (getters + login/error helpers)
    inventory.page.ts        — InventoryPage POM (add to cart, sort, item count)
    cart.page.ts              — CartPage POM (view, remove, checkout entry point)
    checkout.page.ts           — CheckoutPage POM (shipping info, overview, finish)
  specs/
    login.e2e.ts               — full login suite: happy path + all error states
    selectors.e2e.ts            — selector strategies and waitFor* patterns (ch. 3)
    assertions.e2e.ts            — expect-webdriverio matchers (ch. 4)
    cart.e2e.ts                   — full cart suite (add, view, remove, checkout entry)
    checkout.e2e.ts                — full checkout suite: happy path + validation errors
    advanced-interactions.e2e.ts    — browser.execute(), multi-window/tab handling (ch. 6)
    flaky-and-retry.e2e.ts           — this.retries(), waitFor* over fixed sleeps (ch. 7)
```

## What Each Spec Demonstrates

- **`login.e2e.ts`** — the full login suite (happy path for `standard_user`, `problem_user`, `performance_glitch_user`, plus every error state for `locked_out_user` and bad credentials), built on the shared `LoginPage` object instead of an inline page object class.
- **`selectors.e2e.ts`** — CSS, `data-test`, text (`button=`, `*=`), and ARIA (`aria/`) selector strategies; chaining `$` inside `$$`; `waitForExist`/`waitForDisplayed`/`waitForClickable`, including `reverse: true`.
- **`assertions.e2e.ts`** — `expect-webdriverio` matchers: `toBeDisplayed`, `toHaveText`, `toHaveUrl`, `toHaveValue`, `toBeEnabled`, `toBeClickable`, `toHaveAttr`, `toHaveHref`, `toHaveLength`, and negative assertions with `.not`.
- **`cart.e2e.ts`** — adding and removing products, verifying the cart badge count, cart contents, and the checkout entry point — built on `InventoryPage` + `CartPage`.
- **`checkout.e2e.ts`** — the full checkout flow through order confirmation, plus validation errors for a missing first name, last name, or postal code — built on `CheckoutPage`.
- **`advanced-interactions.e2e.ts`** — native `<select>` sorting, `scrollIntoView()`, `browser.execute()` for direct JS execution and reading `localStorage`, and multi-window/tab handling via `browser.getWindowHandles()` / `switchToWindow()`.
- **`flaky-and-retry.e2e.ts`** — Mocha-native `this.retries(n)` as a last resort, `waitFor*` methods instead of `browser.pause()`, gating actions on a stable landmark, and `browser.waitUntil()` for custom conditions.

## Credentials Used

All SauceDemo standard accounts, password `secret_sauce` for each:

- `standard_user` — normal user
- `locked_out_user` — locked out, used for error-state tests
- `problem_user` — known UI bugs downstream
- `performance_glitch_user` — artificially slow login, used for retry/timeout tests

---

From the WebdriverIO tutorial at code-mage.dev/tutorial/webdriverio
