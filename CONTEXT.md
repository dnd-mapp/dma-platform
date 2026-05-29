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

## Arcane UI

The custom Angular component and design system library (`packages/arcane-ui`). No third-party component framework — fully custom-built to support the platform's fantasy aesthetic. Consumed by Realm.

## Virtual Tabletop (VTT)

A real-time shared game session within a Campaign. Uses WebSockets for live communication between Players and Dungeon Masters. Distinct from asynchronous Campaign management, which uses REST.

## Campaign

A game context created by a Dungeon Master. A Campaign has one or more DMs and one or more Players. The creating DM can grant the DM role within a Campaign to any Player who is already a member of that Campaign.
