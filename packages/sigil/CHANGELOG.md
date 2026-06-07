# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `@dnd-mapp/sigil` scaffolded as the design token library for the D&D Mapp platform
- SCSS build pipeline using `sass`; `post-build` script copies `package.json`, `README.md`, and assets to `dist`; `lint-css` and `build` Moon tasks wired with explicit inputs and outputs
- Primitive token layer — color palette of 7 hues × 11 steps (Maroon, Gold, Grey, Red, Emerald, Yellow, Sky) in OKLCH color space, plus `$color-white` and `$color-black` with a 32° hue offset for tonal consistency; font sizes (xs–4xl), font weights (regular/medium/semibold/bold), line heights (tight/snug/normal/relaxed), border radii, and a 10-step spacing scale
- Semantic token layer — CSS custom properties for surface, text, border, and interactive colors; typography tokens for size, weight, line-height, and font family; exposed as SCSS variables in the `tokens/` layer that resolve to `var()` with dark-theme fallbacks
- Dark and light theme support via `dark-theme-colors()` and `light-theme-colors()` mixins; `:root` defaults to dark, `@media (prefers-color-scheme: light)` follows the OS preference, and explicit `[data-theme='light']` / `[data-theme='dark']` selectors allow runtime override; `--color-interactive-focus` split into `--color-interactive-focus-on-primary` and `--color-interactive-focus-on-secondary`
- Font assets — Metamorphous (heading), Lora Variable (body), and Inconsolata Variable (mono) as woff2 files under the SIL OFL license; `download-fonts.mjs` script copies them from `@fontsource` packages on demand
- `@font-face` declarations for all three typefaces with `font-display: swap`; `--font-heading`, `--font-body`, and `--font-mono` CSS custom properties; `$font-family-heading`, `$font-family-body`, and `$font-family-mono` primitive SCSS variables
- `./normalize` entry point — thin wrapper around `modern-normalize` compiled as a standalone CSS reset layer
- `./base` entry point — element styles for `body`, `h1–h6`, `code`/`kbd`/`samp`, `pre`, and `hr` using semantic color and typography tokens
- Exports map with Sass conditions exposing `primitives/` and `tokens/` as SCSS sources alongside the compiled CSS entry points; font assets exported at `./assets/fonts/*`
- `publishConfig.directory: "dist"` enabling direct pnpm workspace linking from consuming packages

### Changed

- Build output paths made package-relative (`./dist/…`) instead of repo-root-relative (`../../dist/packages/sigil/`)
- `build` and `build-dev` scripts extended to compile `normalize.scss` and `base.scss` alongside `index.scss`; `--pkg-importer=node` flag added to resolve `pkg:` imports (e.g. `pkg:modern-normalize`)
- All `devDependencies` migrated to shared pnpm catalog references (ADR 0013)
- Moon `dependsOn: [stylelint-config]` removed — dependency is now auto-detected from the pnpm workspace link in `package.json`

[Unreleased]: https://github.com/dnd-mapp/dma-platform/compare/sigil@0.0.0...HEAD
