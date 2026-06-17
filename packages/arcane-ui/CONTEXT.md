---
name: arcane-ui
description: Domain glossary for the Arcane UI component library
---

## Arcane UI

A shared Angular library (`packages/arcane-ui`) providing generic, reusable UI components and services. Not tied to any visual theme — usable across multiple frontend apps in their own context. No third-party component framework. Components are documented and explored via co-located Storybook stories (Vite builder, documentation only). Unit tests follow the same pattern as Realm: Vitest in browser mode with Playwright and Angular CDK harnesses.

Exposes six secondary entry points:

- **`components`** — reusable UI components.
- **`config`** — generic `ConfigService<T>` for loading typed JSON config at bootstrap via `APP_INITIALIZER`.
- **`http`** — `HttpClient` wrapper and generic base services that resolve backend base URLs via `ConfigService`.
- **`storage`** — browser storage abstractions.
- **`theming`** — `ThemeService` managing theme mode with three explicit states: `dark` (platform default), `light`, and `system` (follows `prefers-color-scheme`). In `system` mode no `[data-theme]` attribute is set and the CSS media query governs. In `dark` or `light` mode the attribute is written explicitly, overriding the media query.
- **`testing`** — CDK harnesses for Arcane UI components, for use in consumer app tests.

## Button

A reusable interactive element in Arcane UI. The Button's visual style is described by two orthogonal dimensions:

- **Appearance** — controls visual weight and fill style. Values: `filled` (solid background, highest weight), `outlined` (border, transparent background), `ghost` (no border, no background, lowest weight), `elevated` (filled with shadow, for use on raised surfaces), `tonal` (filled with a lighter tint of the intent color). Requires component-level and Sigil tokens to be defined for `elevated` and `tonal`.

- **Size** — controls padding, font size, and min-height. Values: `xs | sm | md | lg | xl`, defaulting to `md`. Expressed as component-level CSS custom properties backed by Sigil SCSS spacing/typography variables (spacing tokens are SCSS-only per [Sigil ADR-0003](../../packages/sigil/docs/adr/0003-spacing-radius-scss-only.md)).

- **Icon support** — icons are projected via named slots (`slot="start"` for leading, `slot="end"` for trailing). An `iconOnly` boolean input switches the button to square proportions; callers must supply `aria-label` in that mode. The Button is decoupled from any icon library.

- **Loading state** — a `loading` boolean input swaps projected content for an icon component (icon component TBD, to be designed separately) and blocks interaction. Button dimensions stay fixed during loading to prevent layout shift.

- **Component tokens** — scoped under the `--dma-button-*` prefix, consistent with the `dma-` selector namespace used across Arcane UI.

- **CDK Harness** — a `ButtonHarness` ships in `@dnd-mapp/arcane-ui/testing`, covering both `button[dma-button]` and `a[dma-button]` via a single harness class.

- **Full width** — a `fullWidth` boolean input stretches the button to `width: 100%` via a host class, defaulting to `false`.

- **Selectors** — both components use attribute selectors on native host elements: `ButtonComponent` targets `button[dma-button]`, `ButtonLinkComponent` targets `a[dma-button]`. The consumer writes the host element (`<button dma-button>` / `<a dma-button>`); the component enhances it. Shares styles via a common SCSS mixin. `ButtonComponent` defaults `type` to `"button"` to prevent accidental form submission; consumers override by setting `type="submit"` on the host element.

- **Disabled** — consumers use native HTML attributes directly. On `<button dma-button disabled>` the browser handles blocking interaction natively. `aria-disabled="true"` on either element keeps it focusable; the component suppresses click and keyboard activation in JS for that state. No `disabled` or `softDisabled` Angular inputs — the host attributes are the API.

- **Intent** — controls semantic color and meaning. Values: `default` (maps to `--color-interactive-primary`), `danger`, `warning`, `success`, `info`. `danger` already has Sigil tokens; `warning`, `success`, and `info` require new Sigil semantic tokens (including hover/active variants).

## Icon

A passive visual element in Arcane UI that renders a single SVG icon. Icons are not interactive; accessible meaning lives on the surrounding interactive element, not the icon itself.

- **Implementation** — each icon is a standalone Angular component with the SVG markup inlined directly in the component template. No registry, no runtime icon library dependency. SVG files are vendored into the repository (copied from an external library, no runtime package dependency).

- **Selector** — custom element (`<dma-icon-spinner>`). The component template contains the full `<svg>` element.

- **Size** — defaults to `1em`, scaling with the surrounding `font-size`. An optional `size` input accepts `xs | sm | md | lg | xl` (same scale as Button) and maps to fixed sizes via component-level CSS custom properties under `--dma-icon-*`.

- **Accessibility** — `aria-hidden="true"` is set on the host by default. Icons are always decorative; the parent interactive element carries the accessible label.

- **Color** — inherits via `currentColor`. No color input.

- **Animation** — animated icons (e.g. the spinner) use CSS `@keyframes` from Sigil's `animations.css` entry point and reference `--dma-animation-play-state` so `prefers-reduced-motion` is respected automatically.

- **Entry point** — exported from `@dnd-mapp/arcane-ui/icons`.
