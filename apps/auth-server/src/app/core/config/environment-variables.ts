import { EnvironmentVariables, MAX_PORT, MIN_PORT } from '@dnd-mapp/backend-utils';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

export class Environment {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    [EnvironmentVariables.AUTH_SERVER_HOST]?: string;

    @Max(MAX_PORT)
    @Min(MIN_PORT)
    @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
    @IsOptional()
    [EnvironmentVariables.AUTH_SERVER_PORT]?: number;

    @IsNotEmpty()
    @IsString()
    [EnvironmentVariables.AUTH_SERVER_PASSWORD_PEPPER]!: string;

    @MinLength(32)
    @IsNotEmpty()
    @IsString()
    [EnvironmentVariables.AUTH_SERVER_COOKIE_SECRET]!: string;

    @IsNotEmpty()
    @IsString()
    [EnvironmentVariables.AUTH_SERVER_JWT_PUBLIC_KEY_PATH]!: string;

    @IsNotEmpty()
    @IsString()
    [EnvironmentVariables.AUTH_SERVER_JWT_PRIVATE_KEY_PATH]!: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    [EnvironmentVariables.AUTH_DB_HOST]?: string;

    @Max(MAX_PORT)
    @Min(MIN_PORT)
    @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
    @IsOptional()
    [EnvironmentVariables.AUTH_DB_PORT]?: number;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    [EnvironmentVariables.AUTH_DB_SCHEMA]?: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    [EnvironmentVariables.AUTH_DB_USER]?: string;

    @IsString()
    [EnvironmentVariables.AUTH_DB_PASSWORD]!: string;
}
