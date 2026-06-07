# ADR 0019: Per-package Keep a Changelog with manual authoring

- **Status:** Accepted
- **Date:** 2026-06-06

## Context

As packages approach their first versioned releases, there is a need to communicate what changed between versions — both for consumers within the monorepo and for future maintainers. Each package (`realm`, `arcane-ui`, `sigil`, `eslint-config`, `stylelint-config`) has an independent version and release cadence (see ADR 0020), so changelogs must be maintained per package.

Two automated approaches were considered and rejected:

- **`git-cliff` generating from conventional commits** — the natural fit given the existing commitlint enforcement, and natively targets Keep a Changelog format. However, in this monorepo, path-based filtering is required to scope commits per package. `git-cliff`'s `--include-path` is a positive filter only; excluding commits that touch multiple packages simultaneously requires layering `--exclude-path` for every other package, and commits that affect a package through out-of-root files (CI workflows, root configs) fall outside the path boundary entirely. The configuration is fragile and grows with the monorepo.
- **Changesets (`@changesets/cli`)** — developers write a separate changeset file per PR alongside the commit. Produces rich prose entries, but duplicates the communication already invested in conventional commit messages. Two parallel descriptions of the same change is overhead without clear benefit.

## Decision

Each package and app has a `CHANGELOG.md` in [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format. Entries are written manually by the developer as part of the PR that introduces the change. Updating the changelog is a convention enforced by code review, not by CI or pre-commit hooks — not every commit warrants a user-facing entry, and automated gates cannot make that judgment.

The `[Unreleased]` section accumulates changes between releases. On release, it is promoted to a versioned entry by the release script (see ADR 0020). Each file maintains Keep a Changelog reference links at the bottom, updated by the release script on each release:

- Versioned entries (e.g. `[0.1.0]`) link to their GitHub Release page (`releases/tag/<package>@<version>`).
- `[Unreleased]` links to `compare/<package>@<last-version>...HEAD`, showing all commits since the last release. Before any release exists, the `[Unreleased]` link is omitted entirely.
