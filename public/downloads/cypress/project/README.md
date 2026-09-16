# Cypress SauceDemo Example Project

A complete, runnable Cypress test suite for [SauceDemo](https://www.saucedemo.com), built as the companion project for the Cypress tutorial at [code-mage.dev/tutorial/cypress](https://code-mage.dev/tutorial/cypress).

Every pattern taught in the tutorial — selectors, assertions, the Page Object Model, network interception, flaky-test fixes, and CI setup — is demonstrated here with real, working code against a live site. No mocked backend, no placeholders.

## Install

```bash
npm install
```

Requires Node.js 22 or later (Cypress 16 dropped support for Node 20).

## Run

Interactive mode (opens the Cypress UI, pick a spec, watch it run):

```bash
npm run cy:open
```

Headless mode (runs every spec in Chrome, prints results to the terminal — what CI uses):

```bash
npm run cy:run
```

Run a single spec:

```bash
npx cypress run --spec cypress/e2e/login.cy.ts
```

## What each spec demonstrates

| Spec                                     | Tutorial chapter                             | Demonstrates                                                                                                                                |
| ---------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `cypress/e2e/selectors.cy.ts`            | 3 — Selectors & Commands                     | `data-test` selectors, `cy.contains()`, `within()`, traversal, aliases                                                                      |
| `cypress/e2e/assertions.cy.ts`           | 4 — Assertions & Matchers                    | `.should()`/`.and()` chaining, chai-jquery assertions, implicit vs. explicit subjects, `expect()` in `.then()`, `cy.wrap()`                 |
| `cypress/e2e/login.cy.ts`                | 5 — Page Object Model                        | Full login suite (happy path + every error state) built on the shared `LoginPage`                                                           |
| `cypress/e2e/cart.cy.ts`                 | 5 — Page Object Model                        | Cart suite built on `InventoryPage` + `CartPage`                                                                                            |
| `cypress/e2e/checkout.cy.ts`             | 5 — Page Object Model                        | Full checkout flow (shipping info → overview → finish) plus validation errors, built on `CheckoutPage`                                      |
| `cypress/e2e/network-and-advanced.cy.ts` | 6 — Network Requests & Advanced Interactions | `cy.intercept()`, fixtures, `cy.session()` login caching, `cy.env()` for credentials (chained with `.then()`, never awaited), local storage |
| `cypress/e2e/flaky-and-retry.cy.ts`      | 7 — Flaky Tests & Stability Patterns         | `retries` config, avoiding `cy.wait(ms)`, asserting on navigation before the destination page, test isolation                               |

## Project structure

```
cypress.config.ts      # baseUrl, timeouts, retries, video/screenshot config
cypress/
  pages/                # shared Page Objects — plain ES6 classes, getters call cy.get() fresh each time
    LoginPage.ts
    InventoryPage.ts
    CartPage.ts
    CheckoutPage.ts
  e2e/                  # spec files — one per tutorial concept/flow
  fixtures/
    example.json        # stubbed product data used by the network spec
  support/
    e2e.ts               # runs before every spec, imports commands.ts
    commands.ts           # cy.login(), cy.loginWithSession(), cy.addToCart()
```

## Test accounts (SauceDemo standard logins)

All use password `secret_sauce`:

- `standard_user` — normal login
- `locked_out_user` — blocked at login with an error
- `problem_user` — logs in but has UI bugs
- `performance_glitch_user` — logs in with an artificial delay

## Credentials via cy.env()

`network-and-advanced.cy.ts` reads `username`/`password` through `cy.env()` rather than hardcoding them, falling back to the standard demo credentials so the spec runs out of the box. To override, create a git-ignored `cypress.env.json`:

```json
{
  "username": "standard_user",
  "password": "secret_sauce"
}
```

or pass them as environment variables in CI:

```bash
CYPRESS_username=standard_user CYPRESS_password=secret_sauce npm run cy:run
```

---

From the Cypress tutorial at [code-mage.dev/tutorial/cypress](https://code-mage.dev/tutorial/cypress)
