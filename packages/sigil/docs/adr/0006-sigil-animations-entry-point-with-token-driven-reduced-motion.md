# Sigil owns animation primitives with token-driven prefers-reduced-motion

Sigil ships an `animations.css` entry point that declares CSS `@keyframes` and animation-related CSS custom properties. The `--dma-animation-play-state` token defaults to `running` at `:root` and is overridden to `paused` under `@media (prefers-reduced-motion: reduce)`. Animated components reference this token via `animation-play-state: var(--dma-animation-play-state)` rather than each managing reduced motion in their own SCSS.

Animation-specific duration and easing tokens (e.g. `--dma-animation-spin-duration`) are also declared here. The entry point grows as new animated components require new keyframes or tokens; it is imported independently, like `normalize.css` and `base.css`.

## Considered options

Each animated component could handle `prefers-reduced-motion` in its own SCSS via a local `@media` query. This was rejected because it distributes a platform-wide accessibility concern across every component author. Omitting the query in any one component is a silent failure — no lint rule catches it, and no test will flag it until an accessibility audit. Centralizing the mechanism in Sigil makes compliance the default rather than a per-author responsibility.

## Consequences

Components get `prefers-reduced-motion` support for free by using `var(--dma-animation-play-state)`. The cost is that consumers must import `@dnd-mapp/sigil/animations` for animated components to behave correctly — omitting it leaves `--dma-animation-play-state` undefined, which browsers treat as `running`, so animations still work but reduced motion is silently ignored.
