# ADR 0004: ESLint flat config with a shared `@dnd-mapp/eslint-config` package

- **Status:** Accepted
- **Date:** 2026-05-29

## Context

The monorepo will host Angular apps (Realm), an Angular component library (Arcane UI), a NestJS auth server (Gatekeeper), and shared packages. Each workspace has different linting needs: Angular workspaces require component and template rules; the NestJS workspace requires only TypeScript rules. All workspaces share a common TypeScript base and must integrate with Prettier without rule conflicts.

ESLint 9 introduced flat config (`eslint.config.*`) as the default, replacing the cascading `.eslintrc` system. Angular CLI integrates ESLint via `@angular-eslint/builder:lint` and reads a workspace-level config file.

## Decision

Use **ESLint 9 flat config** with `.mjs` config files throughout. Shared rules live in a workspace package, `packages/eslint-config` (`@dnd-mapp/eslint-config`), with two entry points exposed via the `package.json` exports map:

- **`@dnd-mapp/eslint-config`** — TypeScript base: `recommendedTypeChecked` + `stylisticTypeChecked` from `typescript-eslint`, and `eslint-config-prettier` to suppress formatting rules.
- **`@dnd-mapp/eslint-config/angular`** — Angular overlay: `@angular-eslint/recommended`, `@angular-eslint/template/recommended`, and `@angular-eslint/template/accessibility` on top of the base.

Each workspace owns an `eslint.config.mjs` that imports the relevant entry point. Angular workspaces (Realm, Arcane UI) are linted via `ng lint`; all other workspaces (Gatekeeper, root config files) are linted via a `lint:ts` script that calls ESLint directly.

## Consequences

- Adding a new Angular workspace means creating an `eslint.config.mjs` that imports `@dnd-mapp/eslint-config/angular` and adding a `lint` architect entry to `angular.json`.
- Adding a new non-Angular workspace means creating an `eslint.config.mjs` that imports `@dnd-mapp/eslint-config` and adding a `lint:ts` script to that workspace's `package.json`.
- Type-aware rules (`recommendedTypeChecked`, `stylisticTypeChecked`) require `parserOptions: { project: true }` in each workspace config, pointing ESLint at the workspace's `tsconfig.json`.
- `eslint-config-prettier` is applied in the base so formatting conflicts are suppressed for all consumers automatically.
- The shared package ships pre-built JS; workspaces import it as a regular dependency, so no transpilation step is needed at lint time.
