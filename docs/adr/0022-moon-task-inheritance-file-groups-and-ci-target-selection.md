# ADR 0022: Moon task inheritance, file groups, and CI target selection

- **Status:** Accepted
- **Date:** 2026-06-07
- **Partially supersedes:** [ADR 0008](0008-moonrepo-for-task-orchestration-and-affected-ci.md) (CI structure and pipeline configuration)
- **Partially superseded by:** [ADR 0023](0023-docker-build-task-and-e2e-affected-detection.md) (docker job gate condition)

ADR 0008 adopted moonrepo for task orchestration and described a single-job CI structure where the E2E gate is enforced by moon's `dependsOn`. The actual implementation diverged: the CI uses three sequential GitHub Actions jobs (`ci → docker → e2e`) because the Docker build requires GHA-specific setup (QEMU, Buildx, Docker Hub auth, PR tag derivation from `${{ github.event.number }}`) that cannot be expressed as a moon task. This ADR formalises the three-job structure and introduces task inheritance and file groups to eliminate input repetition across project `moon.yml` files.

## CI structure

Three GitHub Actions jobs run in sequence, with GHA `needs:` enforcing ordering:

1. **`ci`** — runs `moon ci :build :test-ci :lint-ts :lint-css :storybook-build :lint-md :format-check`
2. **`docker`** — builds and pushes the Docker image; gated on `ci` success and `realm:build` being affected
3. **`e2e`** — runs `moon ci :e2e-ci`; gated on `docker` success

The `:task-name` syntax fans out to every project that defines a matching task, respecting moon's affected detection and task-level caching within each job. The E2E gate is enforced by GHA `needs:`, not moon `dependsOn`, because Docker is not a moon task.

`runInCI: false` is not used to exclude `e2e-ci` from the main CI job. That flag also disables `moon run`, making the task unavailable for manual invocation. Target selection via `:task-name` is the correct mechanism.

## Task inheritance

Three tasks are defined in `.moon/tasks.yml` and inherited by all projects:

- **`lint-ts`** — `pnpm lint-ts`; inputs: `@globs(sources)`, `@globs(tests)`, `@globs(configs)`, `@globs(eslint-config-files)`, `@globs(typescript-base-configs)`
- **`lint-css`** — `pnpm lint-css`; inputs: `@globs(sources)`, `@globs(configs)`, `@globs(stylelint-config-files)`
- **`test-ci`** — `pnpm test-ci`; deps: `root:playwright-install`; inputs: `@globs(sources)`, `@globs(tests)`, `@globs(configs)`, `@globs(typescript-base-configs)`

`build`, `e2e-ci`, and `storybook-build` remain project-local — their inputs, outputs, and deps are too project-specific to share meaningfully.

Projects override inherited tasks only where they differ: command flags (e.g. `arcane-ui:lint-css` adds `--aei`), additional deps (e.g. `realm:lint-ts` adds `arcane-ui:build` for type checking), or a completely different input shape (e.g. `root:lint-ts`). All other projects define their file groups and inherit without further changes.

`sigil` participates in `:lint-ts` with a real implementation linting `scripts/*.mjs` via its own `eslint.config.mjs`. It does not opt out.

## File groups

**Workspace-level** (`.moon/workspace.yml`):

| Name | Paths |
| --- | --- |
| `eslint-config-files` | `/packages/eslint-config/src/**/*.mjs` |
| `stylelint-config-files` | `/packages/stylelint-config/src/**/*.mjs` |
| `typescript-base-configs` | `/tsconfig.base.json`, `/tsconfig.json` |

**Project-level** (each project's `moon.yml`):

| Name | Meaning |
| --- | --- |
| `sources` | Primary TypeScript/HTML source files, excluding test and output directories |
| `tests` | Test files (e.g. `**/test/**/*.ts`); empty for projects without a dedicated test directory |
| `configs` | Project-local config files: `tsconfig*.json`, `angular.json`, `vitest.config.mts`, etc. |

`vitest.config.mts` is excluded from `sources` automatically — the `**/*.{ts,html}` pattern does not match `.mts` — and belongs in `configs`.

Realm's `sources` uses a broad pattern (`**/*.{ts,html}` excluding `dist/`, `.angular/`, `coverage/`, `reports/`) rather than per-directory enumeration. This captures `src/`, `core/`, and future Angular feature module directories without requiring `moon.yml` updates as the app grows.

`implicitInputs` and `implicitDeps` are not used. Shared inputs belong in inherited task definitions, scoped to the tasks that need them. No task genuinely requires a universal prerequisite.

## Parallelization

Moon supports shard-based parallelization across multiple GHA runners via `--index` and `--total` flags on `moon ci`. This is not enabled. Each runner pays full workspace setup cost (checkout, `pnpm install`, Tailscale, bazel-remote connection); for the current 7-project task graph this overhead would likely negate the benefit. The remote cache (ADR 0017) keeps single-runner cold runs fast enough.

Revisit when `moon ci` wall-clock time on a full cache miss consistently exceeds 8 minutes on a single runner.
