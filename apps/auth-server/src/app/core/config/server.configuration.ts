import {
    ConfigurationNamespaces,
    DEFAULT_AUTH_SERVER_CONFIG,
    EnvironmentVariables,
    ServerConfig,
} from '@dnd-mapp/backend-utils';
import { parseInt } from '@dnd-mapp/shared-utils';
import { registerAs } from '@nestjs/config';

export default registerAs(ConfigurationNamespaces.SERVER, () => {
    const jwtPublicKeyPath = process.env[EnvironmentVariables.AUTH_SERVER_JWT_PUBLIC_KEY_PATH];
    const jwtPrivateKeyPath = process.env[EnvironmentVariables.AUTH_SERVER_JWT_PRIVATE_KEY_PATH];

    const passwordPepper = process.env[EnvironmentVariables.AUTH_SERVER_PASSWORD_PEPPER];
    const cookieSecret = process.env[EnvironmentVariables.AUTH_SERVER_COOKIE_SECRET];

    const corsOrigins = process.env[EnvironmentVariables.AUTH_SERVER_CORS_ORIGINS];

    if (!passwordPepper || !cookieSecret || !corsOrigins || !jwtPublicKeyPath || !jwtPrivateKeyPath) throw new Error();

    const config: ServerConfig = {
        host: process.env[EnvironmentVariables.AUTH_SERVER_HOST] || DEFAULT_AUTH_SERVER_CONFIG.host,
        port: parseInt(DEFAULT_AUTH_SERVER_CONFIG.port, process.env[EnvironmentVariables.AUTH_SERVER_PORT]),
        passwordPepper: passwordPepper,
        cookieSecret: cookieSecret,
        cors: {
            origins: corsOrigins.split(','),
        },
        jwt: {
            publicKeyPath: jwtPublicKeyPath,
            privateKeyPath: jwtPrivateKeyPath,
        },
    };
    return config;
});
