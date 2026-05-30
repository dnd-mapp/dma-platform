# Handoff: Investigate bazel-remote as Moon self-hosted cache backend

## Focus

Determine whether `bazel-remote` can serve as a self-hosted remote cache backend for moonrepo, and what a production-ready setup would look like for this project.

## Project context

- **Repo:** `dma-platform` — Angular (v21) + NestJS pnpm monorepo, GitHub-hosted
- **Workspace packages:** `apps/realm` (Angular SPA), `apps/gatekeeper` (NestJS, not yet scaffolded), `packages/sigil` (design tokens), `packages/arcane-ui` (Angular lib, not yet scaffolded), `packages/eslint-config`, `packages/stylelint-config`, `e2e/realm` (Playwright)
- **CI:** GitHub Actions (`.github/workflows/pull-request.yml`, `.github/workflows/push-main.yml`)
- **Toolchain:** mise manages Node 24.16.0 + pnpm 10.34.1 (see `docs/adr/0001-mise-for-toolchain-version-management.md`)

## Decisions already made (do not re-litigate)

These came out of a `/grill-with-docs` session on adopting moonrepo:

| # | Decision                                                                                                                                                                          |
|:-:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | CI will use a **single `moon ci --affected` job** (collapsing the two-stage GitHub Actions model). E2E gate moves from a GH Actions `needs:` boundary to a moon task `dependsOn`. |
| 2 | **mise stays** as toolchain manager. Moon will use `node.version: inherit` in `.moon/toolchain.yml`.                                                                              |
| 3 | Project + task dependency graph declared via **explicit `dependsOn` in `moon.yml`** (not inferred from `package.json` deps, which are not declared between workspace packages).   |
| 4 | Moon tasks will **wrap existing `package.json` scripts** (`command: "pnpm run <script>"`).                                                                                        |
| 5 | **No CI caching for now.** Moonbase is discontinued. Remote caching deferred pending this investigation.                                                                          |

## Why bazel-remote

Moon's CI docs warn that `actions/cache` with static keys doesn't work reliably — task hashes change between runs with no invalidation mechanism. Moonbase (moon's hosted remote cache) has been sunset. A self-hosted alternative is needed. `bazel-remote` was proposed as a candidate because it implements the Bazel Remote Execution API (REAPI), which moon may support.

## What to investigate

1. **Protocol compatibility:** Does moon support the Bazel Remote Execution API / Remote Cache API (gRPC or HTTP/REST)? Or does moon use a proprietary protocol?

   - Start at the moonrepo workspace config docs (remote cache section) and the CI guide: [workspace config](https://moonrepo.dev/docs/config/workspace) and [CI guide](https://moonrepo.dev/docs/guides/ci)

2. **bazel-remote interface:** What protocol does bazel-remote expose? Is it compatible with whatever moon expects?
3. **Self-hosted feasibility for a small team:** Where would bazel-remote run? Options: persistent VM, cloud container, or GitHub Actions service container (ephemeral — probably insufficient). What storage backend is needed (local disk, S3, GCS)?
4. **GitHub Actions access model:** The intended policy is `pull-request` workflows read from cache, `push-main` writes to it. Does moon or bazel-remote support this kind of access control?
5. **Alternatives:** If bazel-remote is incompatible, what other self-hosted backends does moon support? (Plain S3-compatible store? Custom HTTP cache?)

## Recommended next steps

1. Fetch moonrepo workspace config docs and find the `remoteCache` / `cache` configuration block — note which backends and protocols are listed.
2. Check whether moon exposes a Bazel-compatible cache client or only moonbase.
3. **If compatible:** sketch the moon workspace config changes and a minimal bazel-remote deployment (Docker, storage backend, GitHub Actions wiring).
4. **If incompatible:** identify moon's actual remote cache protocol and list any open-source servers that implement it, or propose the next-best alternative.

## Suggested skills for the next session

- `/grill-with-docs` — if a caching decision is reached, use it to validate the approach and produce an ADR

## Key files for context

- `docs/adr/` — all existing ADRs (especially `0001` and `0005`)
- `.github/workflows/pull-request.yml`, `.github/workflows/push-main.yml`
- `CONTEXT.md`
