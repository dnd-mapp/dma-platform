/** Named size tokens for icon components. Values map to CSS class names applied to the host element. */
export const IconSizes = {
    EXTRA_SMALL: 'xs',
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
    EXTRA_LARGE: 'xl',
} as const;

/** Union of valid icon size values derived from {@link IconSizes}. */
export type IconSize = (typeof IconSizes)[keyof typeof IconSizes];
