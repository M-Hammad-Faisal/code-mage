# Dependency security — Dependabot alerts

## 2026-09-16

GitHub flagged 5 open vulnerability alerts on `master` after the first push this session. Checked via `gh api graphql` (the REST Dependabot alerts endpoint needs a token scope this session didn't have — GraphQL's `vulnerabilityAlerts` worked instead, after switching to the repo-owning account with `gh auth switch`).

All 5 are transitive devDependencies pulled in by `@lhci/cli` (Lighthouse CI, used only by `npm run lighthouse`) — none are in the production dependency tree, none run on the deployed site.

| Package                                                           | Severity                                                           | Status                                   | Fix                                            |
| ----------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------- | ---------------------------------------------- |
| `uuid` (8.3.2, via `@lhci/cli`)                                   | Moderate                                                           | **Fixed**                                | `overrides` pin to `^11.1.1` in `package.json` |
| `qs` (6.14.2, via `express`, via `@lhci/cli`)                     | Moderate                                                           | **Fixed**                                | `overrides` pin to `^6.15.2`                   |
| `tmp` (0.1.0/0.0.33, via `@lhci/cli`/`inquirer`)                  | High                                                               | **Fixed**                                | `overrides` pin to `^0.2.6`                    |
| `extract-zip` (2.0.1, via `@puppeteer/browsers`, via `@lhci/cli`) | High (×2 advisories: symlink path traversal, arbitrary file write) | **Not fixed — no patch exists upstream** | See below                                      |

### Why `extract-zip` is left as-is

`firstPatchedVersion` is `null` on both advisories — there is no non-vulnerable release to upgrade to. `npm audit`'s only suggested fix is downgrading `@lhci/cli` to `0.12.0` (a 3-major-version regression, `isSemVerMajor: true`), which would lose years of Lighthouse CI improvements to dodge a package that, in this repo, has effectively zero real attack surface:

- Confirmed via `node_modules/@puppeteer/browsers/lib/cjs/fileUtil.js` — `extract-zip` is called exactly once, to unpack a browser binary archive that Puppeteer itself downloaded from its own trusted CDN.
- The exploit requires a maliciously crafted zip (symlink entries pointing outside the extraction dir) — this only processes zips from that one trusted, fixed source, never user- or attacker-supplied input.
- It only runs during a local/CI invocation of `npm run lighthouse`, never as part of the deployed site or any request-handling code path.

**Revisit this** if `@lhci/cli` ships a release that bumps its Puppeteer/extract-zip chain, or if `extract-zip` itself ships a patched version — check `npm view extract-zip versions` and the GitHub advisory (`gh api graphql` query above) periodically.

### How to re-check

```bash
gh auth switch --user M-Hammad-Faisal   # the repo-owning account has access; a collaborator account may not
gh api graphql -f query='
query {
  repository(owner: "M-Hammad-Faisal", name: "code-mage") {
    vulnerabilityAlerts(first: 20, states: OPEN) {
      nodes {
        securityVulnerability {
          severity
          package { name ecosystem }
          firstPatchedVersion { identifier }
        }
        securityAdvisory { summary }
      }
    }
  }
}'
```
