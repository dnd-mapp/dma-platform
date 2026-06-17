# ADR 0011: Spacing and radius as SCSS-only primitives

- **Status:** Accepted
- **Date:** 2026-06-01

## Context

The semantic layer exposes color and typography tokens as CSS custom properties on `:root`. Spacing (`$spacing-1` through `$spacing-16`) and radius (`$radius-sm` through `$radius-full`) exist as SCSS variables in the primitives layer. The question is whether they should also be compiled to `:root` custom properties.

## Decision

Spacing and radius are **not** exposed as CSS custom properties. They remain SCSS variables consumed via `@use` at compile time by Arcane UI and Realm.

## Considered options

- **CSS custom properties** — would allow runtime `calc()` compositions, cascade overrides, and access from non-SCSS consumers.
- **SCSS-only** — sufficient because all current and planned consumers (Arcane UI, Realm) author styles in SCSS and can `@use` the primitives directly at build time.

## Consequences

- The compiled CSS output is simpler — no spacing or radius properties on `:root`.
- Any future non-SCSS consumer cannot access these tokens without re-implementing them or without this decision being revisited.
- Density variants or responsive spacing overrides driven by runtime custom property swaps are not possible under this model. If that need arises, the spacing tokens should be promoted to the CSS custom property surface.
