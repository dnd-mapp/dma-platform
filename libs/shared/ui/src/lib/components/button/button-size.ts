export const ButtonSizes = {
    SMALL: 'small',
    MEDIUM: 'medium',
} as const;

export type ButtonSize = (typeof ButtonSizes)[keyof typeof ButtonSizes];

export const DEFAULT_BUTTON_SIZE: ButtonSize = ButtonSizes.MEDIUM;

export function buttonSizeAttribute(value: ButtonSize | '') {
    return Object.values(ButtonSizes).find((buttonSize) => value === buttonSize) ?? DEFAULT_BUTTON_SIZE;
}
