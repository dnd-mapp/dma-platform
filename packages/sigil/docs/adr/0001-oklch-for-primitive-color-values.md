# ADR 0009: OKLCH for primitive color values

Sigil's primitive color palette uses OKLCH values rather than hex or HSL. OKLCH is perceptually uniform — equal numeric steps in lightness produce visually equal jumps, regardless of hue. With 7 hue families each spanning 11 steps, this property is essential: the palette needs to feel consistent across hues, and hex/HSL don't guarantee that. OKLCH is natively supported in all target browsers with no build-time conversion needed.

## Considered Options

- **Hex** — universally understood and tool-friendly, but perceptually non-uniform. Crafting a consistent 11-step ramp per hue by hand in hex is error-prone.
- **HSL** — more readable than hex and easier to reason about, but lightness in HSL is not perceptually uniform either. Two colors with identical HSL lightness can appear starkly different to the human eye.
- **OKLCH** — perceptually uniform, native CSS, slightly less familiar to contributors used to hex. Chosen because the palette structure makes uniformity worth the learning cost.
