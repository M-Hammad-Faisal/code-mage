# SauceDemo — verified ground truth

## 2026-09-16 — full manual walkthrough via browser, every selector/URL/behavior confirmed live

This is the site all three tutorial tracks (and their downloadable example projects) test against. Everything below was clicked through and confirmed directly in a real browser, not assumed — written down once so future chapters/examples/fixes reference this instead of re-discovering it through repeated test failures.

### Hard rule: no direct navigation to any authenticated route

`https://www.saucedemo.com` is a GitHub Pages-hosted SPA. Only `/` is a real static route. `/inventory.html`, `/cart.html`, `/checkout-step-one.html`, `/checkout-step-two.html`, `/checkout-complete.html`, `/inventory-item.html` are **client-side routes with no matching static file** — confirmed via `curl -sI https://www.saucedemo.com/inventory.html` → real HTTP `404` from GitHub's server, regardless of auth/session state.

**This means:** `cy.visit('/inventory.html')`, `page.goto('/inventory.html')`, and `browser.url('/inventory.html')` all fail to reach the intended page — every single time, logged in or not. The only way to reach these pages is real in-app navigation: log in through `/`, then click real links/buttons. A page **reload** on one of these URLs also 404s (it's a fresh HTTP request), so `cy.reload()` / `page.reload()` / `browser.refresh()` are equally unsafe once past the login page. Any tutorial content or example code that navigates directly to these paths is wrong and needs the same fix applied here.

**Precise mechanism (verified 2026-09-17, checking the response body, not just `-I` headers):** the 404 response body isn't empty — it contains the ["Single Page Apps for GitHub Pages"](https://github.com/rafgraph/spa-github-pages) redirect script, a real GitHub Pages feature SauceDemo's build uses. A real browser executes it, redirects back to `/`, and SauceDemo's own router — seeing no active session — renders a real, correctly-worded "you must be logged in" screen, not a dead page. Confirmed with a real Playwright run: `page.goto('/inventory.html')` returns `status() === 404` initially, then `page.url()` resolves to `https://www.saucedemo.com/` after the redirect completes, landing on the auth-guard screen. Practically this changes nothing about the fix — direct navigation still never reaches the intended page — but "404, nothing else happens" was an incomplete description; see the full writeup in [the-404-that-broke-three-frameworks.mdx](../../content/blog/the-404-that-broke-three-frameworks.mdx).

### Resetting state between tests — use the app's own reset, not a workaround

The hamburger menu has `[data-test="reset-sidebar-link"]` ("Reset App State") — confirmed via `localStorage.getItem('cart-contents')` going from `"[4,0]"` to `null` and the visible cart badge disappearing. This is the correct, idiomatic way to reset cart state between tests. (Logging out does **not** clear the cart — confirmed separately; don't rely on it for cleanup.)

**Known real bug in Reset App State:** it reliably clears `cart-contents` in localStorage and the header badge, but occasionally leaves one product card's own button still showing "Remove" instead of "Add to cart" — a desync between global cart state and that card's local component state. Reproduced directly: add "Sauce Labs Backpack" to cart, click Reset App State, and its button can still read `remove-sauce-labs-backpack` even though `cart-contents` is `null` and the badge is gone. No amount of waiting fixes this — it's a real app bug, not a timing issue. Tests that reset between runs need a fallback: after Reset App State, sweep any remaining `[data-test^="remove-"]` buttons by clicking them directly.

### Login page (`/`)

`data-test`: `login-container`, `username`, `password`, `login-button`, `login-credentials-container`, `login-credentials`, `login-password`.

Error messages (exact text, via `[data-test="error"]`):

- Empty username: `Epic sadface: Username is required`
- Empty password: `Epic sadface: Password is required`
- Wrong creds: `Epic sadface: Username and password do not match any user in this service`
- `locked_out_user`: `Epic sadface: Sorry, this user has been locked out.`

Valid usernames (all password `secret_sauce`): `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`. (`error_user` and `visual_user` are not currently covered in any tutorial chapter — worth adding.)

### Header / sidebar menu (present on every authenticated page)

`data-test`: `header-container`, `open-menu`, `close-menu`, `shopping-cart-link`, `shopping-cart-badge` (absent from DOM entirely when cart is empty — don't assert `.not.toBeDisplayed()`, assert it doesn't exist).

Sidebar menu items: `inventory-sidebar-link`, `dynamic-catalog-sidebar-link` (href `#`, non-functional placeholder — skip), `about-sidebar-link` (navigates to `https://saucelabs.com/` in the **same tab**, no `target="_blank"` — a real "leaves the app" case worth testing, distinct from the footer links below), `logout-sidebar-link`, `reset-sidebar-link`.

### Footer social links — open in a new tab, unlike the About link

`data-test`: `social-x` (→ `https://x.com/saucelabs`, `target="_blank" rel="noreferrer"` — **not** `social-twitter`, that attribute no longer exists, SauceDemo rebranded it), `social-facebook`, `social-linkedin`. All three use `target="_blank"`.

### Inventory page (`/inventory.html`, reached only via login redirect)

`data-test`: `secondary-header`, `title`, `active-option`, `product-sort-container` (hyphenated — **not** `product_sort_container`, that's the CSS class name, not the attribute), `inventory-container`, `inventory-list`, `inventory-item` (×6), `item-N-img-link` / `item-N-title-link` (N = 0–5, stable per-product index), `inventory-item-name`, `inventory-item-desc`, `inventory-item-price`, and per-product `add-to-cart-<slug>` / `remove-<slug>` (slug = lowercase, spaces→hyphens, e.g. `add-to-cart-sauce-labs-backpack`; the one exception is `Test.allTheThings() T-Shirt (Red)` → `add-to-cart-test.allthethings()-t-shirt-(red)`, punctuation included as-is).

Sort dropdown options: `az` (Name A–Z), `za` (Name Z–A), `lohi` (Price low–high), `hilo` (Price high–low).

### Product detail page (`/inventory-item.html?id=N`, reached only by clicking a product image/title link)

Not covered in any tutorial chapter currently. `data-test`: `back-to-products`, `inventory-item`, `item-<slug>-img-link`, `inventory-item-name`, `inventory-item-desc`, `inventory-item-price`, and a generic `add-to-cart` (not slug-specific on this page, since only one product is shown). `back-to-products` safely client-routes back to `/inventory.html` — it's a real in-app link, not a raw navigation, so it's safe to click.

### Cart page (`/cart.html`, reached only via the cart link)

`data-test`: `cart-contents-container`, `cart-list`, `cart-quantity-label`, `cart-desc-label`, `item-quantity`, plus the same per-product `inventory-item-name`/`desc`/`price`/`remove-<slug>` as the inventory page, `continue-shopping`, `checkout`.

### Checkout — 3 real steps, each its own client-routed URL

1. `/checkout-step-one.html` — `data-test`: `checkout-info-container`, `firstName`, `lastName`, `postalCode`, `cancel`, `continue`.
2. `/checkout-step-two.html` — `data-test`: `checkout-summary-container`, `cart-list` (order review), `payment-info-label`/`value`, `shipping-info-label`/`value`, `total-info-label`, `subtotal-label`, `tax-label`, `total-label`, `cancel`, `finish`.
3. `/checkout-complete.html` — `data-test`: `checkout-complete-container`, `pony-express` (decorative image), `complete-header`, `complete-text`, `back-to-products`, **`generate-pdf-order`** — a real PDF download button, not covered in any tutorial chapter. Good candidate for the file-download chapter being planned.

### Sources

Every attribute/behavior above was read directly from the live DOM (`document.querySelectorAll('[data-test]')`) and confirmed by driving the real UI, not inferred from memory or old tutorial content.
