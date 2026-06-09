# ADR 0025: Watchtower HTTP API for next image updates

- **Status:** Accepted
- **Date:** 2026-06-09

## Context

When a PR is merged to `main` and the Realm build is affected, the `docker-promote` CI job retags the verified `pr-{N}` image as `dndmapp/realm:next` (see ADR 0014). Containers running `next` on the dev host need to pick up the new image after promotion.

Watchtower can do this autonomously via periodic polling of Docker Hub, or it can be triggered on demand via its HTTP API (`POST /v1/update`). The HTTP API requires Watchtower to run in `--http-api-update` mode and accepts an `Authorization: Bearer <token>` header for authentication.

The Watchtower instance is reachable only over Tailscale.

## Decision

The `docker-promote` job calls the Watchtower HTTP API immediately after the image is promoted to `next`. The call uses:

- `?image=dndmapp/realm:next` — restricts the update to Realm containers only.
- `?async=true` — Watchtower returns HTTP 202 immediately and restarts containers in the background; CI does not block on container restart time.
- `--fail-with-body` on `curl` — any non-2xx response fails the job, making a missed notification visible rather than silent.

A Tailscale step is added to `docker-promote` (reusing `tag:github-actions`, pinging `dnd-mapp-dev-watchtower`) immediately before the Watchtower call. The API token is stored as the `WATCHTOWER_HTTP_API_TOKEN` GitHub Actions secret.

## Considered Options

**Watchtower polling** — Watchtower polls Docker Hub on a fixed interval and restarts containers when it detects a new digest. Requires no CI change, but updates are delayed by the poll interval and the update is decoupled from the promotion event, making it harder to correlate a container restart with a specific merge.

**CI-triggered HTTP API** (chosen) — updates happen immediately after promotion and within the same CI job, so a failure is surfaced as a red workflow rather than a silent lag. The trade-off is that Watchtower must run in `--http-api-update` mode; removing the CI step without re-enabling polling would silently stop container updates.
