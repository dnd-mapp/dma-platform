# @dnd-mapp/release-script

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![node: >=24.0.0](https://img.shields.io/badge/node-%3E%3D24.0.0-339933?logo=nodedotjs&logoColor=white)](package.json)

Interactive release script for the D&D Mapp monorepo. Handles version bumps, changelog promotion, and release PR creation for any package or app in the workspace.

## Usage

```sh
moon run root:release
```

The script is compiled from TypeScript source to `scripts/release/` at the repo root and invoked through the `root:release` Moon task, which rebuilds the script automatically before running it.

## Release flow

1. **Select a package** — choose the package or app to release from a list of all workspace projects.
2. **Pick a version** — commits since the last tag are collected (filtered to the package's path) and a next version is suggested:
   - First release (no prior tag): `0.1.0`
   - Subsequent releases: semver bump derived from conventional commit types — `BREAKING CHANGE` or `!` → major, `feat` → minor, everything else → patch
3. **Confirm or override** — accept the suggestion or enter a version manually.
4. **Apply changes** — the script updates the package's files:
   - Bumps `version` in `package.json`
   - Promotes `[Unreleased]` in `CHANGELOG.md` to a versioned entry with today's date
   - Inserts a fresh empty `[Unreleased]` section above it
   - Updates the Keep a Changelog reference links at the bottom of the file
5. **Open a PR** — creates a branch `release/<project>-<version>` and opens a pull request targeting `main`.

## After the PR merges

A dedicated CI workflow (`release-merge`) takes over on merge:

- Extracts the package name and version from the branch name
- Creates a git tag `<name>@<version>` (e.g. `sigil@1.2.0`)
- Parses the versioned section from `CHANGELOG.md` and creates a GitHub Release from it
- For `realm` releases only: promotes the `dndmapp/realm:next` Docker image to the versioned tags

See [ADR 0020](../../docs/adr/0020-pr-based-monorepo-release-workflow.md) for the full architecture.
