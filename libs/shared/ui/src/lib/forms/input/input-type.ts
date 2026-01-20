export const InputTypes = {
    TEXT: 'text',
    PASSWORD: 'password',
    EMAIL: 'email',
} as const;

export type InputType = (typeof InputTypes)[keyof typeof InputTypes];

export const DEFAULT_INPUT_TYPE: InputType = InputTypes.TEXT;

export function inputTypeAttribute(value: InputType | '') {
    return Object.values(InputTypes).find((inputType) => inputType === value) ?? DEFAULT_INPUT_TYPE;
}
