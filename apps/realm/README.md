# Realm

[![Angular: 21.2](https://img.shields.io/badge/Angular-21.2-DD0031?logo=angular&logoColor=white)](../../package.json)
[![TypeScript: 5.9](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](../../package.json)
[![Vitest: 4.1](https://img.shields.io/badge/Vitest-4.1-6E9F18?logo=vitest&logoColor=white)](../../package.json)

The main frontend client for D&D Mapp. A single Angular SPA used by both Players and Dungeon Masters — role gates DM-only sections within the same app. Communicates with the backend via REST API and via WebSockets for real-time VTT sessions.

## Getting started

See [Getting started](../../README.md#getting-started) in the root README.

## Running the app

```sh
pnpm --filter @dnd-mapp/realm start
```

The app will be available at `https://realm.dnd-mapp.localhost`.

## Running tests

| Command                                  | Description               |
|------------------------------------------|---------------------------|
| `pnpm --filter @dnd-mapp/realm test-ci`  | Single run, no UI         |
| `pnpm --filter @dnd-mapp/realm test-dev` | Watch mode with Vitest UI |

Tests are run in a real Chromium browser via Playwright. Coverage reports are written to `coverage/apps/realm/` and HTML test reports to `reports/apps/realm/`.

End-to-end tests live in [`e2e/realm`](../../e2e/realm) and are run separately via `pnpm --filter @dnd-mapp/realm-e2e test`.
