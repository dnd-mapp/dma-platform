# ADR 0006: Husky and lint-staged for pre-commit enforcement

- **Status:** Accepted
- **Date:** 2026-05-30

## Context

Linting and formatting are enforced in CI, but failures are only visible after a push. Adding local git hooks catches violations at commit time. Husky v9 manages the hooks; lint-staged scopes tool runs to staged files only, keeping commits fast.

## Decision

Two hooks are installed:

**`pre-commit`** runs lint-staged, which executes per file type: Prettier (write) on all staged files; ESLint, stylelint, and markdownlint-cli2 (report only) on their respective file types.

**`commit-msg`** runs commitlint, extending `@commitlint/config-conventional` with two overrides:

- `subject-case` is set to allow `sentence-case`. The default config bans it, but the project convention (matching the `/commit` skill) requires a capitalized subject (`Add foo`, not `add foo`).
- `header-max-length` is lowered from 100 to 72 to align with the body wrap limit used by the `/commit` skill, rather than the conventional config's more permissive default.

Husky is disabled in CI via `HUSKY=0` in the `setup-workspace` action so that `pnpm install` does not attempt to install hooks on runners.

## Consequences

- Because mise manages the Node and pnpm versions (ADR 0001), each contributor must create `~/.config/husky/init.sh` with `eval "$(mise activate bash)"` so that hooks run in a shell where the correct tool versions are on `PATH`. This file lives outside the repo and must be set up manually — see README.md.
- The `@commitlint/config-conventional` base is intentionally kept so future rule additions remain compatible with the Conventional Commits ecosystem.
