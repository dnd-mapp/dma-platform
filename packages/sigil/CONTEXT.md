---
name: sigil
description: Domain glossary for the Sigil design token library
---

## Sigil

The platform's design token library (`packages/sigil`). Provides the visual language of the platform — colors, typography, spacing, and other design primitives — as SCSS variables and CSS custom properties. Supports theming via a three-layer token system. Has no Angular dependency. Consumed by both Arcane UI components and directly by frontend apps.

Owns the **primitive** and **semantic** token layers. Compiles to CSS (custom properties on `:root` and `[data-theme]` selectors). Ships three self-hosted fonts (woff2): Metamorphous (headings), Lora (body), Inconsolata (monospace). Component tokens are owned by Arcane UI and expressed as CSS custom properties so apps can override them via the cascade.

Ships four opt-in CSS entry points, each independently importable:

- **`index.css`** — semantic tokens (CSS custom properties) and font-face declarations. The default entry point.
- **`normalize.css`** — cross-browser consistency layer (modern-normalize). Standalone: no Sigil tokens, no side effects beyond browser normalization.
- **`base.css`** — opinionated element defaults using semantic tokens. Self-contained: includes semantic tokens so it can be imported without `index.css`. Covers `body` (background, text color, font, size, line-height), `h1`–`h6` (Metamorphous font, size scale 4xl→md, weight and line-height per level), and typographic elements (`code`, `kbd`, `samp`, `pre` with mono font; `hr` with border token). Form and interactive elements (`a`, `button`, `input`, etc.) are out of scope.
- **`animations.css`** — reusable CSS `@keyframes` declarations and animation tokens as CSS custom properties. Handles `prefers-reduced-motion` centrally via `--dma-animation-play-state` (set to `running` by default, `paused` under `prefers-reduced-motion: reduce`). Components that use `animation-play-state: var(--dma-animation-play-state)` get reduced-motion support for free. Animation-specific tokens include `--dma-animation-spin-duration`. Scope grows as new animated components require it.
