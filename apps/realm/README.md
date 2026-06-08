# Realm

[![Angular: 21.2](https://img.shields.io/badge/Angular-21.2-DD0031?logo=angular&logoColor=white)](../../package.json)
[![TypeScript: 5.9](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](../../package.json)
[![Vitest: 4.1](https://img.shields.io/badge/Vitest-4.1-6E9F18?logo=vitest&logoColor=white)](../../package.json)

The main frontend client for D&D Mapp. A single Angular SPA used by both Players and Dungeon Masters — role gates DM-only sections within the same app. Communicates with the backend via REST API and via WebSockets for real-time VTT sessions.

## Getting started

See [Getting started](../../README.md#getting-started) in the root README.

## Running the app

```sh
pnpm --filter @dnd-mapp/realm start
```

The app will be available at `https://realm.dnd-mapp.localhost`.

## Running tests

| Command                                  | Description               |
|------------------------------------------|---------------------------|
| `pnpm --filter @dnd-mapp/realm test-ci`  | Single run, no UI         |
| `pnpm --filter @dnd-mapp/realm test-dev` | Watch mode with Vitest UI |

Tests are run in a real Chromium browser via Playwright. Coverage reports are written to `coverage/apps/realm/` and HTML test reports to `reports/apps/realm/`.

End-to-end tests live in [`e2e/realm`](../../e2e/realm) and are run separately via `pnpm --filter @dnd-mapp/realm-e2e test`.

## Building the Docker image

The image is built with [Docker Bake](https://docs.docker.com/build/bake/) using [`.docker/bake.hcl`](../../.docker/bake.hcl).

The quickest way to build locally is via the moon task:

```sh
pnpm moon run realm:docker-build
```

This builds for `linux/amd64` (use `linux/arm64` on Apple Silicon — pass `--set realm.platform=linux/arm64` via the raw command below). The image is tagged `dndmapp/realm:local` and is not loaded into the local Docker store; add `--load` to the bake command if you need to run it with `docker run`.

For full control over tags and OCI labels, call bake directly. In CI, `docker/metadata-action` generates a supplementary bake file that populates the `docker-metadata-action` target with image tags and dynamic OCI labels (`org.opencontainers.image.created`, `.revision`, `.version`). That file is not available locally, so you must supply those values via `--set` flags:

```sh
docker buildx bake \
  --file .docker/bake.hcl \
  --set realm.tags=realm:local \
  --set "realm.labels.org.opencontainers.image.created=$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  --set "realm.labels.org.opencontainers.image.revision=$(git rev-parse HEAD)" \
  --set "realm.labels.org.opencontainers.image.version=local" \
  --set realm.platform=linux/amd64 \
  --load \
  realm
```

> [!NOTE]
> The bake file references a registry-based build cache (`dndmapp/realm:buildcache`). Cache-pull errors during local builds are non-fatal and can be ignored if you are not authenticated to Docker Hub.
