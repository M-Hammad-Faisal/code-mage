# Patchright

## 2026-09-16 — verified via npm, GitHub (Kaliiiiiiiiii-Vinyzu/patchright), and comparison posts

**Status:** actively maintained. npm `patchright` at **v1.63.0** (tracks Playwright releases closely, ~5 days behind at check time). 200K+ weekly downloads. PyPI mirror also active.

### Confirmed still accurate in `content/blog/what-is-patchright.mdx`

- The core detection mechanism described (CDP `Runtime.enable` as a leak vector, Patchright's isolated-`ExecutionContexts` fix) is still accurate and still the industry-standard approach.
- Vanilla Playwright has **not** patched this upstream — Microsoft has no incentive to (it's a testing tool, not a stealth tool), so the blog's core framing holds.
- Install/usage syntax (`npm install patchright`, `npx patchright install chromium`, `import { chromium } from 'patchright'`) — unchanged, correct for v1.63.0.
- `--enable-automation` flag / `navigator.webdriver` leak description, disabled Console API trade-off, headed-mode recommendation — all still correct.
- Chromium-only limitation — still accurate; Patchright doesn't patch Firefox or WebKit.

### Fixed this pass

- The post implicitly framed Patchright as the only option in this space. By 2026 there's a comparison-content ecosystem around it — added a note naming `rebrowser-patches` (comparable CDP-minimal approach, also skips `Runtime.enable` via `Page.createIsolatedWorld`) and Camoufox (Firefox-based alternative, patches fingerprinting at the C++ level — relevant since the post flags Chromium-only as a real limitation).

### Not fixed — noted for awareness

- Some advanced/raw CDP commands are reportedly restricted in current Patchright. Not covered by our post (it doesn't demonstrate raw CDP usage), so no action needed unless a future post adds that.

### Sources

- https://www.npmjs.com/package/patchright
- https://github.com/Kaliiiiiiiiii-Vinyzu/patchright
- https://rebrowser.net/blog/how-to-fix-runtime-enable-cdp-detection-of-puppeteer-playwright-and-other-automation-libraries
- https://dataresearchtools.com/patchright-vs-rebrowser-patches-stealth-playwright-patches-compared-2026/
- https://roundproxies.com/blog/best-patchright-alternatives/
