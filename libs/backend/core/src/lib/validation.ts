import { ValidatorOptions } from 'class-validator';

export const validatorOptions: ValidatorOptions = {
    skipMissingProperties: false,
    stopAtFirstError: true,
};
