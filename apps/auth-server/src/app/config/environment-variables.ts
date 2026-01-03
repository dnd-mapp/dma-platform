import { transform, validatorOptions } from '@dnd-mapp/backend/core';
import { tryCatch } from '@dnd-mapp/shared/utils';
import { IsNotEmpty, IsNumber, IsString, Max, Min, validate } from 'class-validator';

export const EnvironmentVariables = {
    SERVER_HOST: 'AUTH_SERVER_HOST',
    SERVER_PORT: 'AUTH_SERVER_PORT',

    DB_HOST: 'AUTH_DB_HOST',
    DB_PORT: 'AUTH_DB_PORT',
    DB_SCHEMA: 'AUTH_DB_SCHEMA',
    DB_USER: 'AUTH_DB_USER',
    DB_PASSWORD: 'AUTH_DB_PASSWORD',
} as const;

export const DEFAULT_SERVER_HOST = 'localhost' as const;

export const DEFAULT_SERVER_PORT = 4350;

export const DEFAULT_DB_HOST = 'localhost' as const;

export const DEFAULT_DB_PORT = 3306 as const;

export const DEFAULT_DB_SCHEMA = 'auth_db' as const;

export const DEFAULT_DB_USER = 'root' as const;

const MIN_PORT_RANGE = 1024 as const;

const MAX_PORT_RANGE = 65535 as const;

class Environment {
    @IsNotEmpty()
    @IsString()
    [EnvironmentVariables.SERVER_HOST]: string = DEFAULT_SERVER_HOST;

    @Max(MAX_PORT_RANGE)
    @Min(MIN_PORT_RANGE)
    @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
    [EnvironmentVariables.SERVER_PORT]: number = DEFAULT_SERVER_PORT;

    @IsNotEmpty()
    @IsString()
    [EnvironmentVariables.DB_HOST]: string = DEFAULT_DB_HOST;

    @Max(MAX_PORT_RANGE)
    @Min(MIN_PORT_RANGE)
    @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
    [EnvironmentVariables.DB_PORT]: number = DEFAULT_DB_PORT;

    @IsNotEmpty()
    @IsString()
    [EnvironmentVariables.DB_SCHEMA]: string = DEFAULT_DB_SCHEMA;

    @IsNotEmpty()
    @IsString()
    [EnvironmentVariables.DB_USER]: string = DEFAULT_DB_USER;

    @IsNotEmpty()
    @IsString()
    [EnvironmentVariables.DB_PASSWORD]: string;
}

export async function validateEnvironmentVariables(environment: Record<string, unknown>) {
    const parsedEnvironment = transform(Environment, environment);

    const { data: validationErrors, error } = await tryCatch(validate(parsedEnvironment, validatorOptions));

    if (error) throw error;
    if (validationErrors.length > 0) throw new Error(Object.values(validationErrors[0].constraints)[0]);
    return parsedEnvironment;
}
