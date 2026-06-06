# ADR 0010: Warm-tinted surface tokens for both themes

- **Status:** Accepted
- **Date:** 2026-06-01

## Context

The semantic color layer needs a surface family for both the light and dark themes — page backgrounds, wells, cards, and overlays. The obvious choice for a neutral surface is the gray scale, which is chromatically neutral. The platform's primary brand color is maroon (hue 32°).

## Decision

Surface tokens use the **maroon primitive scale** across both themes rather than the gray scale.

**Light theme** uses the bright end of the scale:

- `--color-surface-subtle` → `$color-maroon-100` (93% lightness)
- `--color-surface-default` → `$color-maroon-50` (97% lightness)
- `--color-surface-raised` / `--color-surface-overlay` → `$color-white` (99% lightness, hue 32°)

**Dark theme** uses the dark end, stepping upward as elements elevate:

- `--color-surface-subtle` → `$color-maroon-950` (13% lightness)
- `--color-surface-default` → `$color-maroon-900` (19% lightness)
- `--color-surface-raised` → `$color-maroon-800` (26% lightness)
- `--color-surface-overlay` → `$color-maroon-700` (33% lightness)

The difference from pure gray is subtle in light mode — `$color-maroon-50` is `oklch(97% 0.01 32deg)` versus `$color-grey-50` at `oklch(97% 0.004 0deg)` — but gives light mode a faint parchment warmth that fits the platform's D&D identity. In dark mode, the warm tint is similarly subtle but maintains hue continuity across the full lightness range.

For tonal consistency, the white and black primitives also carry hue 32°: `$color-white: oklch(99% 0.006 32deg)` and `$color-black: oklch(8% 0.006 32deg)`.

The gray scale is reserved for text and border tokens, where chromatic neutrality reads more cleanly against warm surfaces.

## Consequences

- Both light and dark modes share a cohesive warmth — all surface layers use the same hue family across the full lightness range.
- Gray text and borders on a maroon-tinted surface produce a subtle but intentional hue contrast, avoiding the flat look of gray-on-gray in both modes.
- The four dark surface steps (`950` → `700`) mirror the light steps (`100` → `white`) in elevation semantics: subtle is the deepest background, overlay is the highest.
