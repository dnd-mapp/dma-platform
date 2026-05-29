# ADR 0001: Use mise for runtime and toolchain version management

- **Status:** Accepted
- **Date:** 2026-05-29

## Context

The monorepo requires a consistent Node.js and pnpm version across all contributors and CI environments. Several tools can enforce or manage this:

- **Corepack** (built into Node) — pins the package manager via the `packageManager` field in `package.json`; can auto-install the pinned version
- **Volta** — pins both Node and package manager versions in `package.json`; silently installs and switches versions per-project
- **mise** — a polyglot version manager (successor to asdf) that manages Node, pnpm, and any other tool; supports idiomatic version files including `package.json` (via `engines` / `devEngines`), so no separate mise config file is required
- **nvm / fnm** — Node-only version managers that read `.nvmrc`; require manual activation

## Decision

Use **mise** to manage Node and pnpm versions. pnpm is configured with `managePackageManagerVersions: false` so it only validates the version in use rather than installing or switching it. Required versions are declared in `package.json` via the `engines` and `devEngines` fields so that pnpm reports a clear error when the wrong versions are active.

## Consequences

- Contributors and CI must have mise installed and configured to activate the correct versions.
- pnpm will error (`engineStrict: true`) if the active Node version does not match, giving a clear signal to check mise.
- The `packageManager` field (Corepack) is intentionally omitted to avoid two competing tools fighting over pnpm version management.
- Version updates only require a change to `package.json`; mise reads the `engines` / `devEngines` fields directly via its idiomatic version file support.
