# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `./node` entry point — TypeScript strict type-checked rules (`typescript-eslint` `strictTypeChecked` preset) with `eslint-config-prettier`, for use in Node.js and CLI packages
- `@dnd-mapp/eslint-config` package scaffolded with two entry points: the default (`.`) exposes a base config that applies `eslint/js` recommended rules to `**/*.{js,mjs,cjs}` files; the `./angular` entry point extends the base with `typescript-eslint` type-checked rules for TypeScript source files, Angular template recommended and accessibility rules for HTML templates, and `eslint-config-prettier` to disable formatting-conflicting rules
- `moon.yml` task configuration for Moonrepo, exposing a `lint-ts` task backed by `pnpm lint-ts`; inputs are scoped to `src/**/*.mjs` and `eslint.config.mjs` so Moon's cache is correctly invalidated on source changes

### Changed

- Minimum peer dependency versions raised: `eslint` from `>=9.0.0` to `>=10.0.0`, `eslint-config-prettier` from `>=9.0.0` to `>=10.0.0`
- Node.js engine requirement raised from `>=18.18.0` to `>=24.0.0` to match the monorepo's pinned toolchain
- `lint` npm script renamed to `lint-ts` for consistency with other Moonrepo-managed packages
- `devDependencies` migrated to pnpm catalog references (`catalog:eslint` and `catalog:`) per ADR 0013, delegating version pinning to the workspace-level catalog
