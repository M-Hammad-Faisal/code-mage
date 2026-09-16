# Content R&D

This directory is a running record of research done to keep `content/blog/` and `content/tutorials/` technically accurate. Each file below tracks one tool: its current version as of the last check, what changed recently, what our content says about it, and open items to revisit.

**Why this exists:** these tools (Playwright, Cypress, WebdriverIO, TypeScript, Patchright) ship fast. Re-deriving "what's current" from scratch every audit is wasteful — this is the accumulated memory of that research so future passes can diff against it instead of starting cold.

**How to use it:** before auditing a tool's content again, read its file here first. Update the "Last verified" date and log new findings each time you re-check — don't just overwrite old entries, append a dated section so we can see the tool's trajectory over time.

| File | Tool | Last verified |
|---|---|---|
| [playwright.md](playwright.md) | Playwright | 2026-09-16 |
| [cypress.md](cypress.md) | Cypress | 2026-09-16 |
| [webdriverio.md](webdriverio.md) | WebdriverIO | 2026-09-16 |
| [typescript.md](typescript.md) | TypeScript | 2026-09-16 |
| [patchright.md](patchright.md) | Patchright | 2026-09-16 |
| [github-actions.md](github-actions.md) | GitHub Actions (CI actions used across tutorials) | 2026-09-16 |
