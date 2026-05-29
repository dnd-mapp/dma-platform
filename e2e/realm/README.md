# Realm — E2E tests

[![Playwright: 1.60](https://img.shields.io/badge/Playwright-1.60-2EAD33?logo=playwright&logoColor=white)](../../package.json)

End-to-end tests for [`apps/realm`](../../apps/realm) using Playwright. Tests run against a real Chromium browser.

## Getting started

See [Getting started](../../README.md#getting-started) in the root README.

## Running tests

```sh
pnpm --filter @dnd-mapp/realm-e2e test
```

Playwright starts `apps/realm` automatically via its `webServer` config. Locally it reuses an already-running dev server if one is available; in CI it always starts a fresh one.

HTML reports are written to `reports/e2e/realm/` and test artifacts (screenshots, traces) to `reports/e2e/realm/test-results/` in the repo root.
