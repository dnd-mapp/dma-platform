# ADR 0014: Build-once image promotion for Realm

- **Status:** Accepted
- **Date:** 2026-06-04

## Context

Realm is containerised as a static Angular SPA served by nginx. The CI pipeline builds the image on the PR (tagged `pr-{N}`), runs E2E tests against it, and on merge to `main` needs to make that image available as `next`.

The naive approach is to rebuild on merge. This is simpler but means `next` could technically differ from what E2E verified — transient build environment differences, a dependency that changed between PR push and merge, or a cache miss producing different output.

## Decision

The Docker image is built exactly once, on the PR. E2E runs against the `pr-{N}` image. On merge to `main`, `docker buildx imagetools create` retags `pr-{N}` as `next` without rebuilding. `next` is therefore the exact bits that passed E2E. The PR number is recovered from the merge commit via the GitHub API.

On PR close without merge, `pr-{N}` is deleted.

## Considered Options

**Rebuild on merge** — simpler CI (no PR number lookup, no `imagetools create` step), but `next` is a fresh build, not the verified one. Rejected because the "verified bits" guarantee is the whole point of a promotion model.
