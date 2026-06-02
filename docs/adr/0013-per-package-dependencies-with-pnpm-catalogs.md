# ADR 0013: Per-package dependency declarations with pnpm named catalogs

- **Status:** Accepted
- **Date:** 2026-06-02

## Context

All dependencies are currently declared in the root `package.json`. Individual workspace packages (`apps/realm`, `packages/arcane-ui`, `packages/sigil`, etc.) have `package.json` files with scripts but no declared dependencies. This means every package can import anything installed in the workspace without declaring it — the classic phantom dependency problem. It also makes the dependency graph invisible: there is no machine-readable record of which packages actually need Angular, which need Vitest, or which need Storybook.

pnpm's `verifyDepsBeforeRun: error` setting (already active in `pnpm-workspace.yaml`) will catch undeclared deps at runtime, but only once a package declares its own deps and the root no longer provides them as a side-effect.

Turborepo was previously considered (see ADR 0008) but rejected because affected detection relies on `package.json` workspace dependencies, which were not declared at the time. Adopting per-package declarations removes that limitation for any future reconsideration of task runner tooling.

## Decision

Each workspace package declares only the dependencies it directly uses. The root `package.json` retains only workspace-level orchestration tools: `husky`, `lint-staged`, `commitlint`, `prettier`, `markdownlint-cli2`, `@moonrepo/cli`, `eslint` (for root-level TS/JS files that belong to no moon project), and their associated config packages. All other dependencies move to the packages that consume them.

**Angular CLI placement:** `angular.json` lives at the root, and the root `package.json` exposes a `"ng": "ng"` convenience script, so `@angular/cli` is declared in the root `devDependencies` as well as in `packages/arcane-ui` and `apps/realm`. pnpm only places binaries from a package's own direct dependencies into that package's `node_modules/.bin` — workspace package dependencies are not propagated to the root. Each package that runs `ng` commands must therefore declare `@angular/cli` itself.

**Library peer dependencies:** `packages/arcane-ui` declares Angular runtime packages (`@angular/core`, `@angular/common`, `@angular/cdk`, `rxjs`, `tslib`) as `peerDependencies`. `apps/realm` satisfies them via its own `dependencies`. This follows the standard Angular library pattern and avoids bundling Angular twice. The existing `strictPeerDependencies: true` in `pnpm-workspace.yaml` enforces that every declared peer dependency is explicitly satisfied by the consumer.

**Named pnpm catalogs:** Version ranges are defined once in `pnpm-workspace.yaml` under named catalogs and referenced in package files as `catalog:<name>`. Catalogs are grouped by ecosystem upgrade boundary:

| Catalog      | Contents                                                      |
|:-------------|:--------------------------------------------------------------|
| `angular`    | `@angular/*`, `@angular-eslint/*`, `ng-packagr`               |
| `ngrx`       | `@ngrx/*`                                                     |
| `nestjs`     | `@nestjs/*`, `reflect-metadata`                               |
| `eslint`     | `eslint`, `typescript-eslint`, `eslint-config-prettier`       |
| `stylelint`  | `stylelint`, `stylelint-config-*`, `stylelint-order`          |
| `prettier`   | `prettier`, `prettier-plugin-*`                               |
| `storybook`  | `storybook`, `@storybook/*`                                   |
| `vitest`     | `vitest`, `@vitest/*`                                         |
| `playwright` | `playwright`, `@playwright/test`                              |
| `default`    | `rxjs`, `tslib`, `typescript`, `sass`, and other independents |

`rxjs` and `tslib` live in `default` rather than `angular` because NestJS also depends on them. Placing them in the `angular` catalog would require NestJS packages to reference `catalog:angular`, which is semantically wrong. The `default` catalog is the correct home for packages shared across multiple ecosystem upgrade boundaries.

## Consequences

- The moon project dependency graph (maintained in `moon.yml` files per ADR 0008) now aligns with `package.json` workspace dependencies. ADR 0008 explicitly noted that moon's `package.json` auto-detection was disabled because intra-monorepo dependencies were not declared there — that limitation is removed by this change.
- A future contributor seeing `@angular/cli` in `packages/arcane-ui/package.json` might wonder why it is there when `angular.json` is at the root. The answer is that each package which runs `ng` commands must declare `@angular/cli` itself — pnpm does not propagate workspace package binaries to the root.
- When a new inter-project dependency is introduced (e.g. a new package consuming `@dnd-mapp/sigil`), it must be declared in three places: `package.json` (workspace dep), `moon.yml` (`dependsOn`), and `tsconfig` (path alias if applicable). All three must be kept in sync.
- Adding a new ecosystem dependency (e.g. a new Angular package) requires a catalog entry in `pnpm-workspace.yaml` before it can be referenced in any `package.json`. This is intentional — it forces a conscious version decision at the point of introduction.
