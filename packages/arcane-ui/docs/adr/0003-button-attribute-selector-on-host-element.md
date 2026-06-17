# Button components use attribute selectors on native host elements

`ButtonComponent` and `ButtonLinkComponent` are applied as attributes on native host elements the consumer writes (`<button dma-button>` and `<a dma-button>`), rather than rendering their own host element via a custom element selector (`<dma-button>`).

This keeps HTML semantics explicit and in the consumer's hands: a `<button>` is an action trigger, an `<a>` is a navigation link. The framework cannot accidentally render the wrong element. It also means native HTML attributes (`disabled`, `type`, `aria-*`, `href`, `routerLink`) work directly without Angular input wrappers — there is no impedance mismatch between the component API and the platform.

## Considered options

A single `<dma-button>` component that renders its own `<button>` or `<a>` based on an `href` input was considered. Rejected because Angular does not support dynamic host element switching — implementing it requires `ViewContainerRef` gymnastics, and the result forces every interaction attribute through a component input rather than using the native platform API directly.

## Consequences

Consumer templates must write the host element explicitly. The trade-off is that the HTML semantics are always correct and visible at the call site rather than implied by an input value.
