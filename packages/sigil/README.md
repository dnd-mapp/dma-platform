# @dnd-mapp/sigil

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![node: >=24.0.0](https://img.shields.io/badge/node-%3E%3D24.0.0-339933?logo=nodedotjs&logoColor=white)](package.json)
[![sass: ~1.100.0](https://img.shields.io/badge/sass-~1.100.0-CC6699?logo=sass&logoColor=white)](../../package.json)

`@dnd-mapp/sigil` is D&D Mapp's design token library. It defines the visual language — colors, typography, spacing, and other design primitives — as SCSS variables and CSS custom properties. Owns the primitive and semantic layers of a three-layer token system, with theming support via CSS custom properties on `:root` and `[data-theme]` selectors. Framework-agnostic — consumable by any frontend.

## Consuming semantic tokens

Semantic tokens are compiled to CSS custom properties in `index.css`. Load it once as a global stylesheet — do not `@use` it from SCSS, as Sass treats CSS imports as a plain passthrough rather than inlining the content.

In Angular, add it to the `styles` array in `angular.json`:

```json
{
    "styles": [
        "dist/packages/sigil/index.css"
    ]
}
```

Or link it directly in your HTML shell:

```html
<link rel="stylesheet" href="dist/packages/sigil/index.css">
```

All semantic tokens are then available as CSS custom properties throughout your stylesheets:

```scss
.card {
    background: var(--color-surface-raised);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-default);
    font-size: var(--typography-size-sm);
    font-weight: var(--typography-weight-regular);
    line-height: var(--typography-line-height-normal);
}
```

### Available token categories

| Prefix                       | Category           | Example                                                         |
|:-----------------------------|:-------------------|:----------------------------------------------------------------|
| `--color-surface-*`          | Background layers  | `default`, `subtle`, `raised`, `overlay`                        |
| `--color-text-*`             | Text colours       | `primary`, `secondary`, `disabled`, `inverse`, `on-interactive` |
| `--color-border-*`           | Border colours     | `subtle`, `default`, `strong`                                   |
| `--color-interactive-*`      | Interactive states | `primary`, `primary-hover`, `primary-active`, `danger`, `focus` |
| `--typography-size-*`        | Font sizes         | `xs` → `4xl`                                                    |
| `--typography-weight-*`      | Font weights       | `regular`, `medium`, `semibold`, `bold`                         |
| `--typography-line-height-*` | Line heights       | `tight`, `snug`, `normal`, `relaxed`                            |

## Consuming semantic tokens in SCSS

For consumers that author styles in SCSS, semantic tokens are also available as SCSS variables that compile to `var()` with a light-theme fallback. This keeps theming intact — the CSS custom property is resolved at runtime — while allowing ergonomic SCSS variable references.

First configure Sigil's dist as an SCSS load path (see [includePaths setup](#includepaths-setup) below), then import:

```scss
@use 'tokens/color' as *;
@use 'tokens/typography' as *;

.card {
    background: $color-surface-raised;
    color: $color-text-primary;
    border: 1px solid $color-border-default;
    font-size: $typography-size-sm;
    line-height: $typography-line-height-normal;
}
```

Each variable compiles to a `var()` with the light-theme primitive as fallback:

```css
.card {
    background: var(--color-surface-raised, oklch(99% 0.006 32deg));
}
```

`index.css` must still be loaded for dark theme overrides to take effect. The fallback only activates if the custom property is not defined.

### Available token files

| File                | Variables                                                                      |
|:--------------------|:-------------------------------------------------------------------------------|
| `tokens/color`      | `$color-surface-*`, `$color-text-*`, `$color-border-*`, `$color-interactive-*` |
| `tokens/typography` | `$typography-size-*`, `$typography-weight-*`, `$typography-line-height-*`      |

## Consuming animation tokens

Animation keyframes and timing tokens are compiled to `animations.css`. Load it alongside `index.css` wherever spinning animations are used:

In Angular, add it to the `styles` array in `angular.json`:

```json
{
    "styles": [
        "dist/packages/sigil/index.css",
        "dist/packages/sigil/animations.css"
    ]
}
```

Or link it directly in your HTML shell:

```html
<link rel="stylesheet" href="dist/packages/sigil/animations.css">
```

Use the `dma-spin` keyframe and the timing tokens in component styles:

```scss
.spinner {
    animation: dma-spin var(--dma-animation-spin-duration) linear infinite;
    animation-play-state: var(--dma-animation-play-state);
}
```

`--dma-animation-play-state` is automatically set to `paused` when `prefers-reduced-motion: reduce` is active, so no extra media query is needed in the component.

### Available animation tokens

| Token                           | Default   | Description                                            |
|:--------------------------------|:----------|:-------------------------------------------------------|
| `--dma-animation-play-state`    | `running` | Set to `paused` under `prefers-reduced-motion: reduce` |
| `--dma-animation-spin-duration` | `0.8s`    | Duration of one full `dma-spin` rotation               |

## Consuming spacing and radius primitives

Spacing and radius are SCSS-only — they are not compiled to CSS custom properties. Consume them via `@use` at build time using the same load path setup:

```scss
@use 'primitives/spacing' as *;
@use 'primitives/radius' as *;

.button {
    padding: $spacing-2 $spacing-4;
    border-radius: $radius-md;
}
```

### includePaths setup

Add Sigil's dist to your SCSS load paths. In Angular (`angular.json`):

```json
{
    "stylePreprocessorOptions": {
        "includePaths": [
            "dist/packages/sigil"
        ]
    }
}
```

> [!NOTE]
> The package also exposes a `sass` export condition for toolchains that support Dart Sass's [`NodePackageImporter`](https://sass-lang.com/documentation/js-api/classes/nodepackageimporter/). Angular CLI does not support custom Sass importers and cannot use `pkg:` URLs — `includePaths` is the correct approach for Angular.

### Available primitive files

| File                     | Variables                                             |
|:-------------------------|:------------------------------------------------------|
| `primitives/color`       | `$color-{hue}-{step}`, `$color-white`, `$color-black` |
| `primitives/font-size`   | `$font-size-{xs\|sm\|md\|lg\|xl\|2xl\|3xl\|4xl}`      |
| `primitives/font-weight` | `$font-weight-{regular\|medium\|semibold\|bold}`      |
| `primitives/line-height` | `$line-height-{tight\|snug\|normal\|relaxed}`         |
| `primitives/spacing`     | `$spacing-{1\|2\|3\|4\|5\|6\|8\|10\|12\|16}`          |
| `primitives/radius`      | `$radius-{sm\|md\|lg\|xl\|full}`                      |
