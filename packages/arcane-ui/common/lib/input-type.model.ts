/** HTML input types accepted by `InputComponent`. Values are forwarded directly to the native `type` attribute. */
export const InputTypes = {
    TEXT: 'text',
    EMAIL: 'email',
    TEL: 'tel',
    URL: 'url',
} as const;

/** Union of valid input type values derived from {@link InputTypes}. */
export type InputType = (typeof InputTypes)[keyof typeof InputTypes];

/** Input type used when no `type` input is provided. */
export const DEFAULT_INPUT_TYPE: InputType = InputTypes.TEXT;
