# playwright-saucedemo-example

A complete, runnable Playwright test project built for [SauceDemo](https://www.saucedemo.com),
from the Playwright tutorial at [code-mage.dev/tutorial/playwright](https://code-mage.dev/tutorial/playwright).

## Install

```bash
npm install
npx playwright install
```

You only need Chromium and Firefox for this project (that's what `playwright.config.ts`
defines as projects), so you can install just those two if you want to save disk space:

```bash
npx playwright install chromium firefox
```

## Run

```bash
npm test              # run the full suite headless
npm run test:headed   # run with a visible browser
npm run test:debug    # run with the Playwright Inspector
npm run test:report   # open the last HTML report
```

Run a single file:

```bash
npx playwright test tests/login.spec.ts
```

Run the storageState-based test in `flaky-and-retry.spec.ts` under the
authenticated project (this triggers the `setup` project first, which logs
in and writes `playwright/.auth/user.json`):

```bash
npx playwright test --project=chromium-authenticated
```

## What each file demonstrates

| File                                 | Chapter    | What it covers                                                                                                                                                |
| ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pages/LoginPage.ts`                 | ch05       | Login form locators and actions                                                                                                                               |
| `pages/InventoryPage.ts`             | ch05       | Product list, cart badge, sorting                                                                                                                             |
| `pages/CartPage.ts`                  | ch05       | Cart contents and checkout entry                                                                                                                              |
| `pages/CheckoutPage.ts`              | ch05       | Shipping form and order confirmation                                                                                                                          |
| `tests/login.spec.ts`                | ch02, ch05 | Happy path + every SauceDemo login error state                                                                                                                |
| `tests/selectors.spec.ts`            | ch03       | `getByRole`, `getByPlaceholder`, `getByText`, data-test locators, `.filter()`, `.nth()`, chaining                                                             |
| `tests/assertions.spec.ts`           | ch04       | `toBeVisible`, `toHaveText`, `toHaveCount`, `toHaveClass` (string + regex), `toBeChecked`, `toHaveAttribute`, `expect.soft`                                   |
| `tests/cart.spec.ts`                 | ch05       | Add/remove items, badge count, persistence across navigation and reload                                                                                       |
| `tests/checkout.spec.ts`             | ch05       | Full checkout happy path + field-by-field validation errors                                                                                                   |
| `tests/flaky-and-retry.spec.ts`      | ch07       | Web-first assertions instead of manual waits, `test.describe.configure({ retries })`, storageState auth via the `setup`/`chromium-authenticated` project pair |
| `tests/auth.setup.ts`                | ch07       | Generates `playwright/.auth/user.json` for the storageState pattern                                                                                           |
| `tests/network-and-advanced.spec.ts` | ch06       | `page.route()` interception/mocking, `locator.ariaSnapshot()` / `toMatchAriaSnapshot()`                                                                       |

## A note on selectors

A few locators in this project differ slightly from the tutorial prose
because the live SauceDemo markup has moved on since those chapters were
written — its product cards are plain `<div class="inventory_item">`
elements with no ARIA `listitem` role, and the "Products" title is a
`<span data-test="title">` rather than a heading. Every locator here was
verified against the real site, so `.locator('.inventory_item')` and
`[data-test="title"]` are used in the few spots where `getByRole('listitem')`
or `getByRole('heading', { name: 'Products' })` would not find anything.
Everything else — `getByPlaceholder`, `getByRole('button', ...)`,
`data-test` attribute locators, `.filter()`, `.nth()` — matches the
tutorial exactly.

## Credentials

All SauceDemo users share the password `secret_sauce`:

| Username                  | Behavior                              |
| ------------------------- | ------------------------------------- |
| `standard_user`           | Normal working user                   |
| `locked_out_user`         | Blocked at login                      |
| `problem_user`            | Broken UI (wrong images, broken sort) |
| `performance_glitch_user` | Intentional slowness                  |

## Credit

From the Playwright tutorial at code-mage.dev/tutorial/playwright.
