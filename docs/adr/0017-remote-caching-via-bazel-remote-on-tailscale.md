# ADR 0017: Remote caching via bazel-remote on Tailscale tailnet

- **Status:** Accepted
- **Date:** 2026-06-04

## Context

ADR 0008 adopted Moon for task orchestration but deferred remote caching because Moonbase (Moon's hosted cache service) was sunset. Without remote caching, every CI run starts cold: task outputs are never reused across runs even when inputs are unchanged. This is particularly costly for Angular builds (`arcane-ui:build`, `realm:build`) and browser-based test runs (`arcane-ui:test-ci`, `realm:test-ci`), which are the slowest tasks in the pipeline.

A self-hosted `bazel-remote` container has been provisioned on the server. It implements the Bazel Remote Execution API (REAPI) over gRPC, which Moon v2 supports natively. Access to the container is restricted to the Tailscale tailnet; it is not reachable from the public internet.

Moon v2's remote caching applies to all tasks that declare `outputs` in their `moon.yml`. There is no per-task inclusion list — caching is all-or-nothing for output-bearing tasks.

## Decision

Enable Moon remote caching in CI against the self-hosted `bazel-remote` instance at `grpc://docker-bazel-remote:9092`.

**CI only:** Remote caching is intentionally not enabled for local development. The `MOON_REMOTE_HOST` environment variable is set only in CI workflows, never in any committed config file. Local runs never set this variable and therefore never attempt a remote connection.

**Tailscale for CI connectivity:** GitHub Actions runners are not on the tailnet by default. Each CI job joins the tailnet at the start of the run using the `tailscale/tailscale-github-action` with an OAuth client (`TS_OAUTH_CLIENT_ID`, `TS_OAUTH_SECRET`). Nodes join with the `tag:github-actions` ACL tag, which scopes their tailnet permissions. Ephemeral nodes created this way auto-expire when the job ends — no manual cleanup required.

The OAuth client requires two scopes: `devices:core` (read+write) and `keys:auth_keys` (read+write). The action generates an ephemeral pre-auth key via the Tailscale API before calling `tailscale up`; key creation hits a separate API endpoint that `devices:core` alone does not cover. Omitting `keys:auth_keys` produces a `403 - calling actor does not have enough permissions` error at the `tailscale up` step.

**No TLS on the gRPC connection:** `bazel-remote` is exposed as plain `grpc://` (not `grpcs://`). TLS termination on the internal hostname is not configured. This is acceptable because the Tailscale tunnel already provides transport-layer encryption between the runner and the server; adding TLS on top would require a certificate for `docker-bazel-remote` with no additional security benefit.

**E2E task caching:** `realm-e2e:e2e-ci` declares `outputs` and will therefore be subject to remote caching along with build and test tasks. Since caching is content-addressed (keyed on input hash), a cache hit only occurs when all inputs — including the `realm:build` output — are identical to a prior run. This is safe in practice, but a cached failure from a flaky run will persist until inputs change. If this becomes a problem, the escape hatch is to remove `outputs` from `e2e/realm/moon.yml`.

## Consequences

- CI runs with unchanged inputs for build or test tasks will complete near-instantly for those tasks (cache hit path).
- The CI `timeout-minutes` budget may need to be revisited if Tailscale join latency proves significant on cold starts.
- The `TS_OAUTH_CLIENT_ID` and `TS_OAUTH_SECRET` GitHub Actions secrets must be present on the repo; CI will fail at the Tailscale step if they are missing or revoked.
- The remote cache is a single point of failure. If `bazel-remote` is unreachable (server down, tailnet issue), Moon falls back to running tasks without a cache rather than failing the build — but this should be verified against the Moon v2 behaviour for connection errors.
- Any new task that declares `outputs` in its `moon.yml` will automatically participate in remote caching. No per-task opt-in is required.
