# ADR 0018: Coordinated Node.js upgrades on Active LTS promotion

- **Status:** Accepted
- **Date:** 2026-06-05

## Context

Three places in the repo pin the Node.js version, and they must stay in lockstep:

1. `.docker/realm/Dockerfile` — `FROM node:24.x.y-alpine…`
2. `package.json` — `engines.node` (read by mise for local dev; see ADR 0001)
3. `pnpm-workspace.yaml` — `@types/node` in the default catalog

`engineStrict: true` in `pnpm-workspace.yaml` means `pnpm install` fails if the running Node version does not match `engines.node`. A Dockerfile-only major bump therefore breaks the Docker build.

Dependabot watches the Docker ecosystem independently of npm. It opened a PR bumping the Dockerfile to Node 26 while Node 26 was still the Current (non-LTS) release, and without touching the other two pins. Accepting it as-is would cause the build to fail.

## Decision

Node.js upgrades target the **Active LTS** release, and all three version pins are updated together in a single change. The trigger is the Node.js Foundation promoting a new even-numbered release to Active LTS (each October).

Dependabot is configured to ignore major-version bumps for both the Docker `node` image and the npm `@types/node` package. It continues to suggest patch and minor updates within the current major, but cannot propose a version jump that would leave the three pins out of sync.

## Considered Options

**Upgrade to Current immediately** — Node 26 is available but pre-LTS. All three pins still need to change together, and upgrading to a non-LTS release adds churn for no lasting benefit. Rejected.

**Wait until Node 24 reaches EOL (April 2028)** — too conservative; Active LTS is the right signal and aligns with the Node.js Foundation's own recommendation.

**Accept Dependabot Docker PRs as-is** — would break `pnpm install` inside the build container due to `engineStrict: true`. Rejected.
