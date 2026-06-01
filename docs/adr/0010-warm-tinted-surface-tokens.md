# ADR 0010: Warm-tinted surface tokens for the light theme

- **Status:** Accepted
- **Date:** 2026-06-01

## Context

The semantic color layer needs a surface family for the light theme default — page backgrounds, wells, cards, and overlays. The obvious choice is the grey scale (`$color-grey-50`/`100`), which is chromatic neutral. The platform's primary brand color is maroon (hue 32°).

## Decision

Surface tokens use the **maroon primitive scale** rather than the grey scale:

- `--color-surface-subtle` → `$color-maroon-100` (93% lightness)
- `--color-surface-default` → `$color-maroon-50` (97% lightness)
- `--color-surface-raised` / `--color-surface-overlay` → `$color-white` (99% lightness, hue 32°)

The difference from pure grey is subtle — `$color-maroon-50` is `oklch(97% 0.01 32deg)` versus `$color-grey-50` at `oklch(97% 0.004 0deg)` — but it gives light mode a faint parchment warmth that fits the platform's D&D identity.

For tonal consistency, the white and black primitives also carry hue 32°: `$color-white: oklch(99% 0.006 32deg)` and `$color-black: oklch(8% 0.006 32deg)`.

The grey scale is reserved for text and border tokens, where chromatic neutrality reads more cleanly against warm surfaces.

## Consequences

- Light mode has a cohesive warmth throughout — surface, raised, and overlay layers all share the same hue family.
- Grey text on a maroon-tinted surface produces a subtle but intentional contrast in hue, avoiding the flat look of grey-on-grey.
- Dark theme overrides (ADR pending, issue #26) will need to decide independently whether dark surfaces follow the same hue or shift to a cooler neutral.
