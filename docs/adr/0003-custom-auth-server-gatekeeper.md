# ADR 0003: Build a custom NestJS auth server (Gatekeeper) instead of using a managed auth service

- **Status:** Accepted
- **Date:** 2026-05-29

## Context

`apps/realm` requires authentication and role management (Player, Dungeon Master). Several approaches were considered:

- **Managed auth service** (Auth0, Supabase Auth, Keycloak) — handles OIDC/OAuth2, token issuance, user management, and social login out of the box; reduces maintenance burden significantly.
- **Custom NestJS auth server (`apps/gatekeeper`)** — full control over the auth flow, token shape, role model, and user lifecycle; no vendor dependency or self-hosted infra requirement beyond the service itself.

The platform has a domain-specific role model (Player/DM roles that are self-granted and scoped to Campaigns) that would require significant customization of any managed solution. The team also wants full ownership of the user data and auth flow.

## Decision

Build **`apps/gatekeeper`** — a custom NestJS authentication server — to handle user identity, token issuance (JWT), and role management for the platform. `apps/realm` and future apps authenticate through Gatekeeper.

## Consequences

- Full control over the token shape, role claims, and user lifecycle — no mapping layer between a managed service's user model and the platform's domain model.
- No vendor lock-in or managed service costs.
- The team owns the full complexity of secure auth implementation: token rotation, revocation, session management, and future social login support.
- Gatekeeper must be treated as a critical, high-security service from day one — vulnerabilities here affect the entire platform.
