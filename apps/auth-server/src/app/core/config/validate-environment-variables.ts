import { transform, validatorOptions } from '@dnd-mapp/backend-utils';
import { validate } from 'class-validator';
import { Environment } from './environment-variables';

export async function validateEnvironmentVariables(environment: Record<string, string>) {
    const parsed = transform(Environment, environment);

    const validationErrors = await validate(parsed, {
        ...validatorOptions,
        forbidNonWhitelisted: false,
    });

    if (validationErrors.length > 0) {
        throw new Error(Object.values(validationErrors[0]?.constraints as Record<string, string>)[0]);
    }
    return parsed;
}
