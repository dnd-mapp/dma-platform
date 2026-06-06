# ADR 0007: Sigil as a separate design token package

- **Status:** Accepted
- **Date:** 2026-05-30

## Context

The platform needs a design token layer — colors, typography, spacing, and other design primitives expressed as CSS custom properties — alongside a shared Angular component library (Arcane UI). The conventional approach is to bundle tokens and components in one package.

Two consumer patterns make that bundling problematic:

1. Frontend apps (e.g. Realm) need to consume design tokens directly in their own stylesheets, independently of any specific component. Forcing apps to import tokens through an Angular library adds an unnecessary Angular dependency to what is a pure CSS concern.
2. A build-time SCSS pipeline and a runtime Angular library have different build toolchains. Combining them in one package requires either compromising both or maintaining two separate build steps under one roof.

## Decision

Design tokens are owned by **Sigil** (`packages/sigil`) — a standalone package with no Angular dependency. Sigil owns the primitive and semantic token layers of the three-layer token system, ships three self-hosted fonts (Metamorphous, Lora, Inconsolata), and compiles SCSS to CSS using the `sass` CLI. It has no build-time link to any Angular toolchain.

Arcane UI (`packages/arcane-ui`) owns the component token layer. Component tokens are defined as CSS custom properties so apps can override them via the cascade without touching Sigil or Arcane UI internals.

## Consequences

- Sigil can be consumed by any frontend regardless of framework — Angular, or any future non-Angular app in the platform.
- Apps import Sigil's compiled CSS directly for the semantic layer, and reference Arcane UI's component tokens only when they need to override them.
- The token authoring workflow is split: primitive/semantic tokens are edited in Sigil, component tokens are edited in Arcane UI. This is an intentional seam, not an oversight.
- Sigil's build step (`sass` CLI) is separate from and simpler than Arcane UI's `ng-packagr` build. They are never coupled.
