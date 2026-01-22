import {
    ConfigurationNamespaces,
    DEFAULT_AUTH_SERVER_HOST,
    DEFAULT_AUTH_SERVER_PORT,
    EnvironmentVariables,
    ServerConfig,
} from '@dnd-mapp/backend-utils';
import { parseInt } from '@dnd-mapp/shared-utils';
import { registerAs } from '@nestjs/config';

export default registerAs(
    ConfigurationNamespaces.SERVER,
    () =>
        ({
            host: process.env[EnvironmentVariables.AUTH_SERVER_HOST] || DEFAULT_AUTH_SERVER_HOST,
            port: parseInt(DEFAULT_AUTH_SERVER_PORT, process.env[EnvironmentVariables.AUTH_SERVER_PORT]),
        }) satisfies ServerConfig,
);
