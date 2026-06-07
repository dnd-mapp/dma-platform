# ADR 0020: PR-based monorepo release workflow

- **Status:** Accepted
- **Date:** 2026-06-06

## Context

Each package has an independent version and requires a repeatable process for cutting releases, creating git tags, publishing GitHub Releases, and — for `realm` — producing versioned Docker images. With five packages at independent cadences, an ad-hoc manual process is error-prone: version bumps, changelog promotion, tag creation, and release notes all need to happen in the right order and stay consistent.

## Decision

Releases are initiated via an interactive TypeScript release script (`packages/release-script`, compiled to `scripts/` at the repo root) invoked through a moon task. The script:

1. Prompts the developer to select a package or app to release.
2. Collects commits since the last tag for that package (filtered by the package's path) and suggests a next version: `0.1.0` for the first release (no prior tag), or a semver bump derived from conventional commit types for subsequent releases — `BREAKING CHANGE` or `!` → major, `feat` → minor, everything else → patch.
3. The developer confirms or overrides the suggested version.
4. The script bumps the `version` field in the package's `package.json`, promotes `[Unreleased]` in its `CHANGELOG.md` to the versioned entry with today's date, inserts a fresh empty `[Unreleased]` section, and updates the Keep a Changelog reference links at the bottom of the file: the new versioned entry gets a `releases/tag/<package>@<version>` link; `[Unreleased]` gets a `compare/<package>@<version>...HEAD` link (see ADR 0019 for the full link convention).
5. Creates a branch `release/<project>-<version>` and opens a pull request targeting `main`.

After the release PR is merged, a dedicated CI workflow (`release-merge`) triggers on `pull_request: closed` where the PR is merged and the source branch matches `release/**`. The workflow:

- Extracts the package name and version from the branch name.
- Creates the git tag `<name>@<version>` (e.g. `sigil@1.2.0`).
- Parses the versioned section from the package's `CHANGELOG.md` and uses it as the GitHub Release body.
- Creates a GitHub Release. If the version string contains a `-` pre-release identifier, the release is marked as a pre-release.
- For `realm` releases only: promotes `dndmapp/realm:next` to `dndmapp/realm:latest`, `dndmapp/realm:<major>`, `dndmapp/realm:<major>.<minor>`, and `dndmapp/realm:<version>` — extending the build-once promotion chain established in ADR 0014.

**Tag format:** `<package-name>@<version>` (e.g. `sigil@1.2.0`, `realm@0.1.0`). The `@` separator is valid in git tags and is the conventional choice for JS/TS monorepos.

## Consequences

- Releases are always traceable to a merged PR, giving reviewers a gate before a tag is created.
- The `release-script` package is itself subject to the same conventions: it has its own `CHANGELOG.md`, version, and is released via the same workflow.
- Docker image promotion for `realm` happens in the release-merge workflow immediately on PR merge, before any subsequent PR can advance `:next` — eliminating the race condition that would exist if promotion were deferred to a separate tag-push trigger.
- The release script must be kept up-to-date as new packages are added to the monorepo.
