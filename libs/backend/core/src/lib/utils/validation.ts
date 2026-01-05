import { HttpStatus, ValidationPipeOptions } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export const validatorOptions: ValidatorOptions = {
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
    stopAtFirstError: true,
    whitelist: true,
};

export const validationPipeOptions: ValidationPipeOptions = {
    transform: true,
    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
};
