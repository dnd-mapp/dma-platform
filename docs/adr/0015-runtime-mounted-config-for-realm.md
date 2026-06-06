# ADR 0015: Runtime-mounted config for containerised Realm

- **Status:** Accepted
- **Date:** 2026-06-04

## Context

Realm needs environment-specific configuration (e.g. the Gatekeeper URL) that differs between local dev, CI, and production. Angular's standard approach is build-time environment files — one build per environment. That is incompatible with ADR 0014's build-once promotion model: baking config into the image means a PR image can never be the production image.

## Decision

`apps/realm/public/config.json` is committed with local dev defaults. The Angular app fetches it via `APP_INITIALIZER` before bootstrap (using `ConfigService` from `@dnd-mapp/arcane-ui/config`). In container deployments, an environment-specific `config.json` is mounted over the committed file. The schema is the `RealmConfig` TypeScript interface in `apps/realm/core/src/config/realm-config.ts`.

The committed file contains local dev defaults so `ng serve` works without any extra setup. It is never used as-is in a deployed container.

## Considered Options

**Build-time environment files** — the Angular-native approach, but produces one image per environment. Incompatible with build-once promotion. Rejected.

**Runtime environment variables** — requires the nginx container to template the config at startup (e.g. via `envsubst`). More moving parts than a mounted file, and the config schema would live in a shell template rather than a TypeScript interface. Rejected.
