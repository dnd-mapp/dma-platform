# Single gallery story for icon components

Arcane UI's default Storybook convention is one story file per component. Icons are an exception: all icon components share identical functionality (a single `size` input, `aria-hidden` host binding, SVG rendering) and differ only in their visual glyph. A per-icon story would repeat the same controls and behaviour with no additional value.

Instead, a single `Icons` gallery story hosts all icon components together via a dedicated `IconGalleryComponent` (an Angular host wrapper in `.storybook/`). One shared `size` control governs all icons simultaneously, making sizing behaviour immediately comparable across the full icon set. New icons are added to the gallery component — no new story file is created.
