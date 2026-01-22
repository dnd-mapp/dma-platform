import {
    ConfigurationNamespaces,
    DatabaseConfig,
    DEFAULT_AUTH_DB_CONFIG,
    EnvironmentVariables,
} from '@dnd-mapp/backend-utils';
import { parseInt } from '@dnd-mapp/shared-utils';
import { registerAs } from '@nestjs/config';

export default registerAs(
    ConfigurationNamespaces.DATABASE,
    () =>
        ({
            host: process.env[EnvironmentVariables.AUTH_DB_HOST] || DEFAULT_AUTH_DB_CONFIG.host,
            port: parseInt(DEFAULT_AUTH_DB_CONFIG.port, process.env[EnvironmentVariables.AUTH_DB_PORT]),
            schema: process.env[EnvironmentVariables.AUTH_DB_SCHEMA] || DEFAULT_AUTH_DB_CONFIG.schema,
            user: process.env[EnvironmentVariables.AUTH_DB_USER] || DEFAULT_AUTH_DB_CONFIG.user,
            password: process.env[EnvironmentVariables.AUTH_DB_PASSWORD] || DEFAULT_AUTH_DB_CONFIG.password,
        }) satisfies DatabaseConfig,
);
