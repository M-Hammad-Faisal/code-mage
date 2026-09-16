# GitHub Actions — versions used across our CI/CD chapters

## 2026-09-16 — verified via each action's GitHub releases page

These actions appear in `08-ci-cd.mdx` for Playwright, Cypress, and WebdriverIO, plus the CI/CD blog post. Bumped to current major versions this pass:

| Action                         | Was | Now (current as of 2026-09-16)                                                                                                  |
| ------------------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------- |
| `actions/checkout`             | v4  | **v7**                                                                                                                          |
| `actions/setup-node`           | v4  | **v7**                                                                                                                          |
| `actions/cache`                | v4  | **v6**                                                                                                                          |
| `actions/upload-artifact`      | v4  | **v7**                                                                                                                          |
| `actions/download-artifact`    | v4  | **v8**                                                                                                                          |
| `cypress-io/github-action`     | v6  | **v7**                                                                                                                          |
| `slackapi/slack-github-action` | v1  | **v2** (payload format also changed — see the blog post's Slack notification section for the new `webhook`/`webhook-type` keys) |

Files updated: `content/blog/ci-cd-for-playwright-tests.mdx`, `content/tutorials/playwright/08-ci-cd.mdx`, `content/tutorials/cypress/08-ci-cd.mdx`, `content/tutorials/webdriverio/08-ci-cd.mdx`.

**Next time:** these bump roughly once or twice a year each. Quick re-check: fetch `https://github.com/actions/<name>/releases` and compare the top tag's major version against what's in the repo (`grep -rohE "actions/[a-z-]+@v[0-9]+" content/`).
