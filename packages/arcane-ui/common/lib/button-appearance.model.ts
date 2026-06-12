/** Visual presentation variants for `ButtonComponent`. Values map to CSS class names on the host. */
export const ButtonAppearances = {
    FILLED: 'filled',
    OUTLINED: 'outlined',
    GHOST: 'ghost',
    ELEVATED: 'elevated',
    TONAL: 'tonal',
} as const;

/** Union of valid button appearance values derived from {@link ButtonAppearances}. */
export type ButtonAppearance = (typeof ButtonAppearances)[keyof typeof ButtonAppearances];

/** Appearance applied when no `appearance` input is provided. */
export const DEFAULT_BUTTON_APPEARANCE: ButtonAppearance = ButtonAppearances.FILLED;

/** Returns the CSS class token for the given appearance, falling back to the default when the value is unrecognized. */
export function buttonAppearanceAttr(value: ButtonAppearance | ''): ButtonAppearance {
    return Object.values(ButtonAppearances).find((appearance) => value === appearance) ?? DEFAULT_BUTTON_APPEARANCE;
}
