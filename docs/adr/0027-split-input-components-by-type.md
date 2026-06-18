# Split input components by type rather than a unified InputComponent

Rather than a single `InputComponent` with a `type` input that branches internally on `password`, `number`, and `search`, Arcane UI ships four focused components: `InputComponent` (text, email, tel, url), `PasswordInputComponent`, `NumberInputComponent`, and `SearchInputComponent`. All four share an abstract base class for the `ControlValueAccessor` implementation and common inputs, and a shared `_input-styles.scss` mixin for visual structure.

The unified approach was rejected because each specialised type carries distinct logic that cannot be cleanly conditionalised: `PasswordInputComponent` owns its action slot with a built-in show/hide toggle (eye/eye-slash icons); `NumberInputComponent` adds `min`/`max`/`step` inputs and suppresses browser spin buttons; `SearchInputComponent` owns its action slot with a built-in clear button and suppresses the native search cancel button. Folding these into one component would have produced a public API full of inputs that are silently irrelevant depending on `type`, and template branching that obscures intent.

The shared base class and SCSS mixin avoid duplication without the fragility of a delegation chain between two `ControlValueAccessor` instances (the alternative composition approach, where specialised components wrapped `InputComponent`).

## Considered options

- **Single `InputComponent` with `type` branching** — rejected: leaks type-specific inputs into a shared API surface and requires conditional logic inside the component for each type's quirks.
- **Specialised components wrapping `InputComponent`** — rejected: two `ControlValueAccessor` instances in a parent–child relationship is fragile and hard to test; value and disabled state must be delegated through an extra layer.
- **Abstract base class + shared SCSS mixin (chosen)** — each component is self-contained and owns its full CVA implementation; visual structure is defined once in the mixin.
