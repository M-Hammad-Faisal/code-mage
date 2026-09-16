# TypeScript

## 2026-09-16 — verified via devblogs.microsoft.com/typescript + typescriptlang.org

**Current stable: TypeScript 7.0.2** (GA 2026-07-08) — a from-scratch **Go-native compiler rewrite** ("Corsa"/tsgo), ~8-12x faster builds. Preceded by TS 6.0 (March 2025) and 5.9 (Aug 2025).

**Critical nuance:** TS 7.0 is designed to behave identically to TS 6.0 on existing code — it's a compiler/tooling rewrite, not a language-semantics change. No tutorial content needed rewriting because of it; only the version pin in our sample `package.json` needed bumping.

### Confirmed still accurate in our content (`content/tutorials/prerequisites/02-typescript-for-testers.mdx`)

All fundamentals taught remain fully accurate and idiomatic for TS 7.0: `const`/`let`, primitive/array/union types, type inference, `async`/`await` and `Promise<T>`, interfaces with optional (`?`) properties, classes/constructors/`this`, `import`/`export`/`import type`, destructuring, template literals.

### Fixed this pass

- Sample `package.json` in `content/tutorials/prerequisites/01-nodejs-npm-terminal.mdx` pinned `typescript: ^5.9.3` — bumped to `^7.0.2` (current).
- Found and fixed a real bug in the TS cheat sheet: `function doSomething` and `const doSomething` declared in the same scope example — would throw `Identifier 'doSomething' has already been declared` if copy-pasted literally. Renamed the arrow-function version to `doSomethingArrow`.

### Worth mentioning for 2026 learners — not corrections, just enrichment candidates

- The `satisfies` operator — useful for typed test-data objects without type widening.
- `tsc` itself now runs natively/much faster under TS 7.0 — not directly relevant since our tutorials teach that test runners handle compilation, readers rarely invoke `tsc` manually.

### Sources

- https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/
- https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
- https://www.infoq.com/news/2026/08/typescript-7-released/
