# Realm — E2E tests

[![Playwright: 1.60](https://img.shields.io/badge/Playwright-1.60-2EAD33?logo=playwright&logoColor=white)](../../package.json)

End-to-end tests for [`apps/realm`](../../apps/realm) using Playwright. Tests run against a real Chromium browser.

## Getting started

See [Getting started](../../README.md#getting-started) in the root README.

## Running tests

### Locally (dev server)

```sh
pnpm moon run realm-e2e:e2e-ci
```

Playwright starts `apps/realm` automatically via its `webServer` config and reuses an already-running dev server if one is available.

### Against the Docker image (CI stack)

Spin up the compose stack first, then run the tests with `CI=true` so Playwright targets `https://localhost` instead of the dev server:

```sh
PR_NUMBER=<n> docker compose -f .docker/compose.e2e.yml up -d
CI=true pnpm moon run realm-e2e:e2e-ci
docker compose -f .docker/compose.e2e.yml down
```

`PR_NUMBER` must match an image tag that exists in Docker Hub (`dndmapp/realm:pr-<n>`).

HTML reports are written to `reports/e2e/realm/` and test artifacts (screenshots, traces) to `reports/e2e/realm/test-results/` in the repo root.
