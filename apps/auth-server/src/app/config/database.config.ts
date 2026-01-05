import { parseInt } from '@dnd-mapp/shared/utils';
import { registerAs } from '@nestjs/config';
import {
    DEFAULT_DB_HOST,
    DEFAULT_DB_PORT,
    DEFAULT_DB_SCHEMA,
    DEFAULT_DB_USER,
    EnvironmentVariables,
} from './environment-variables';

export interface DatabaseConfiguration {
    host: string;
    port: number;
    schema: string;
    user: string;
    password: string;
}

export const DATABASE_CONFIGURATION_NAMESPACE = 'database';

export default registerAs(
    DATABASE_CONFIGURATION_NAMESPACE,
    () =>
        ({
            host: process.env[EnvironmentVariables.DB_HOST] || DEFAULT_DB_HOST,
            port: parseInt(process.env[EnvironmentVariables.DB_PORT], DEFAULT_DB_PORT),
            schema: process.env[EnvironmentVariables.DB_SCHEMA] || DEFAULT_DB_SCHEMA,
            user: process.env[EnvironmentVariables.DB_USER] || DEFAULT_DB_USER,
            password: process.env[EnvironmentVariables.DB_PASSWORD]!,
        }) satisfies DatabaseConfiguration,
);
