---
name: dma-platform
description: Domain glossary for the D&D Mapp platform
---

## User

A registered account on the platform. Every User has at least the Player role. A User can self-grant the Dungeon Master role via their Profile, which unlocks DM-specific tools and the ability to create Campaigns.

## Role

A permission level attached to a User. Roles are additive: a User with the Dungeon Master role retains the Player role.

- **Player** — default role granted on account creation.
- **Dungeon Master (DM)** — self-granted via Profile; unlocks Campaign creation and DM tooling.

## Realm

The main frontend client application (`apps/realm`). A single Angular SPA used by both Players and Dungeon Masters. Role gates DM-only sections. Communicates with the backend primarily via REST API and via WebSockets for real-time VTT features. Authenticates through Gatekeeper.

## Gatekeeper

The custom NestJS authentication server (`apps/gatekeeper`). Issues and validates tokens for all platform apps. The single authority on User identity and session validity.

## Sigil

The platform's design token library (`packages/sigil`). Provides the visual language of the platform — colors, typography, spacing, and other design primitives — as SCSS variables and CSS custom properties. Supports theming via a three-layer token system. Has no Angular dependency. Consumed by both Arcane UI components and directly by frontend apps.

Owns the **primitive** and **semantic** token layers. Compiles to CSS (custom properties on `:root` and `[data-theme]` selectors). Ships three self-hosted fonts (woff2): Metamorphous (headings), Lora (body), Inconsolata (monospace). Component tokens are owned by Arcane UI and expressed as CSS custom properties so apps can override them via the cascade.

## Arcane UI

A shared Angular library (`packages/arcane-ui`) providing generic, reusable UI components and services. Not tied to any visual theme — usable across multiple frontend apps in their own context. No third-party component framework. Components are documented and explored via co-located Storybook stories (Vite builder, documentation only). Unit tests follow the same pattern as Realm: Vitest in browser mode with Playwright and Angular CDK harnesses.

Exposes six secondary entry points:

- **`components`** — reusable UI components.
- **`config`** — generic `ConfigService<T>` for loading typed JSON config at bootstrap via `APP_INITIALIZER`.
- **`http`** — `HttpClient` wrapper and generic base services that resolve backend base URLs via `ConfigService`.
- **`storage`** — browser storage abstractions.
- **`theming`** — `ThemeService` managing theme mode with three explicit states: `dark` (platform default), `light`, and `system` (follows `prefers-color-scheme`). In `system` mode no `[data-theme]` attribute is set and the CSS media query governs. In `dark` or `light` mode the attribute is written explicitly, overriding the media query.
- **`testing`** — CDK harnesses for Arcane UI components, for use in consumer app tests.

## Virtual Tabletop (VTT)

A real-time shared game session within a Campaign. Uses WebSockets for live communication between Players and Dungeon Masters. Distinct from asynchronous Campaign management, which uses REST.

## Campaign

A game context created by a Dungeon Master. A Campaign has one or more DMs and one or more Players. The creating DM can grant the DM role within a Campaign to any Player who is already a member of that Campaign.
