# ADR 0012: Dark-first `:root` baseline for the three-state theme model

- **Status:** Accepted
- **Date:** 2026-06-01

## Context

The platform has three theme states: `dark` (platform default), `light`, and `system` (follows `prefers-color-scheme`). `ThemeService` in Arcane UI defaults to `dark` — it writes `[data-theme="dark"]` on `<html>` on first load unless the user has stored a preference.

The conventional CSS pattern puts light values on `:root` and overrides with `@media (prefers-color-scheme: dark)`. Under that model, any user who sees the page before `ThemeService` initialises (initial paint, SSR, JS failure) gets a light flash before the dark theme is applied.

## Decision

`:root` holds the **dark theme values**. The media query direction is inverted: `@media (prefers-color-scheme: light)` applies light overrides for system mode. `[data-theme]` attribute selectors re-assert explicit user preference, winning by specificity over the media query.

The full selector stack:

| Condition              | Selector that governs                            |
|:-----------------------|:-------------------------------------------------|
| No attribute, OS dark  | `:root` (dark default)                           |
| No attribute, OS light | `@media (prefers-color-scheme: light) { :root }` |
| Explicit dark          | `[data-theme="dark"]`                            |
| Explicit light         | `[data-theme="light"]`                           |

A SCSS mixin is used to avoid duplicating dark values between `:root` and `[data-theme="dark"]`, and light values between the media query and `[data-theme="light"]`.

## Considered alternatives

**Light `:root` baseline (conventional)** — `:root` holds light values, `@media (prefers-color-scheme: dark)` applies dark overrides. This is the near-universal convention and what was initially implemented in #25. Rejected because it produces a light flash on first paint for the majority of users, since the platform default is dark.

## Consequences

- Pre-JS and SSR renders are dark, matching the intended default experience with no flash.
- The inverted media query direction (`prefers-color-scheme: light` instead of `dark`) is non-clear to readers unfamiliar with the platform's dark-first intent — hence this ADR.
- `[data-theme="dark"]` is still required: it overrides `@media (prefers-color-scheme: light)` for users who explicitly picked dark while their OS is set to light.
- Dark interactive elements use a lighten-on-hover model (rest `maroon-400` → hover `maroon-300` → active `maroon-500`) rather than the darken-on-hover used in light mode — hover brightens for better state legibility on dark surfaces.
- The focus ring token is split into two: `--color-interactive-focus-on-primary` (gold, for maroon elements) and `--color-interactive-focus-on-secondary` (maroon, for gold elements). This ensures the focus ring is always a contrasting hue to the element it encircles.
