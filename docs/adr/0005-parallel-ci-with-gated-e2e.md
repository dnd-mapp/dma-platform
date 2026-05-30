# ADR 0005: Parallel CI jobs with E2E gated behind all other checks

- **Status:** Superseded by [ADR 0008](0008-moonrepo-for-task-orchestration-and-affected-ci.md)
- **Date:** 2026-05-29

## Context

As the monorepo grows, CI needs to provide fast, clear feedback. Running checks sequentially means a lint failure blocks test results; running everything in parallel means an E2E suite (and future Docker builds) may run against code that cannot compile or does not pass static checks — wasting expensive runner time.

## Decision

Structure CI as two sequential stages:

**Stage 1 — independent checks (run in parallel):**

- `lint` — `ng lint` for Angular workspaces + `lint:ts` for others
- `format` — Prettier format check and Markdown lint
- `build` — application build(s)
- `test` — Vitest unit tests

**Stage 2 — integration checks (only if all Stage 1 jobs pass):**

- `e2e` — Playwright end-to-end tests

Future expensive jobs (Docker image builds, deployment smoke tests) are added to Stage 2 or later, never to Stage 1.

## Consequences

- A lint or type-check failure surfaces immediately without waiting for tests to finish, and without wasting E2E runner time.
- E2E tests always run against code that compiles, passes static analysis, and passes unit tests.
- Docker build jobs (planned) will be added to Stage 2 or a Stage 3 gated on E2E, ensuring images are only built from verified code.
- Adding a new Stage 1 job (e.g., a new workspace's lint or build step) is always safe — it runs in parallel and does not affect Stage 2 timing until Stage 1 completes.
