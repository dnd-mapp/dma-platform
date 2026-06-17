# Separate opt-in CSS layers for normalisation and base element styles

Sigil ships two additional CSS entry points alongside `index.css`: `normalize.css` (cross-browser consistency) and `base.css` (opinionated element defaults using semantic tokens). Both are opt-in — consumers import them explicitly rather than receiving them automatically when importing Sigil.

## Considered options

**Merged into `index.css`** — rejected because Arcane UI Storybook and other partial consumers import Sigil for tokens only. Silently applying opinionated `h1` colours and body background to every Sigil consumer would force them to fight the cascade.

**Single combined `base.css`** (normalisation + element defaults in one file) — rejected because normalisation and design opinions are independent concerns. A consumer using a third-party component library may want cross-browser consistency without Sigil's typographic defaults.

## Consequences

`base.css` is self-contained: it internally forwards the semantic token partials so importing it without `index.css` produces correct output. This is intentional — a peer import model would create an invisible load-order dependency that is easy to misconfigure.

`normalize.css` uses [modern-normalize](https://github.com/sindresorhus/modern-normalize) as a build-time devDependency rather than hand-rolling cross-browser corrections. This trades maintenance of browser-quirk tracking for a dependency on a well-maintained upstream.
