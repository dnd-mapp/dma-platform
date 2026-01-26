import {
    ConfigurationNamespaces,
    DEFAULT_AUTH_SERVER_CONFIG,
    EnvironmentVariables,
    ServerConfig,
} from '@dnd-mapp/backend-utils';
import { parseInt } from '@dnd-mapp/shared-utils';
import { registerAs } from '@nestjs/config';

export default registerAs(
    ConfigurationNamespaces.SERVER,
    () =>
        ({
            host: process.env[EnvironmentVariables.AUTH_SERVER_HOST] || DEFAULT_AUTH_SERVER_CONFIG.host,
            port: parseInt(DEFAULT_AUTH_SERVER_CONFIG.port, process.env[EnvironmentVariables.AUTH_SERVER_PORT]),
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            passwordPepper: process.env[EnvironmentVariables.AUTH_SERVER_PASSWORD_PEPPER]!,
            cookieSecret: process.env[EnvironmentVariables.AUTH_SERVER_COOKIE_SECRET]!,
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
        }) satisfies ServerConfig,
);
