import { HttpStatus, ValidationPipeOptions } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export const validatorOptions: ValidatorOptions = {
    skipMissingProperties: false,
    stopAtFirstError: true,
};

export const validationPipeOptions: ValidationPipeOptions = {
    transform: true,
    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
};
