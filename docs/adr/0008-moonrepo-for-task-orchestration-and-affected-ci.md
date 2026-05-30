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

**Project dependency graph:** Declare all project and task dependencies explicitly via `dependsOn` in each project's `moon.yml`. Do not rely on `package.json` workspace dependency auto-detection, as intra-monorepo dependencies are not declared there.

**Task definitions:** Moon tasks wrap existing `package.json` scripts (`command: "pnpm run <script>"`). The scripts in each `package.json` remain the canonical command definitions. Moon adds the dependency graph and affected-detection metadata on top.

**Workspace-level tasks:** A root moon project (path `.`) owns tasks that are not tied to any specific package — `format` (Prettier check), `lint:ts` (TypeScript root check), and `lint:md` (Markdown lint). These tasks have broadly-scoped inputs so moon can correctly compute affected status.

**CI structure:** Replace the multi-job GitHub Actions workflows with a single `moon ci --affected` job. The E2E gate (previously enforced by a `needs:` dependency between GitHub Actions jobs) is enforced by declaring `dependsOn` on the `e2e/realm:test` moon task, pointing at `realm:build`, `realm:lint`, and `realm:test`. Moon will not schedule the E2E task until all declared dependencies succeed. This supersedes ADR 0005.

**Remote caching:** Disabled for now. Moonbase (moon's hosted remote cache) has been sunset. A self-hosted alternative using `bazel-remote` is under investigation (see `docs/handoffs/bazel-remote-cache-investigation.md`). Until a solution is adopted, moon provides affected-only task execution but no cross-run cache persistence in CI.

## Consequences

- CI workflows are simplified to a single job per workflow, eliminating duplicate workspace setup steps.
- Only tasks for projects affected by a given change are executed. A change to `packages/sigil` triggers tasks for sigil, Arcane UI, Realm, and the Realm E2E suite — and nothing else.
- The E2E gate is maintained: moon will not run `e2e/realm:test` if any of its `dependsOn` tasks fail, preserving the intent of ADR 0005.
- Each project requires a `moon.yml` file. New projects must declare their `dependsOn` relationships at creation time; omitting them will cause moon to treat the project as isolated and miss affected propagation.
- The project dependency graph is maintained in `moon.yml` files rather than `package.json`. This is a second place where dependencies are expressed (alongside `tsconfig` path aliases), requiring both to be kept in sync when a new inter-project dependency is introduced.
- Without remote caching, CI always runs cold. The affected-only model reduces the number of tasks executed, but individual task results are not reused across runs.
- `moon ci --affected` compares against the base branch ref by default. Both `pull-request` and `push-main` workflows use the same command; affected detection on `push-main` runs against the previous commit on main.
