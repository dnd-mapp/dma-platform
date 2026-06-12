/** Semantic color intents for `ButtonComponent`. Values map to CSS class names on the host. */
export const ButtonIntents = {
    PRIMARY: 'primary',
    DANGER: 'danger',
    SUCCESS: 'success',
} as const;

/** Union of valid button intent values derived from {@link ButtonIntents}. */
export type ButtonIntent = (typeof ButtonIntents)[keyof typeof ButtonIntents];

/** Intent applied when no `intent` input is provided. */
export const DEFAULT_BUTTON_INTENT: ButtonIntent = ButtonIntents.PRIMARY;

/** Returns the CSS class token for the given intent, falling back to the default when the value is unrecognized. */
export function buttonIntentAttr(value: ButtonIntent | ''): ButtonIntent {
    return Object.values(ButtonIntents).find((intent) => value === intent) ?? DEFAULT_BUTTON_INTENT;
}
