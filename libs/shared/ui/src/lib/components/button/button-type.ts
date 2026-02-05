export const ButtonTypes = {
    BASE: 'base',
    PRIMARY: 'primary',
    DANGER_SUBTLE: 'danger-subtle',
} as const;

export type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

export const DEFAULT_BUTTON_TYPE: ButtonType = ButtonTypes.BASE;

export function buttonTypeAttribute(value: ButtonType | '') {
    return Object.values(ButtonTypes).find((buttonType) => buttonType === value) ?? DEFAULT_BUTTON_TYPE;
}
