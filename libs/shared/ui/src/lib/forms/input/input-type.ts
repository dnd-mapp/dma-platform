export const InputTypes = {
    TEXT: 'text',
    PASSWORD: 'password',
    EMAIL: 'email',
    NUMBER: 'number',
} as const;

export type InputType = (typeof InputTypes)[keyof typeof InputTypes];

export const DEFAULT_INPUT_TYPE: InputType = InputTypes.TEXT;

type InputTypeInput = InputType | '';

export function inputTypeAttribute(value: InputTypeInput) {
    return Object.values(InputTypes).find((inputType) => inputType === value) ?? DEFAULT_INPUT_TYPE;
}
