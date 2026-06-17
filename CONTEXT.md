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

## Virtual Tabletop (VTT)

A real-time shared game session within a Campaign. Uses WebSockets for live communication between Players and Dungeon Masters. Distinct from asynchronous Campaign management, which uses REST.

## Campaign

A game context created by a Dungeon Master. A Campaign has one or more DMs and one or more Players. The creating DM can grant the DM role within a Campaign to any Player who is already a member of that Campaign.
