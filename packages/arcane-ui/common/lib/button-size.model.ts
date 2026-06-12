/** Named size tokens for `ButtonComponent`. Values map to CSS class names on the host. */
export const ButtonSizes = {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
} as const;

/** Union of valid button size values derived from {@link ButtonSizes}. */
export type ButtonSize = (typeof ButtonSizes)[keyof typeof ButtonSizes];

/** Size applied when no `size` input is provided. */
export const DEFAULT_BUTTON_SIZE: ButtonSize = ButtonSizes.MEDIUM;

/** Returns the CSS class token for the given size. */
export function buttonSizeAttr(value: ButtonSize | ''): ButtonSize {
    return Object.values(ButtonSizes).find((size) => value === size) ?? DEFAULT_BUTTON_SIZE;
}
