# ADR 0008: Use moonrepo for task orchestration and affected-only CI runs

- **Status:** Accepted
- **Date:** 2026-05-30

## Context

As the monorepo grows, running every lint, build, test, and E2E task on every CI trigger becomes wasteful. A PR that changes only `packages/sigil` should not need to rebuild and retest `apps/realm`, `apps/gatekeeper`, or the E2E suite — unless the change transitively affects those projects.

The current CI (`.github/workflows/pull-request.yml`, `.github/workflows/push-main.yml`) runs all tasks unconditionally across all projects. There is no task graph, no dependency-aware scheduling, and no caching. Parallelism is achieved by manually splitting tasks into separate GitHub Actions jobs, which requires re-running the workspace setup step in each job.

Several task orchestration tools were considered:

- **Nx** — deep Angular CLI integration (reads `angular.json` for the project graph), but adds significant tooling weight and tightly couples the repo to the Nx ecosystem.
- **Turborepo** — lightweight and pnpm-native, but affected detection is based solely on `package.json` workspace dependencies. This repo does not declare intra-monorepo dependencies in `package.json` (the Angular build resolves them via `tsconfig` path aliases), so Turborepo's affected detection would not work without first restructuring all `package.json` files.
- **moonrepo** — task graph is declared explicitly in per-project `moon.yml` files (`dependsOn`), independent of `package.json`. Works correctly even when workspace packages do not formally declare each other as dependencies. Provides affected-only task execution, task-level caching, and first-class CI integration.
- **Status quo** — keep manual GitHub Actions jobs, add new jobs by hand as the monorepo grows. Does not scale; duplicate setup steps per job; no affected detection.

## Decision

Adopt **moonrepo** for task orchestration and affected-only CI runs, with the following configuration choices:

**Toolchain:** Set `node.version: inherit` in `.moon/toolchain.yml`. Moon defers to whatever Node version is active in the shell. Mise continues to activate the correct version (see ADR 0001). Moon does not manage the toolchain.

**Project IDs:** Use the npm slug form of each package name (strip `@dnd-mapp/`): `realm`, `sigil`, `eslint-config`, `stylelint-config`, `realm-e2e`, `root`.

**Project dependency graph:** Declare all project and task dependencies explicitly via `dependsOn` in each project's `moon.yml`. Do not rely on `package.json` workspace dependency auto-detection, as intra-monorepo dependencies are not declared there.

The project graph for existing projects is:

```text
eslint-config  ──┐
stylelint-config ─┼──► realm ──► realm-e2e
sigil ───────────┘
```

`eslint-config` and `stylelint-config` appear in the `dependsOn` of every project that uses them for linting, so that changes to shared lint config correctly mark consumer projects as affected. `sigil` is a structural node only — it has no moon tasks in the current scaffold but participates in affected propagation.

**Task definitions:** Moon tasks wrap existing `package.json` scripts (`command: "pnpm run <script>"`). The scripts in each `package.json` remain the canonical command definitions. Moon adds the dependency graph and affected-detection metadata on top.

**Task naming:** Task names use kebab-case with no colons (`:` is reserved in moon's `project:task` syntax). Scripts are renamed to match: `lint` → `lint-ts` (ESLint), `lint:ts` → `lint-ts`, `lint:md` → `lint-md`.

**Task distribution:**

- `lint-ts` (ESLint) runs per project, scoped to each project's own source. The `root` project also owns a `lint-ts` task covering root-level JS/TS files (e.g. `eslint.config.mjs`) as tooling scripts accumulate there.
- `lint-css` (Stylelint) runs per project where applicable (currently only `realm`).
- `lint-md` (markdownlint) runs in the `root` project only — markdown is a documentation concern that lives at the repo root (`docs/`, root-level `*.md` files).
- `format-check` (Prettier) runs in the `root` project only — Prettier operates across the entire workspace in one pass; splitting it per project buys nothing and complicates path scoping.

**Root task inputs:** Root tasks declare explicit `inputs` so moon's affected detection is precise:

- `lint-ts`: root-level `*.{js,mjs,cjs,ts}` files only.
- `lint-md`: `**/*.md` (repo-wide, since markdownlint covers all documentation).
- `format-check`: all files Prettier checks (repo-wide).

**Dev-only tasks:** `start` and `test-dev` tasks are marked `runInCI: false` in all projects that define them.

**Playwright install:** A `playwright-install` task lives in the `root` project and wraps `pnpm playwright-install`. All test tasks that require a browser runtime — `realm:test`, `realm:test-dev`, `realm-e2e:test`, `realm-e2e:test-dev` — declare it as a dependency. This centralises browser installation and ensures it is never skipped when any test target runs, whether in CI or locally.

**Workspace-level tasks:** The `root` project (path `.`) owns `format-check`, `lint-ts`, `lint-md`, and `playwright-install`.

**CI structure:** Replace the multi-job GitHub Actions workflows with a single `moon ci --affected` job. The E2E gate (previously enforced by a `needs:` dependency between GitHub Actions jobs) is enforced by declaring `dependsOn` on the `realm-e2e:test` moon task:

- `realm:build`
- `realm:lint-ts`
- `realm:lint-css`
- `realm:test`

Moon will not schedule `realm-e2e:test` until all four pass. This supersedes ADR 0005.

**Pipeline settings:** Left at moon defaults. No explicit concurrency tuning — the scheduler uses available CPU cores on the runner.

**Remote caching:** Enabled via a self-hosted `bazel-remote` instance accessible over the Tailscale tailnet. See ADR 0017.

## Consequences

- CI workflows are simplified to a single job per workflow, eliminating duplicate workspace setup steps.
- Only tasks for projects affected by a given change are executed. A change to `packages/sigil` triggers tasks for sigil, Arcane UI, Realm, and the Realm E2E suite — and nothing else.
- The E2E gate is maintained: moon will not run `realm-e2e:test` if any of its four `dependsOn` tasks fail, preserving the intent of ADR 0005.
- Each project requires a `moon.yml` file. New projects must declare their `dependsOn` relationships at creation time; omitting them will cause moon to treat the project as isolated and miss affected propagation.
- The project dependency graph is maintained in `moon.yml` files rather than `package.json`. This is a second place where dependencies are expressed (alongside `tsconfig` path aliases), requiring both to be kept in sync when a new inter-project dependency is introduced.
- CI runs benefit from remote caching via `bazel-remote` (see ADR 0017). Tasks with declared `outputs` upload their results on a cache miss and retrieve them on a hit, reducing cold-run cost for build and test tasks.
- `moon ci --affected` compares against the base branch ref by default. Both `pull-request` and `push-main` workflows use the same command; affected detection on `push-main` runs against the previous commit on main.
- `lint-ts`, `lint-md`, and other script names that previously used colons are renamed in `package.json` to align with moon task IDs. Any external references (CI steps, `lint-staged` config, documentation) must be updated accordingly.
