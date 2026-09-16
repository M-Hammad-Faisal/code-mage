# Playwright

## 2026-09-16 — verified via playwright.dev release notes + GitHub releases

**Current stable: v1.63** (shipped 2026-09-04).

### Confirmed still accurate in our tutorial (`content/tutorials/playwright/`)

- Locator hierarchy (`getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` > `getByTestId` > CSS/XPath) — unchanged, still Microsoft's official recommendation.
- `.filter()` / `.nth()` chaining — unchanged.
- Web-first assertions (`toBeVisible`, `toHaveText`, `toBeChecked`, `toHaveCount`, `toHaveAttribute`, soft assertions) — current, unchanged semantics.
- Page Object Model + fixtures (`test.extend`) — still the recommended structure.
- CI sharding + blob report + `playwright merge-reports` workflow — still current.
- `storageState` auth pattern (setup project + `dependencies`) — still current best practice.
- `npm init playwright@latest` wizard questions (TS/JS, test folder, GitHub Actions, install browsers) — still accurate as the core prompts.

### Fixed this pass

- `toHaveClass('active')` was presented as if it does partial matching — it's actually a full exact-match on the whole class attribute. Reworded with a regex example for partial matching. (`04-assertions.mdx`)
- Chapter "next chapter" pointers didn't match actual reading order (`03→POM` skipping assertions, `06` reading like intro content). Fixed all cross-links.
- `08-ci-cd.mdx` claimed "10 chapters" — there are 8; reworded to credit prerequisites + these 8.
- CI action versions bumped: see [github-actions.md](github-actions.md).

### Newer features NOT yet covered — candidates for new content

These are real, current (as of 1.63) and not mentioned anywhere in our tutorial:

1. **UI Mode as primary dev workflow** — `npx playwright test --ui`, now the recommended way to author/debug, with source-change-aware filtering (1.59) and a timeline/"Speedboard" tab (1.57–1.58). We only show `--debug` and `--headed --slow-mo`.
2. **Playwright Test Agents** (`npx playwright init-agents`, since 1.56) — planner/generator/healer agents for AI-assisted test authoring and self-healing selectors.
3. **Playwright MCP** — Playwright as a tool AI coding agents can drive directly. Worth a mention given this site's audience.
4. **`test.abort()`** (1.60) and **test locks** (1.63, for shared-resource tests) — directly solves the "shared state" problem `07-flaky-tests.mdx` describes with a manual workaround.
5. **`page.localStorage()` / `page.sessionStorage()`** (1.61) — native, typed API replacing the `page.evaluate(() => localStorage.clear())` pattern currently shown in `07-flaky-tests.mdx`.
6. **`locator.ariaSnapshot()` / `toMatchAriaSnapshot()`** — more robust structural assertion than manual class/text checks; candidate for `04-assertions.mdx` advanced section.
7. **Chrome for Testing** (1.57) — `chromium` channel now maps to Chrome for Testing binaries in many setups, not plain Chromium. Minor CI callout candidate.

### Sources

- https://playwright.dev/docs/release-notes
- https://github.com/microsoft/playwright/releases/tag/v1.63.0
- https://testdino.com/blog/playwright-1-63-release
