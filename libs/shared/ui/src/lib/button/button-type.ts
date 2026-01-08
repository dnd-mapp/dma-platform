export const ButtonTypes = {
    BASE: 'base',
} as const;

export type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

export const DEFAULT_BUTTON_TYPE: ButtonType = ButtonTypes.BASE;

type ButtonTypeInput = ButtonType | '';

export function buttonTypeAttribute(value: ButtonTypeInput) {
    return Object.values(ButtonTypes).find((buttonType) => buttonType === value) ?? DEFAULT_BUTTON_TYPE;
}
